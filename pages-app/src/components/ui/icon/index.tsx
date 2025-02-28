import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
}

export function Icon({
  icon: Icon,
  size = "md",
  className,
  ...props
}: IconProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <Icon className="w-full h-full" />
    </div>
  )
} 