"use client"

import { useState, useEffect } from "react"
import { FlashyHeader } from "@/components/flashy-header"
import { DiscountBanner } from "@/components/discount-banner"
import { NotificationProvider } from "@/components/notification-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Tag, Bell, User, Zap, Loader2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

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

const MOCK_OFFERS: Offer[] = [
  {
    id: "1",
    title: "3 Empanadas por $3.000",
    description: "Empanadas de pino, queso y pollo",
    discount_type: "fixed",
    discount_value: 2000,
    original_price: 5000,
    final_price: 3000,
    is_urgent: true,
    expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    business_profiles: {
      business_name: "Empanadas La Chilena",
      business_type: "restaurant",
      logo_url: "/placeholder.svg?height=100&width=100",
      address: "Plaza de Armas 123, Santiago Centro",
      phone: "+56912345678",
    },
  },
  {
    id: "2",
    title: "30% OFF en Completos",
    description: "Completos italianos y dinámicos",
    discount_type: "percentage",
    discount_value: 30,
    original_price: 3000,
    final_price: 2100,
    is_urgent: false,
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    business_profiles: {
      business_name: "Completos El Rápido",
      business_type: "restaurant",
      logo_url: "/placeholder.svg?height=100&width=100",
      address: "Av. Providencia 456, Providencia",
      phone: "+56987654321",
    },
  },
  {
    id: "3",
    title: "2x1 en Café + Pastel",
    description: "Válido de 15:00 a 18:00",
    discount_type: "percentage",
    discount_value: 50,
    original_price: 6000,
    final_price: 3000,
    is_urgent: true,
    expires_at: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    business_profiles: {
      business_name: "Café Colonia",
      business_type: "cafe",
      logo_url: "/placeholder.svg?height=100&width=100",
      address: "Av. Apoquindo 789, Las Condes",
      phone: "+56911223344",
    },
  },
  {
    id: "4",
    title: "Pizza Familiar $8.990",
    description: "Ahorra $3.000 en pizza familiar",
    discount_type: "fixed",
    discount_value: 3000,
    original_price: 11990,
    final_price: 8990,
    is_urgent: false,
    expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    business_profiles: {
      business_name: "Pizzería Napolitana",
      business_type: "restaurant",
      logo_url: "/placeholder.svg?height=100&width=100",
      address: "Av. Vicuña Mackenna 321, Ñuñoa",
      phone: "+56955667788",
    },
  },
  {
    id: "5",
    title: "40% OFF en Sushi",
    description: "Solo por hoy - Rolls premium",
    discount_type: "percentage",
    discount_value: 40,
    original_price: 15000,
    final_price: 9000,
    is_urgent: true,
    expires_at: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    business_profiles: {
      business_name: "Sushi Bar Tokio",
      business_type: "restaurant",
      logo_url: "/placeholder.svg?height=100&width=100",
      address: "Mall Costanera Center, Providencia",
      phone: "+56922334455",
    },
  },
]

export default function HomePage() {
  const router = useRouter()
  const [nearbyOffers, setNearbyOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  useEffect(() => {
    async function fetchOffers() {
      try {
        console.log("[v0] Obteniendo ofertas desde API route...")

        const response = await fetch("/api/offers")
        const data = await response.json()

        if (data.error === "preview_environment" || !data.offers || data.offers.length === 0) {
          setIsPreviewMode(true)
          setNearbyOffers(MOCK_OFFERS)
        } else {
          setIsPreviewMode(false)
          setNearbyOffers(data.offers)
        }
      } catch (error) {
        setIsPreviewMode(true)
        setNearbyOffers(MOCK_OFFERS)
      } finally {
        setLoading(false)
      }
    }

    fetchOffers()
  }, [])

  const navigationOptions = [
    {
      title: "Mapa de Ofertas",
      description: "Encuentra descuentos cerca de ti",
      icon: MapPin,
      route: "/mapa",
      color: "bg-red-500",
      urgentCount: nearbyOffers.filter((o) => o.is_urgent).length,
    },
    {
      title: "Ver Ofertas",
      description: "Explora todas las promociones",
      icon: Tag,
      route: "/ofertas",
      color: "bg-green-500",
      urgentCount: nearbyOffers.length,
    },
    {
      title: "Notificaciones",
      description: "Alertas de descuentos urgentes",
      icon: Bell,
      route: "/notificaciones",
      color: "bg-yellow-500",
      urgentCount: nearbyOffers.filter((o) => o.is_urgent).length,
    },
    {
      title: "Mi Perfil",
      description: "Configuración y estadísticas",
      icon: User,
      route: "/perfil",
      color: "bg-blue-500",
      urgentCount: 0,
    },
  ]

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-gray-50 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-500 mb-4" />
        <p className="text-gray-600">Cargando ofertas...</p>
      </div>
    )
  }

  if (nearbyOffers.length === 0) {
    return (
      <NotificationProvider offers={[]}>
        <div className="flex flex-col h-screen bg-gray-50">
          <FlashyHeader
            onMenuClick={() => {}}
            onNotificationClick={() => router.push("/notificaciones")}
            notificationCount={0}
          />

          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <Zap className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No hay ofertas disponibles</h2>
            <p className="text-gray-600 text-center mb-6">
              Las ofertas aparecerán aquí cuando los negocios las publiquen desde Flashy for Admins
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            >
              Actualizar
            </Button>
          </div>
        </div>
      </NotificationProvider>
    )
  }

  return (
    <NotificationProvider offers={nearbyOffers}>
      <div className="flex flex-col h-screen bg-gray-50">
        <FlashyHeader
          onMenuClick={() => {}}
          onNotificationClick={() => router.push("/notificaciones")}
          notificationCount={nearbyOffers.filter((offer) => offer.is_urgent).length}
        />

        {isPreviewMode && (
          <div className="bg-yellow-50 border-b border-yellow-200 p-3">
            <div className="flex items-center gap-2 text-yellow-800 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p>
                <strong>Modo Preview:</strong> Mostrando datos de prueba. Al desplegar en Vercel, se conectará con
                Flashy for Admins automáticamente.
              </p>
            </div>
          </div>
        )}

        <DiscountBanner offers={nearbyOffers} />

        {/* Welcome Section */}
        <div className="p-6 bg-white">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">¡Hola!</h1>
          </div>
          <p className="text-gray-600 text-lg">
            {nearbyOffers.length > 0
              ? `${nearbyOffers.length} ofertas increíbles cerca de ti`
              : "Descubre ofertas increíbles cerca de ti"}
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="flex-1 p-6 space-y-4">
          {navigationOptions.map((option, index) => (
            <Card key={index} className="shadow-lg border-0">
              <CardContent className="p-0">
                <Button
                  onClick={() => router.push(option.route)}
                  variant="ghost"
                  className="w-full h-20 justify-start p-6 hover:bg-gray-50"
                >
                  <div className={`w-12 h-12 rounded-full ${option.color} flex items-center justify-center mr-4`}>
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-lg text-gray-900">{option.title}</h3>
                    <p className="text-gray-600">{option.description}</p>
                  </div>
                  {option.urgentCount > 0 && (
                    <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {option.urgentCount}
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Action Button */}
        <div className="p-6">
          <Button
            onClick={() => router.push("/mapa")}
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          >
            <MapPin className="w-6 h-6 mr-2" />
            Buscar Ofertas Ahora
          </Button>
        </div>
      </div>
    </NotificationProvider>
  )
}
