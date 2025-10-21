"use client"

import { useState, useEffect } from "react"
import { FlashyHeader } from "@/components/flashy-header"
import { DiscountCardsView } from "@/components/discount-cards-view"
import { BottomNavigation } from "@/components/bottom-navigation"
import { NotificationProvider } from "@/components/notification-provider"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Tag, Loader2, QrCode } from "lucide-react"
import { useRouter } from "next/navigation"

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

const MOCK_OFFERS: Offer[] = [
  {
    id: "1",
    title: "2x1 en Empanadas",
    description: "Lleva 2 empanadas y paga solo 1. Válido en todas las variedades.",
    discount_type: "percentage",
    discount_value: 50,
    max_redemptions: 20,
    current_redemptions: 12,
    duration_minutes: 45,
    radius_km: 2,
    is_active: true,
    expires_at: new Date(Date.now() + 45 * 60000).toISOString(),
    created_at: new Date().toISOString(),
    latitude: -33.4372,
    longitude: -70.6506,
    image_url: "/empanadas-chilenas.jpg",
    qr_code: "FLASHY-EMP-001",
    business_profiles: {
      business_name: "Empanadas La Chilena",
      business_type: "Comida Rápida",
      logo_url: "/logo-empanadas.jpg",
      address: "Av. Providencia 1234, Santiago",
      phone: "+56 2 2345 6789",
    },
  },
  {
    id: "2",
    title: "Completo + Bebida $2.500",
    description: "Completo italiano con bebida incluida por solo $2.500",
    discount_type: "fixed_amount",
    discount_value: 1500,
    max_redemptions: 30,
    current_redemptions: 18,
    duration_minutes: 120,
    radius_km: 3,
    is_active: true,
    expires_at: new Date(Date.now() + 120 * 60000).toISOString(),
    created_at: new Date().toISOString(),
    latitude: -33.4489,
    longitude: -70.6693,
    image_url: "/completo-italiano.jpg",
    qr_code: "FLASHY-COM-002",
    business_profiles: {
      business_name: "Completos El Rápido",
      business_type: "Comida Rápida",
      logo_url: "/logo-completos.jpg",
      address: "Av. Libertador Bernardo O'Higgins 2345, Santiago",
      phone: "+56 2 3456 7890",
    },
  },
  {
    id: "3",
    title: "30% OFF en Café",
    description: "Descuento del 30% en todos los cafés y bebidas calientes",
    discount_type: "percentage",
    discount_value: 30,
    max_redemptions: 50,
    current_redemptions: 35,
    duration_minutes: 90,
    radius_km: 1.5,
    is_active: true,
    expires_at: new Date(Date.now() + 90 * 60000).toISOString(),
    created_at: new Date().toISOString(),
    latitude: -33.425,
    longitude: -70.61,
    image_url: "/cafe-latte-art.jpg",
    qr_code: "FLASHY-CAF-003",
    business_profiles: {
      business_name: "Café Central",
      business_type: "Cafetería",
      logo_url: "/logo-cafe.jpg",
      address: "Plaza de Armas 567, Santiago Centro",
      phone: "+56 2 4567 8901",
    },
  },
  {
    id: "4",
    title: "Pizza Familiar $8.990",
    description: "Pizza familiar de 3 ingredientes por solo $8.990",
    discount_type: "fixed_amount",
    discount_value: 3000,
    max_redemptions: 15,
    current_redemptions: 8,
    duration_minutes: 60,
    radius_km: 2.5,
    is_active: true,
    expires_at: new Date(Date.now() + 60 * 60000).toISOString(),
    created_at: new Date().toISOString(),
    latitude: -33.415,
    longitude: -70.605,
    image_url: "/pizza-italiana.jpg",
    qr_code: "FLASHY-PIZ-004",
    business_profiles: {
      business_name: "Pizzería Napolitana",
      business_type: "Restaurante",
      logo_url: "/logo-pizzeria.jpg",
      address: "Av. Italia 890, Providencia",
      phone: "+56 2 5678 9012",
    },
  },
  {
    id: "5",
    title: "40% OFF en Sushi",
    description: "Descuento del 40% en todos los rolls y combos de sushi",
    discount_type: "percentage",
    discount_value: 40,
    max_redemptions: 25,
    current_redemptions: 20,
    duration_minutes: 30,
    radius_km: 2,
    is_active: true,
    expires_at: new Date(Date.now() + 30 * 60000).toISOString(),
    created_at: new Date().toISOString(),
    latitude: -33.43,
    longitude: -70.62,
    image_url: "/assorted-sushi.png",
    qr_code: "FLASHY-SUS-005",
    business_profiles: {
      business_name: "Sushi Express",
      business_type: "Restaurante",
      logo_url: "/logo-sushi.jpg",
      address: "Av. Apoquindo 1234, Las Condes",
      phone: "+56 2 6789 0123",
    },
  },
]

export default function OfertasPage() {
  const router = useRouter()
  const [nearbyOffers, setNearbyOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOffers() {
      try {
        const response = await fetch("/api/offers")
        const data = await response.json()

        if (data.offers && data.offers.length > 0) {
          setNearbyOffers(data.offers)
        } else {
          setNearbyOffers([])
        }
      } catch (error) {
        console.error("[v0] Error obteniendo ofertas:", error)
        setNearbyOffers([])
      } finally {
        setLoading(false)
      }
    }

    fetchOffers()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-background items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-gray-600">Cargando ofertas...</p>
      </div>
    )
  }

  if (nearbyOffers.length === 0) {
    return (
      <NotificationProvider offers={[]}>
        <div className="flex flex-col h-screen bg-background">
          <FlashyHeader
            onMenuClick={() => router.push("/")}
            onNotificationClick={() => router.push("/notificaciones")}
            notificationCount={0}
          />

          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <Tag className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No hay ofertas disponibles</h2>
            <p className="text-gray-600 text-center mb-6">
              Las ofertas aparecerán aquí cuando los negocios las publiquen desde Flashy for Admins
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:opacity-90"
            >
              Actualizar
            </Button>
          </div>

          <BottomNavigation activeView="cards" />
        </div>
      </NotificationProvider>
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
