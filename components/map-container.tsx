"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Navigation, List, Star } from "lucide-react"
import { BusinessMarker } from "@/components/business-marker"
import { MarkerPopup } from "@/components/marker-popup"

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

interface MapContainerProps {
  currentLocation: { lat: number; lng: number } | null
  offers: Offer[]
  onViewChange?: () => void
}

export function MapContainer({ currentLocation, offers, onViewChange }: MapContainerProps) {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [hoveredOffer, setHoveredOffer] = useState<number | null>(null)

  const getMarkerPosition = (index: number, total: number) => {
    const positions = [
      { top: "25%", left: "30%" },
      { top: "60%", right: "25%" },
      { top: "20%", right: "20%" },
      { top: "70%", left: "20%" },
      { top: "40%", right: "40%" },
      { top: "80%", left: "60%" },
    ]
    return positions[index % positions.length]
  }

  return (
    <div className="relative w-full h-full bg-muted/20">
      {/* Simulated Map Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10"
        style={{
          backgroundImage: `url('/placeholder.svg?height=600&width=400&text=Interactive+Map')`,
        }}
      />

      {/* View Toggle Button */}
      {onViewChange && (
        <div className="absolute top-4 right-4 z-10">
          <Button variant="outline" size="sm" onClick={onViewChange} className="bg-background/95 backdrop-blur-sm">
            <List className="w-4 h-4 mr-1" />
            Cards
          </Button>
        </div>
      )}

      {/* Location Markers */}
      <div className="absolute inset-0">
        {/* User Location */}
        {currentLocation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse" />
              <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping" />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <Badge variant="outline" className="bg-background/95 text-xs">
                  You are here
                </Badge>
              </div>
            </div>
          </div>
        )}

        {offers.map((offer, index) => {
          const position = getMarkerPosition(index, offers.length)
          return (
            <div key={offer.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10" style={position}>
              <BusinessMarker
                offer={offer}
                isHovered={hoveredOffer === offer.id}
                isSelected={selectedOffer?.id === offer.id}
                onHover={() => setHoveredOffer(offer.id)}
                onLeave={() => setHoveredOffer(null)}
                onClick={() => setSelectedOffer(offer)}
              />
            </div>
          )
        })}
      </div>

      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        {(selectedOffer || offers[0]) && (
          <Card className="p-4 bg-card/95 backdrop-blur-sm border-border shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-card-foreground">
                    {selectedOffer?.business || offers[0].business}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {selectedOffer?.category || offers[0].category}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedOffer?.timeLeft || offers[0].timeLeft}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Navigation className="w-4 h-4" />
                    <span>{selectedOffer?.distance || offers[0].distance}</span>
                  </div>
                  {(selectedOffer?.rating || offers[0].rating) && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{selectedOffer?.rating || offers[0].rating}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{selectedOffer?.discount || offers[0].discount}</div>
                <div className="text-xs text-muted-foreground">OFF</div>
              </div>
            </div>
            {selectedOffer && (
              <div className="mt-3 pt-3 border-t border-border">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => console.log(`Getting directions to ${selectedOffer.business}`)}
                >
                  Get Directions
                </Button>
              </div>
            )}
          </Card>
        )}
      </div>

      {selectedOffer && <MarkerPopup offer={selectedOffer} onClose={() => setSelectedOffer(null)} position="center" />}
    </div>
  )
}
