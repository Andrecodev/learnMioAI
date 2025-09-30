"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

interface EnhancedSidebarTriggerProps 
  extends React.ComponentProps<typeof Button> {
  showLabel?: boolean
}

export function EnhancedSidebarTrigger({
  className,
  onClick,
  showLabel = false,
  ...props
}: EnhancedSidebarTriggerProps) {
  const { toggleSidebar, openMobile, isMobile } = useSidebar()
  const [isPressed, setIsPressed] = React.useState(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 150)
    onClick?.(event)
    toggleSidebar()
  }

  return (
    <Button
      data-sidebar="trigger"
      data-slot="enhanced-sidebar-trigger"
      variant="ghost"
      size={showLabel ? "sm" : "icon"}
      className={cn(
        // Base styles
        "relative overflow-hidden transition-all duration-200 ease-out",
        "border border-transparent rounded-xl",
        
        // Size variants
        showLabel ? "h-10 px-3 gap-2" : "size-10",
        
        // Color and interaction states
        "bg-white/80 dark:bg-gray-800/80",
        "hover:bg-primary/10 dark:hover:bg-primary/20",
        "hover:border-primary/30 dark:hover:border-primary/40",
        "active:scale-95 active:bg-primary/20 dark:active:bg-primary/30",
        
        // Shadow and backdrop
        "shadow-sm hover:shadow-md backdrop-blur-sm",
        "ring-0 hover:ring-2 hover:ring-primary/20 dark:hover:ring-primary/30",
        
        // Animation classes
        isPressed && "animate-pulse",
        
        // Focus styles
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {/* Animated background gradient */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5",
          "opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100"
        )} 
      />
      
      {/* Hamburger/Close icon container */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="relative w-5 h-5 flex flex-col items-center justify-center">
          {/* Top line */}
          <div 
            className={cn(
              "w-4 h-0.5 rounded-full transition-all duration-300 ease-out",
              "bg-gray-600 dark:bg-gray-300",
              "hover:bg-primary",
              openMobile && isMobile 
                ? "transform rotate-45 translate-y-1.5" 
                : "transform translate-y-0"
            )} 
          />
          
          {/* Middle line */}
          <div 
            className={cn(
              "w-4 h-0.5 rounded-full transition-all duration-200 ease-out my-1",
              "bg-gray-600 dark:bg-gray-300",
              "hover:bg-primary",
              openMobile && isMobile 
                ? "opacity-0 scale-0" 
                : "opacity-100 scale-100"
            )} 
          />
          
          {/* Bottom line */}
          <div 
            className={cn(
              "w-4 h-0.5 rounded-full transition-all duration-300 ease-out",
              "bg-gray-600 dark:bg-gray-300", 
              "hover:bg-blue-600 dark:hover:bg-blue-400",
              openMobile && isMobile 
                ? "transform -rotate-45 -translate-y-1.5" 
                : "transform translate-y-0"
            )} 
          />
        </div>
        
        {/* Optional label */}
        {showLabel && (
          <span className={cn(
            "ml-2 text-sm font-medium transition-colors",
            "text-gray-700 dark:text-gray-300",
            "group-hover:text-blue-600 dark:group-hover:text-blue-400"
          )}>
            {openMobile && isMobile ? "Close" : "Menu"}
          </span>
        )}
      </div>
      
      {/* Ripple effect on click */}
      {isPressed && (
        <div className="absolute inset-0 bg-blue-400/20 rounded-xl animate-ping" />
      )}
      
      {/* Screen reader text */}
      <span className="sr-only">
        {openMobile && isMobile 
          ? "Close navigation menu" 
          : "Open navigation menu"
        }
      </span>
    </Button>
  )
}