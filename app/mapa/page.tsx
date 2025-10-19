"use client"
import { FlashyHeader } from "@/components/flashy-header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import { LeafletMap } from "@/components/leaflet-map"

export default function MapaPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-screen bg-background">
      <FlashyHeader
        onMenuClick={() => router.push("/")}
        onNotificationClick={() => router.push("/notificaciones")}
        notificationCount={0}
      />

      {/* Mobile-friendly back button */}
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
          <MapPin className="w-5 h-5" />
          Mapa de Ofertas
        </div>
      </div>

      <div className="flex-1 relative">
        <LeafletMap />
      </div>

      <BottomNavigation activeView="map" />
    </div>
  )
}
