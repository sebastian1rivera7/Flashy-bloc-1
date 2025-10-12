"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Zap } from "lucide-react"

interface Offer {
  id: string
  title: string
  description: string
  discount_type: string
  discount_value: number
  original_price: number
  final_price: number
  is_urgent: boolean
  expires_at: string
  business_profiles: {
    business_name: string
    business_type: string
    logo_url: string
    address: string
    phone: string
  }
}

interface DiscountBannerProps {
  offers: Offer[]
}

export function DiscountBanner({ offers }: DiscountBannerProps) {
  if (!offers || offers.length === 0) {
    return (
      <div className="px-4 py-2">
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 border-0 shadow-lg">
          <div className="flex items-center justify-center gap-3">
            <Zap className="w-5 h-5" />
            <div className="font-semibold">¡Pronto habrán ofertas increíbles!</div>
          </div>
        </Card>
      </div>
    )
  }

  const urgentOffer = offers.find((o) => o.is_urgent) || offers[0]

  const calculateTimeLeft = (expiresAt: string) => {
    if (!expiresAt) return "Tiempo limitado"

    const now = new Date()
    const expires = new Date(expiresAt)
    const diff = expires.getTime() - now.getTime()

    if (diff <= 0) return "Expirada"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const formatDiscount = (offer: Offer) => {
    if (!offer || offer.discount_value === undefined || offer.discount_value === null) {
      return "Descuento especial"
    }

    if (offer.discount_type === "percentage") {
      return `${offer.discount_value}% OFF`
    } else {
      const value = Number(offer.discount_value) || 0
      return `$${value.toLocaleString()} menos`
    }
  }

  return (
    <div className="px-4 py-2">
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 border-0 shadow-lg animate-flashy-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full animate-bounce">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-lg">¡Oferta Flash!</div>
              <div className="text-sm opacity-90">
                {formatDiscount(urgentOffer)} en {urgentOffer.business_profiles?.business_name || "Negocio"}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm font-semibold">
              <Clock className="w-4 h-4" />
              <span>{calculateTimeLeft(urgentOffer.expires_at)}</span>
            </div>
            {urgentOffer.is_urgent && (
              <Badge variant="secondary" className="mt-1 bg-white/20 text-white border-0 font-bold">
                ¡URGENTE!
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
