"use client"

interface FlashyLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function FlashyLogo({ size = "md", className = "" }: FlashyLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-lg",
    md: "w-12 h-12 text-2xl",
    lg: "w-16 h-16 text-3xl",
    xl: "w-24 h-24 text-5xl",
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative flex items-center justify-center`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-xl rotate-12 animate-pulse opacity-20" />
        <div className="relative bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-xl flex items-center justify-center text-white font-black shadow-lg">
          <span className="animate-bounce">⚡</span>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </div>
    </div>
  )
}
