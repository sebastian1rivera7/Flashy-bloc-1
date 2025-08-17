"use client"

import { useState } from "react"
import { DiscountCard } from "@/components/discount-card"
import { CategoryFilter } from "@/components/category-filter"
import { Button } from "@/components/ui/button"
import { Map, SlidersHorizontal } from "lucide-react"

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
}

interface DiscountCardsViewProps {
  offers: Offer[]
  onViewChange: () => void
}

export function DiscountCardsView({ offers, onViewChange }: DiscountCardsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [sortBy, setSortBy] = useState<"distance" | "discount" | "time">("distance")

  const categories = ["All", ...Array.from(new Set(offers.map((offer) => offer.category)))]

  const filteredOffers = offers.filter((offer) => selectedCategory === "All" || offer.category === selectedCategory)

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (sortBy) {
      case "distance":
        return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
      case "discount":
        return Number.parseInt(b.discount) - Number.parseInt(a.discount)
      case "time":
        return Number.parseInt(a.timeLeft) - Number.parseInt(b.timeLeft)
      default:
        return 0
    }
  })

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header Controls */}
      <div className="p-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">{filteredOffers.length} Deals Near You</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setSortBy(sortBy === "distance" ? "discount" : sortBy === "discount" ? "time" : "distance")
              }
            >
              <SlidersHorizontal className="w-4 h-4 mr-1" />
              {sortBy === "distance" ? "Distance" : sortBy === "discount" ? "Discount" : "Time"}
            </Button>
            <Button variant="outline" size="sm" onClick={onViewChange}>
              <Map className="w-4 h-4 mr-1" />
              Map
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
