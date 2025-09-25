'use client';

import { cn } from "@/src/lib/utils";
import { ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: string;
}

export function SlideInFromBottom({ children, className, delay = "0" }: AnimatedContainerProps) {
  return (
    <div className={cn(
      "animate-in slide-in-from-bottom-4 duration-700",
      delay && `delay-${delay}`,
      className
    )}>
      {children}
    </div>
  );
}

export function SlideInFromRight({ children, className, delay = "0" }: AnimatedContainerProps) {
  return (
    <div className={cn(
      "animate-in slide-in-from-right-1/2 duration-500",
      delay && `delay-${delay}`,
      className
    )}>
      {children}
    </div>
  );
}

export function FadeIn({ children, className, delay = "0" }: AnimatedContainerProps) {
  return (
    <div className={cn(
      "animate-in fade-in duration-500",
      delay && `delay-${delay}`,
      className
    )}>
      {children}
    </div>
  );
}

export function ScaleIn({ children, className, delay = "0" }: AnimatedContainerProps) {
  return (
    <div className={cn(
      "animate-in zoom-in duration-300",
      delay && `delay-${delay}`,
      className
    )}>
      {children}
    </div>
  );
}
