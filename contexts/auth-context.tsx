"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { 
  type User, 
  onAuthStateChanged, 
  signInWithPopup,
  signOut 
} from "firebase/auth"
import { auth, googleProvider } from "@/src/lib/firebase"

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
    console.log("🔄 AuthProvider: Setting up auth state listener")
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("👤 AuthProvider: Auth state changed", {
        user: user ? { uid: user.uid, email: user.email } : null,
        pathname: window.location.pathname
      })
      
      setUser(user)
      setLoading(false)
      
      if (user) {
        // When user signs in with Google, automatically mark profile as completed
        // to skip the profile form and go directly to dashboard
        console.log("✅ AuthProvider: User authenticated, auto-completing profile")
        setIsProfileCompleted(true)
        document.cookie = 'profile-completed=true; path=/; max-age=31536000' // 1 year
        console.log("🍪 AuthProvider: Profile auto-completed, cookie set to true")
      } else {
        // Reset profile completion when user signs out
        const profileCompleted = document.cookie.includes('profile-completed=true')
        console.log("🍪 AuthProvider: Profile completed from cookie:", profileCompleted)
        setIsProfileCompleted(profileCompleted)
      }

      // DON'T redirect here - let the components handle navigation
      // This was causing the infinite reload loop
    })

    return unsubscribe
  }, [])

  const signInWithGoogle = async () => {
    try {
      console.log("🚀 AuthProvider: Starting Google sign-in")
      const result = await signInWithPopup(auth, googleProvider)
      console.log("✅ AuthProvider: Google sign-in successful", {
        uid: result.user.uid,
        email: result.user.email
      })
    } catch (error: any) {
      console.error("❌ AuthProvider: Error signing in with Google:", error)

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
      console.log("🚪 AuthProvider: Starting logout process")
      await signOut(auth)
      
      // Clear profile completed cookie
      document.cookie = 'profile-completed=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      setIsProfileCompleted(false)
      
      console.log("✅ AuthProvider: Logout successful, cookies cleared")
    } catch (error) {
      console.error("❌ AuthProvider: Error signing out:", error)
      throw error
    }
  }

  const setProfileCompleted = (completed: boolean) => {
    console.log("🍪 AuthProvider: Setting profile completed:", completed)
    setIsProfileCompleted(completed)
    
    if (completed) {
      document.cookie = 'profile-completed=true; path=/; max-age=31536000' // 1 year
      console.log("✅ AuthProvider: Cookie set to true")
    } else {
      document.cookie = 'profile-completed=false; path=/; max-age=31536000'
      console.log("❌ AuthProvider: Cookie set to false")
    }
    
    // Verify cookie was set
    const cookieValue = document.cookie.includes('profile-completed=true')
    console.log("🔍 AuthProvider: Cookie verification:", cookieValue)
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
