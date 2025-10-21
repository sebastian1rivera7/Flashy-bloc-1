"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Star, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface Offer {
  id: string
  title: string
  description: string
  discount_type: string
  discount_value: number
  max_redemptions: number
  current_redemptions: number
  duration_minutes: number
  radius_km: number
  is_active: boolean
  expires_at: string
  created_at: string
  latitude: number
  longitude: number
  image_url: string
  qr_code: string
  business_profiles: {
    business_name: string
    business_type: string
    logo_url: string
    address: string
    phone: string
  }
}

interface DiscountCardProps {
  offer: Offer
}

export function DiscountCard({ offer }: DiscountCardProps) {
  const calculateTimeLeft = () => {
    const timeLeft = new Date(offer.expires_at).getTime() - Date.now()
    const minutesLeft = Math.floor(timeLeft / 60000)
    return minutesLeft > 0 ? `${minutesLeft} min` : "Expirado"
  }

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeLeft())
  const [isFavorited, setIsFavorited] = useState(false)
  const [isUrgent, setIsUrgent] = useState(false)

  useEffect(() => {
    const timeLeft = new Date(offer.expires_at).getTime() - Date.now()
    const minutesLeft = Math.floor(timeLeft / 60000)
    const cuposLeft = offer.max_redemptions - offer.current_redemptions
    setIsUrgent(minutesLeft < 20 || cuposLeft < 3)

    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeLeft())
    }, 60000)

    return () => clearInterval(interval)
  }, [offer.expires_at, offer.max_redemptions, offer.current_redemptions])

  const formatDiscount = () => {
    if (offer.discount_type === "percentage") {
      return `${offer.discount_value}% OFF`
    } else {
      return `$${offer.discount_value.toLocaleString()} menos`
    }
  }

  const handleClaimDeal = () => {
    console.log(`Claiming deal for ${offer.business_profiles.business_name}`)
  }

  const rating = Math.min(5, 3.5 + (offer.current_redemptions / offer.max_redemptions) * 1.5).toFixed(1)

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
        isUrgent && "ring-2 ring-accent/50 shadow-accent/20",
      )}
    >
      <div className="relative">
        <img
          src={offer.image_url || "/placeholder.svg"}
          alt={offer.business_profiles.business_name}
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-2 left-2">
          <Badge className="bg-primary text-primary-foreground font-bold">{formatDiscount()}</Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-white/80 hover:bg-white"
            onClick={() => setIsFavorited(!isFavorited)}
          >
            <Heart className={cn("w-4 h-4", isFavorited ? "fill-red-500 text-red-500" : "text-gray-600")} />
          </Button>
        </div>
        {isUrgent && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="destructive" className="animate-pulse">
              ¡Termina Pronto!
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground mb-1">{offer.business_profiles.business_name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{offer.description}</p>
          </div>
          <Badge variant="secondary" className="ml-2">
            {offer.business_profiles.business_type}
          </Badge>
        </div>

        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className={cn(isUrgent && "text-destructive font-medium")}>{timeRemaining}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{offer.radius_km} km</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">{offer.title}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {offer.max_redemptions - offer.current_redemptions} cupos disponibles
          </div>
        </div>

        <Button onClick={handleClaimDeal} className="w-full" variant={isUrgent ? "default" : "outline"}>
          {isUrgent ? "¡Reclamar Ahora!" : "Ver Direcciones"}
        </Button>
      </CardContent>
    </Card>
  )
}
