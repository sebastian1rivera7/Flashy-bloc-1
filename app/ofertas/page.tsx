"use client"

import { useState, useEffect } from "react"
import { FlashyHeader } from "@/components/flashy-header"
import { DiscountCardsView } from "@/components/discount-cards-view"
import { BottomNavigation } from "@/components/bottom-navigation"
import { NotificationProvider } from "@/components/notification-provider"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Tag, Loader2, QrCode } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

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

export default function OfertasPage() {
  const router = useRouter()
  const [nearbyOffers, setNearbyOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchOffers() {
      try {
        const { data: offers, error } = await supabase
          .from("offers")
          .select(`
            *,
            business_profiles (
              business_name,
              business_type,
              logo_url,
              address,
              phone
            )
          `)
          .eq("is_active", true)
          .gt("expires_at", new Date().toISOString())
          .order("created_at", { ascending: false })

        if (error) {
          console.error("[v0] Error fetching offers:", error)
          return
        }

        console.log("[v0] Fetched offers from real database:", offers)
        setNearbyOffers(offers || [])
      } catch (error) {
        console.error("[v0] Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOffers()
  }, [supabase])

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-background items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-gray-600">Cargando ofertas...</p>
      </div>
    )
  }

  return (
    <NotificationProvider offers={nearbyOffers}>
      <div className="flex flex-col h-screen bg-background">
        <FlashyHeader
          onMenuClick={() => router.push("/")}
          onNotificationClick={() => router.push("/notificaciones")}
          notificationCount={
            nearbyOffers.filter((offer) => {
              const timeLeft = new Date(offer.expires_at).getTime() - Date.now()
              const minutesLeft = Math.floor(timeLeft / 60000)
              const cuposLeft = offer.max_redemptions - offer.current_redemptions
              return minutesLeft < 15 || cuposLeft < 3
            }).length
          }
        />

        {/* Mobile-friendly header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm">
          <Button
            onClick={() => router.push("/")}
            variant="ghost"
            size="lg"
            className="flex items-center gap-2 text-lg font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </Button>
          <div className="flex items-center gap-2 text-primary font-bold">
            <Tag className="w-5 h-5" />
            {nearbyOffers.length} Ofertas
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <DiscountCardsView offers={nearbyOffers} onViewChange={() => router.push("/mapa")} />
        </div>

        <Button
          onClick={() => router.push("/scanner")}
          className="fixed bottom-20 right-6 w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:opacity-90 z-50"
        >
          <QrCode className="w-6 h-6" />
        </Button>

        <BottomNavigation activeView="cards" />
      </div>
    </NotificationProvider>
  )
}
