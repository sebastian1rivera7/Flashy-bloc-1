"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Zap } from "lucide-react"

interface Offer {
  id: number
  business: string
  discount: string
  timeLeft: string
  distance: string
  category: string
}

interface DiscountBannerProps {
  offers: Offer[]
}

export function DiscountBanner({ offers }: DiscountBannerProps) {
  const urgentOffer = offers[0] // Most urgent offer

  return (
    <div className="px-4 py-2">
      <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 border-0 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold">Flash Deal!</div>
              <div className="text-sm opacity-90">
                {urgentOffer.discount} off at {urgentOffer.business}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm">
              <Clock className="w-4 h-4" />
              <span>{urgentOffer.timeLeft}</span>
            </div>
            <Badge variant="secondary" className="mt-1 bg-white/20 text-white border-0">
              {urgentOffer.distance}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  )
}
