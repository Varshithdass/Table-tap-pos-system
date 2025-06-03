
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TransitionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: 
    | "fade-in" 
    | "scale-in" 
    | "slide-in" 
    | "slide-in-from-bottom" 
    | "none";
  duration?: "fast" | "normal" | "slow";
  delay?: number; // in milliseconds
  once?: boolean;
}

const animationClasses = {
  "fade-in": "animate-fade-in",
  "scale-in": "animate-scale-in",
  "slide-in": "animate-slide-in",
  "slide-in-from-bottom": "translate-y-4 animate-fade-in",
  "none": "",
};

const durationClasses = {
  "fast": "duration-200",
  "normal": "duration-300",
  "slow": "duration-500",
};

const TransitionWrapper = ({
  children,
  animation = "fade-in",
  duration = "normal",
  delay = 0,
  once = true,
  className,
  ...props
}: TransitionWrapperProps) => {
  const [isVisible, setIsVisible] = useState(!once);

  useEffect(() => {
    if (once) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [delay, once]);

  if (once && !isVisible) {
    return null;
  }

  const style = delay && !once ? { animationDelay: `${delay}ms` } : {};

  return (
    <div
      className={cn(
        "relative",
        animation !== "none" && animationClasses[animation],
        animation !== "none" && durationClasses[duration],
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default TransitionWrapper;
