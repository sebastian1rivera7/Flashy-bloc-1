"use client"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface Offer {
  id: number
  business: string
  discount: string
  timeLeft: string
  distance: string
  category: string
  description?: string
  originalPrice?: string
  discountedPrice?: string
  rating?: number
  image?: string
}

interface BusinessMarkerProps {
  offer: Offer
  isHovered: boolean
  isSelected: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
}

export function BusinessMarker({ offer, isHovered, isSelected, onHover, onLeave, onClick }: BusinessMarkerProps) {
  const isUrgent = Number.parseInt(offer.timeLeft) < 20
  const discountValue = Number.parseInt(offer.discount)

  const getMarkerColor = () => {
    if (discountValue >= 30) return "text-red-500 fill-red-100"
    if (discountValue >= 20) return "text-orange-500 fill-orange-100"
    return "text-primary fill-primary/20"
  }

  const getCategoryIcon = () => {
    switch (offer.category.toLowerCase()) {
      case "food":
        return "🍕"
      case "entertainment":
        return "🎬"
      case "shopping":
        return "🛍️"
      case "health":
        return "💪"
      default:
        return "🏪"
    }
  }

  return (
    <div
      className="relative cursor-pointer transition-all duration-200"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Main Marker */}
      <div className={cn("relative transition-all duration-200", isHovered && "scale-110", isSelected && "scale-125")}>
        <MapPin className={cn("w-8 h-8 drop-shadow-lg", getMarkerColor())} />

        {/* Category Icon */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs">{getCategoryIcon()}</div>

        {/* Discount Badge */}
        <Badge
          className={cn(
            "absolute -top-2 -right-2 text-xs px-1 py-0 min-w-0 h-5 flex items-center justify-center font-bold",
            isUrgent ? "bg-red-500 text-white animate-pulse" : "bg-accent text-accent-foreground",
          )}
        >
          {offer.discount}
        </Badge>

        {/* Urgent Indicator */}
        {isUrgent && (
          <div className="absolute -top-1 -left-1">
            <Zap className="w-3 h-3 text-red-500 animate-bounce" />
          </div>
        )}

        {/* Pulse Animation for Selected */}
        {isSelected && <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping" />}
      </div>

      {/* Hover Tooltip */}
      {isHovered && !isSelected && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
            <div className="text-sm font-semibold text-foreground">{offer.business}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span>{offer.discount} off</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{offer.timeLeft}</span>
              </div>
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border" />
          </div>
        </div>
      )}

      {/* Distance Ring */}
      <div
        className={cn(
          "absolute -inset-4 rounded-full border-2 border-dashed opacity-0 transition-opacity duration-200",
          isHovered && "opacity-30",
          Number.parseFloat(offer.distance) < 0.3 ? "border-green-400" : "border-yellow-400",
        )}
      />
    </div>
  )
}
