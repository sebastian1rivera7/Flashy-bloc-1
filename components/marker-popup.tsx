"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Clock, MapPin, Star, Navigation, Phone, Globe } from "lucide-react"

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

interface MarkerPopupProps {
  offer: Offer
  onClose: () => void
  position?: "center" | "top" | "bottom"
}

export function MarkerPopup({ offer, onClose, position = "center" }: MarkerPopupProps) {
  const isUrgent = Number.parseInt(offer.timeLeft) < 20

  const handleGetDirections = () => {
    console.log(`Getting directions to ${offer.business}`)
    // Here you would integrate with maps API
  }

  const handleCallBusiness = () => {
    console.log(`Calling ${offer.business}`)
    // Here you would handle phone call
  }

  const handleVisitWebsite = () => {
    console.log(`Visiting ${offer.business} website`)
    // Here you would open business website
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-background/95 backdrop-blur-sm border-border shadow-xl">
        <CardHeader className="relative p-0">
          {/* Business Image */}
          <div className="relative h-48 rounded-t-lg overflow-hidden">
            <img
              src={offer.image || "/placeholder.svg?height=200&width=400&text=Business"}
              alt={offer.business}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-800"
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Discount Badge */}
            <div className="absolute top-2 left-2">
              <Badge
                className={`text-lg font-bold px-3 py-1 ${isUrgent ? "bg-red-500 animate-pulse" : "bg-primary"} text-white`}
              >
                {offer.discount} OFF
              </Badge>
            </div>

            {/* Business Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h2 className="text-xl font-bold mb-1">{offer.business}</h2>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {offer.category}
                </Badge>
                {offer.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{offer.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Description */}
          {offer.description && <p className="text-muted-foreground mb-4">{offer.description}</p>}

          {/* Offer Details */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className={`w-4 h-4 ${isUrgent ? "text-red-500" : "text-muted-foreground"}`} />
              <span className={isUrgent ? "text-red-500 font-medium" : "text-muted-foreground"}>
                {offer.timeLeft} left
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{offer.distance} away</span>
            </div>
          </div>

          {/* Pricing */}
          {offer.originalPrice && offer.discountedPrice && (
            <div className="flex items-center justify-between mb-4 p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="text-lg font-bold text-primary">{offer.discountedPrice}</div>
                <div className="text-sm text-muted-foreground line-through">{offer.originalPrice}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">You save</div>
                <div className="font-semibold text-green-600">
                  $
                  {(
                    Number.parseFloat(offer.originalPrice.replace("$", "")) -
                    Number.parseFloat(offer.discountedPrice.replace("$", ""))
                  ).toFixed(2)}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button onClick={handleGetDirections} className="w-full" size="lg">
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={handleCallBusiness}>
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
              <Button variant="outline" onClick={handleVisitWebsite}>
                <Globe className="w-4 h-4 mr-1" />
                Website
              </Button>
            </div>
          </div>

          {/* Urgency Warning */}
          {isUrgent && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">This offer expires soon!</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
