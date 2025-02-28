import * as React from "react"
import { cn } from "@/lib/utils"

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'none' | 'sm' | 'md' | 'lg'
}

const gapClasses = {
  none: "",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
}

const colClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  12: "grid-cols-3 sm:grid-cols-4 lg:grid-cols-12",
}

export function Grid({
  as: Component = "div",
  className,
  cols = 1,
  gap = "md",
  children,
  ...props
}: GridProps) {
  return (
    <Component
      className={cn(
        "grid",
        colClasses[cols],
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
} 