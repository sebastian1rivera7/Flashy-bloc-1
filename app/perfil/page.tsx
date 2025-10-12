"use client"

import { useState } from "react"
import { FlashyHeader } from "@/components/flashy-header"
import { UserProfile } from "@/components/user-profile"
import { BottomNavigation } from "@/components/bottom-navigation"
import { NotificationProvider } from "@/components/notification-provider"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PerfilPage() {
  const router = useRouter()
  const [nearbyOffers] = useState([
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
      discountType: "percentage",
    },
    // ... más ofertas
  ])

  return (
    <NotificationProvider offers={nearbyOffers}>
      <div className="flex flex-col h-screen bg-background">
        <FlashyHeader
          onMenuClick={() => router.push("/")}
          onNotificationClick={() => router.push("/notificaciones")}
          notificationCount={nearbyOffers.filter((offer) => offer.isUrgent).length}
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
            <User className="w-5 h-5" />
            Mi Perfil
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <UserProfile offers={nearbyOffers} />
        </div>

        <BottomNavigation activeView="profile" />
      </div>
    </NotificationProvider>
  )
}
