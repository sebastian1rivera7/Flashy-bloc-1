"use client"

import { useState, useEffect } from "react"
import { RealSantiagoMap } from "@/components/real-santiago-map"
import { FlashyHeader } from "@/components/flashy-header"
import { DiscountBanner } from "@/components/discount-banner"
import { BottomNavigation } from "@/components/bottom-navigation"
import { DiscountCardsView } from "@/components/discount-cards-view"
import { NotificationCenter } from "@/components/notification-center"
import { NotificationProvider } from "@/components/notification-provider"
import { UserProfile } from "@/components/user-profile"

export default function HomePage() {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [activeView, setActiveView] = useState<"map" | "cards" | "notifications" | "profile">("map")
  const [nearbyOffers, setNearbyOffers] = useState([
    {
      id: 1,
      business: "Café Central Plaza de Armas",
      discount: "30%",
      timeLeft: "15 min",
      distance: "0.2 km",
      category: "Comida",
      description: "Café de especialidad y empanadas caseras típicas chilenas",
      originalPrice: "$4.500",
      discountedPrice: "$3.150",
      rating: 4.8,
      image: "/placeholder.svg?height=120&width=200&text=Café+Plaza+Armas",
      address: "Plaza de Armas, Santiago Centro",
      isUrgent: true,
    },
    {
      id: 2,
      business: "Cine Hoyts La Reina",
      discount: "40%",
      timeLeft: "8 min",
      distance: "0.5 km",
      category: "Entretenimiento",
      description: "Últimos estrenos con sonido premium y butacas reclinables",
      originalPrice: "$8.500",
      discountedPrice: "$5.100",
      rating: 4.2,
      image: "/placeholder.svg?height=120&width=200&text=Cine+La+Reina",
      address: "Av. Ossa 655, La Reina",
      isUrgent: true,
    },
    {
      id: 3,
      business: "Mall Costanera Center",
      discount: "25%",
      timeLeft: "45 min",
      distance: "0.8 km",
      category: "Shopping",
      description: "El mall más alto de Sudamérica con las mejores marcas",
      originalPrice: "$45.990",
      discountedPrice: "$34.493",
      rating: 4.3,
      image: "/placeholder.svg?height=120&width=200&text=Costanera+Center",
      address: "Av. Andrés Bello 2425, Providencia",
      isUrgent: false,
    },
    {
      id: 4,
      business: "Jumbo Las Condes",
      discount: "20%",
      timeLeft: "25 min",
      distance: "1.2 km",
      category: "Supermercado",
      description: "Supermercado con productos frescos y ofertas especiales",
      originalPrice: "$25.990",
      discountedPrice: "$20.792",
      rating: 4.1,
      image: "/placeholder.svg?height=120&width=200&text=Jumbo+Las+Condes",
      address: "Av. Kennedy 9001, Las Condes",
      isUrgent: false,
    },
    {
      id: 5,
      business: "Completos Italianos Centro",
      discount: "35%",
      timeLeft: "12 min",
      distance: "0.1 km",
      category: "Comida",
      description: "Los mejores completos italianos de Santiago Centro",
      originalPrice: "$3.200",
      discountedPrice: "$2.080",
      rating: 4.7,
      image: "/placeholder.svg?height=120&width=200&text=Completos+Centro",
      address: "Paseo Ahumada, Santiago Centro",
      isUrgent: true,
    },
    {
      id: 6,
      business: "Farmacia Ahumada Providencia",
      discount: "15%",
      timeLeft: "35 min",
      distance: "0.6 km",
      category: "Salud",
      description: "Medicamentos y productos de cuidado personal",
      originalPrice: "$12.990",
      discountedPrice: "$11.042",
      rating: 4.6,
      image: "/placeholder.svg?height=120&width=200&text=Farmacia+Providencia",
      address: "Av. Providencia 1308, Providencia",
      isUrgent: false,
    },
  ])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Acceso a ubicación denegado")
          setCurrentLocation({ lat: -33.4489, lng: -70.6693 })
        },
      )
    } else {
      setCurrentLocation({ lat: -33.4489, lng: -70.6693 })
    }
  }, [])

  const renderActiveView = () => {
    switch (activeView) {
      case "map":
        return <RealSantiagoMap />
      case "cards":
        return <DiscountCardsView offers={nearbyOffers} onViewChange={() => setActiveView("map")} />
      case "notifications":
        return <NotificationCenter offers={nearbyOffers} />
      case "profile":
        return <UserProfile offers={nearbyOffers} />
      default:
        return <RealSantiagoMap />
    }
  }

  return (
    <NotificationProvider offers={nearbyOffers}>
      <div className="flex flex-col h-screen bg-background">
        <FlashyHeader
          onMenuClick={() => console.log("Menu clicked")}
          onNotificationClick={() => setActiveView("notifications")}
          notificationCount={nearbyOffers.filter((offer) => offer.isUrgent).length}
        />

        {/* Discount Banner - only show on map and cards views */}
        {(activeView === "map" || activeView === "cards") && <DiscountBanner offers={nearbyOffers} />}

        {/* Main Content */}
        <div className="flex-1 relative">{renderActiveView()}</div>

        {/* Bottom Navigation */}
        <BottomNavigation activeView={activeView} onViewChange={setActiveView} />
      </div>
    </NotificationProvider>
  )
}
