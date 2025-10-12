"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Star, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface Offer {
  id: number
  business: string
  discount: string
  timeLeft: string
  distance: string
  category: string
  description: string
  originalPrice: string
  discountedPrice: string
  rating: number
  image: string
  discountType: string
}

interface DiscountCardProps {
  offer: Offer
}

export function DiscountCard({ offer }: DiscountCardProps) {
  const [timeRemaining, setTimeRemaining] = useState(offer.timeLeft)
  const [isFavorited, setIsFavorited] = useState(false)
  const [isUrgent, setIsUrgent] = useState(false)

  useEffect(() => {
    // Check if offer is urgent (less than 20 minutes)
    const minutes = Number.parseInt(offer.timeLeft)
    setIsUrgent(minutes < 20)
  }, [offer.timeLeft])

  const handleClaimDeal = () => {
    console.log(`Claiming deal for ${offer.business}`)
    // Here you would typically navigate to the business or show directions
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
        isUrgent && "ring-2 ring-accent/50 shadow-accent/20",
      )}
    >
      <div className="relative">
        <img src={offer.image || "/placeholder.svg"} alt={offer.business} className="w-full h-32 object-cover" />
        <div className="absolute top-2 left-2">
          <Badge className="bg-primary text-primary-foreground font-bold">
            {offer.discountType === "percentage" ? offer.discount : "AHORRO"}
          </Badge>
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
            <h3 className="font-semibold text-card-foreground mb-1">{offer.business}</h3>
            <p className="text-sm text-muted-foreground mb-2">{offer.description}</p>
          </div>
          <Badge variant="secondary" className="ml-2">
            {offer.category}
          </Badge>
        </div>

        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{offer.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className={cn(isUrgent && "text-destructive font-medium")}>{offer.timeLeft}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{offer.distance}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">{offer.discountedPrice}</span>
            <span className="text-sm text-muted-foreground line-through">{offer.originalPrice}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Ahorras{" "}
            {(
              Number.parseFloat(offer.originalPrice.replace("$", "").replace(".", "")) -
              Number.parseFloat(offer.discountedPrice.replace("$", "").replace(".", ""))
            ).toLocaleString("es-CL", { style: "currency", currency: "CLP" })}
          </div>
        </div>

        <Button onClick={handleClaimDeal} className="w-full" variant={isUrgent ? "default" : "outline"}>
          {isUrgent ? "¡Reclamar Ahora!" : "Ver Direcciones"}
        </Button>
      </CardContent>
    </Card>
  )
}
