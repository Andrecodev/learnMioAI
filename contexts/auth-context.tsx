"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  isProfileCompleted: boolean
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  setProfileCompleted: (completed: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isProfileCompleted, setIsProfileCompleted] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
      
      // Check profile completion status from cookie
      const profileCompleted = document.cookie.includes('profile-completed=true')
      setIsProfileCompleted(profileCompleted)
    })

    return unsubscribe
  }, [])

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error: any) {
      console.error("Error signing in with Google:", error)

      if (error.code === "auth/unauthorized-domain") {
        const currentDomain = window.location.hostname
        throw new Error(
          `Domain not authorized: ${currentDomain}. Please add this domain to your Firebase console under Authentication > Settings > Authorized domains.`,
        )
      } else if (error.code === "auth/popup-closed-by-user") {
        throw new Error("Sign-in was cancelled. Please try again.")
      } else if (error.code === "auth/popup-blocked") {
        throw new Error("Pop-up was blocked by your browser. Please allow pop-ups and try again.")
      } else {
        throw new Error(error.message || "An error occurred during sign-in. Please try again.")
      }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  }

  const setProfileCompleted = (completed: boolean) => {
    setIsProfileCompleted(completed)
    if (completed) {
      document.cookie = 'profile-completed=true; path=/'
    } else {
      document.cookie = 'profile-completed=false; path=/'
    }
  }

  const value = {
    user,
    loading,
    isProfileCompleted,
    signInWithGoogle,
    logout,
    setProfileCompleted,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
