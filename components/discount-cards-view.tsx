"use client"

import { useState } from "react"
import { DiscountCard } from "@/components/discount-card"
import { CategoryFilter } from "@/components/category-filter"
import { Button } from "@/components/ui/button"
import { Map, SlidersHorizontal } from "lucide-react"

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

interface DiscountCardsViewProps {
  offers: Offer[]
  onViewChange: () => void
}

export function DiscountCardsView({ offers, onViewChange }: DiscountCardsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas")
  const [sortBy, setSortBy] = useState<"distance" | "discount" | "time">("distance")

  const categories = ["Todas", ...Array.from(new Set(offers.map((offer) => offer.business_profiles.business_type)))]

  const filteredOffers = offers.filter(
    (offer) => selectedCategory === "Todas" || offer.business_profiles.business_type === selectedCategory,
  )

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (sortBy) {
      case "distance":
        return a.radius_km - b.radius_km
      case "discount":
        return b.discount_value - a.discount_value
      case "time": {
        const timeA = new Date(a.expires_at).getTime() - Date.now()
        const timeB = new Date(b.expires_at).getTime() - Date.now()
        return timeA - timeB
      }
      default:
        return 0
    }
  })

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header Controls */}
      <div className="p-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">{filteredOffers.length} Ofertas Cerca de Ti</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setSortBy(sortBy === "distance" ? "discount" : sortBy === "discount" ? "time" : "distance")
              }
            >
              <SlidersHorizontal className="w-4 h-4 mr-1" />
              {sortBy === "distance" ? "Distancia" : sortBy === "discount" ? "Descuento" : "Tiempo"}
            </Button>
            <Button variant="outline" size="sm" onClick={onViewChange}>
              <Map className="w-4 h-4 mr-1" />
              Mapa
            </Button>
          </div>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Cards Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedOffers.map((offer) => (
            <DiscountCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </div>
  )
}
