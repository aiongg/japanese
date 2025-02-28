import * as React from "react"
import { cn } from "@/lib/utils"

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
}

export function H1({ as: Component = "h1", className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl text-foreground",
        className
      )}
      {...props}
    />
  )
}

export function H2({ as: Component = "h2", className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  )
}

export function H3({ as: Component = "h3", className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

export function H4({ as: Component = "h4", className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

export function P({ as: Component = "p", className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  )
}

export function Lead({ as: Component = "p", className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn("text-xl text-muted-foreground", className)}
      {...props}
    />
  )
}

export function Large({ as: Component = "div", className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

export function Small({ as: Component = "small", className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  )
}

export function Subtle({ as: Component = "p", className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export function Japanese({ as: Component = "span", className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        "font-japanese text-lg leading-relaxed tracking-wider",
        className
      )}
      {...props}
    />
  )
} 