"use client"

import { useEffect, useRef, useState } from "react"
import { Navigation, Zap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

interface Business {
  id: string
  business_name: string
  address: string
  latitude: number
  longitude: number
  logo_url: string
  business_type: string
}

interface Offer {
  id: string
  title: string
  discount_type: string
  discount_value: number
  is_urgent: boolean
  expires_at: string
  business_profiles: Business
}

export function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [userLocation, setUserLocation] = useState({ lat: -33.4489, lng: -70.6693 }) // Santiago Centro
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("[v0] Error obteniendo ubicación:", error.message)
          // Usar ubicación por defecto de Santiago
        },
      )
    }
  }, [])

  useEffect(() => {
    async function fetchOffers() {
      try {
        const { data, error: fetchError } = await supabase
          .from("offers")
          .select(`
            *,
            business_profiles (
              id,
              business_name,
              address,
              latitude,
              longitude,
              logo_url,
              business_type
            )
          `)
          .eq("is_active", true)
          .gt("expires_at", new Date().toISOString())

        if (fetchError) throw fetchError

        if (data && data.length > 0) {
          setOffers(data)
        } else {
          setOffers(MOCK_OFFERS)
        }
      } catch (err) {
        console.log("[v0] Error fetching offers, usando datos de prueba:", err)
        setOffers(MOCK_OFFERS)
      } finally {
        setLoading(false)
      }
    }

    fetchOffers()
  }, [supabase])

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Radio de la Tierra en km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  function formatDiscount(offer: Offer): string {
    if (offer.discount_type === "percentage") {
      return `${offer.discount_value}% OFF`
    }
    return `$${offer.discount_value?.toLocaleString() || 0} menos`
  }

  function calculateTimeLeft(expiresAt: string): string {
    const now = new Date()
    const expires = new Date(expiresAt)
    const diff = expires.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 24) return `${Math.floor(hours / 24)} días`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes} min`
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600">Cargando mapa...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapRef}
        className="w-full h-full bg-gray-100 relative overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(229, 231, 235, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(229, 231, 235, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      >
        {/* Calles principales de Santiago */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 right-0 h-2 bg-gray-300 opacity-60"></div>
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-300 opacity-60"></div>
          <div className="absolute top-3/4 left-0 right-0 h-2 bg-gray-300 opacity-60"></div>
          <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-gray-300 opacity-60"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gray-300 opacity-60"></div>
          <div className="absolute left-3/4 top-0 bottom-0 w-2 bg-gray-300 opacity-60"></div>
        </div>

        {/* Marcador de usuario */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
        </div>

        {/* Marcadores de ofertas */}
        {offers.map((offer, index) => {
          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            offer.business_profiles?.latitude || -33.4489,
            offer.business_profiles?.longitude || -70.6693,
          )

          return (
            <button
              key={offer.id}
              onClick={() => setSelectedOffer(offer)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 z-10 ${
                offer.is_urgent ? "animate-bounce" : ""
              }`}
              style={{
                left: `${30 + (index % 3) * 20}%`,
                top: `${25 + Math.floor(index / 3) * 20}%`,
              }}
            >
              <div
                className={`w-12 h-12 rounded-full border-3 border-white shadow-lg flex items-center justify-center font-bold text-xs text-white ${
                  offer.is_urgent ? "bg-red-500" : "bg-[#FF6B35]"
                }`}
              >
                {offer.discount_type === "percentage" ? `${offer.discount_value}%` : "$"}
              </div>
              {offer.is_urgent && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-red-600" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Popup de oferta seleccionada */}
      {selectedOffer && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-2xl p-4 z-30 animate-in slide-in-from-bottom">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 mb-1">{selectedOffer.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{selectedOffer.business_profiles?.business_name}</p>
              <p className="text-xs text-gray-500 mb-2">{selectedOffer.business_profiles?.address}</p>
              <div className="flex items-center gap-2">
                <div
                  className={`px-3 py-1 rounded-full font-bold text-sm ${
                    selectedOffer.is_urgent ? "bg-red-500 text-white animate-pulse" : "bg-[#FF6B35] text-white"
                  }`}
                >
                  {formatDiscount(selectedOffer)}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Clock className="w-3 h-3" />
                  {calculateTimeLeft(selectedOffer.expires_at)}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedOffer(null)}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>
          </div>

          <Button className="w-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:opacity-90 font-bold">
            Ver Detalles
          </Button>
        </div>
      )}

      {/* Botón de centrar ubicación */}
      <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 z-20">
        <Navigation className="w-5 h-5 text-[#FF6B35]" />
      </button>

      {/* Contador de ofertas */}
      <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full shadow-lg z-20">
        <p className="text-sm font-bold text-gray-900">{offers.length} ofertas cerca</p>
      </div>
    </div>
  )
}

const MOCK_OFFERS: Offer[] = [
  {
    id: "1",
    title: "3 Empanadas por $3.000",
    discount_type: "fixed_amount",
    discount_value: 2000,
    is_urgent: true,
    expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    business_profiles: {
      id: "1",
      business_name: "Empanadas La Chilena",
      address: "Plaza de Armas 123, Santiago Centro",
      latitude: -33.4372,
      longitude: -70.6506,
      logo_url: "/placeholder.svg",
      business_type: "restaurant",
    },
  },
  {
    id: "2",
    title: "30% OFF en Completos",
    discount_type: "percentage",
    discount_value: 30,
    is_urgent: false,
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    business_profiles: {
      id: "2",
      business_name: "Completos El Rápido",
      address: "Av. Providencia 456, Providencia",
      latitude: -33.4172,
      longitude: -70.6061,
      logo_url: "/placeholder.svg",
      business_type: "restaurant",
    },
  },
  {
    id: "3",
    title: "2x1 en Café + Pastel",
    discount_type: "percentage",
    discount_value: 50,
    is_urgent: true,
    expires_at: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    business_profiles: {
      id: "3",
      business_name: "Café Colonia",
      address: "Av. Apoquindo 789, Las Condes",
      latitude: -33.395,
      longitude: -70.5475,
      logo_url: "/placeholder.svg",
      business_type: "cafe",
    },
  },
]
