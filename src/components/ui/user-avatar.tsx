"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "firebase/auth"
import { getUserDisplayName, getUserInitials, getBestAvatarURL, hasUserPhoto } from "@/lib/user-utils"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  user: User | null
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showFallbackGradient?: boolean
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-8 w-8", 
  lg: "h-10 w-10",
  xl: "h-12 w-12"
}

const fallbackTextSize = {
  sm: "text-xs",
  md: "text-xs",
  lg: "text-sm", 
  xl: "text-base"
}

export function UserAvatar({ 
  user, 
  size = "md", 
  className,
  showFallbackGradient = true 
}: UserAvatarProps) {
  const [imageError, setImageError] = useState(false)
  
  if (!user) return null
  
  const userName = getUserDisplayName(user)
  const userInitials = getUserInitials(user)
  const avatarURL = getBestAvatarURL(user)
  const userHasPhoto = hasUserPhoto(user)
  
  const fallbackClasses = cn(
    showFallbackGradient && "bg-gradient-to-br from-blue-500 to-purple-600 text-white",
    !showFallbackGradient && "bg-muted",
    "font-semibold",
    fallbackTextSize[size]
  )

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      {!imageError && (
        <AvatarImage 
          src={avatarURL}
          alt={userName}
          className="object-cover"
          loading="eager"
          onError={() => setImageError(true)}
        />
      )}
      <AvatarFallback className={fallbackClasses}>
        {userInitials}
      </AvatarFallback>
    </Avatar>
  )
}