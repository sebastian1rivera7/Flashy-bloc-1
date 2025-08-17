"use client"

import { Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LocationButtonProps {
  currentLocation: { lat: number; lng: number } | null
}

export function LocationButton({ currentLocation }: LocationButtonProps) {
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location updated:", position.coords)
        },
        (error) => {
          console.log("Location access denied")
        },
      )
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleLocationClick}
      className="shrink-0 bg-muted/50 border-border hover:bg-background"
    >
      <Navigation className="w-4 h-4" />
    </Button>
  )
}
