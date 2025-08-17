"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Star, Clock, Zap } from "lucide-react"
import type { google } from "google-maps"

const santiagoBusinesses = [
  {
    id: 1,
    name: "Café Central",
    category: "Comida",
    discount: "30%",
    address: "Plaza de Armas, Santiago Centro",
    lat: -33.4372,
    lng: -70.6506,
    rating: 4.5,
    timeLeft: "15 min",
    urgent: true,
  },
  {
    id: 2,
    name: "Mall Costanera Center",
    category: "Shopping",
    discount: "25%",
    address: "Av. Andrés Bello 2425, Providencia",
    lat: -33.4172,
    lng: -70.6061,
    rating: 4.3,
    timeLeft: "45 min",
    urgent: false,
  },
  {
    id: 3,
    name: "Cine Hoyts La Reina",
    category: "Entretenimiento",
    discount: "40%",
    address: "Av. Ossa 655, La Reina",
    lat: -33.4406,
    lng: -70.5394,
    rating: 4.2,
    timeLeft: "8 min",
    urgent: true,
  },
  {
    id: 4,
    name: "Supermercado Jumbo Las Condes",
    category: "Supermercado",
    discount: "20%",
    address: "Av. Kennedy 9001, Las Condes",
    lat: -33.395,
    lng: -70.5475,
    rating: 4.1,
    timeLeft: "25 min",
    urgent: false,
  },
]

export function RealSantiagoMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [selectedBusiness, setSelectedBusiness] = useState<(typeof santiagoBusinesses)[0] | null>(null)

  useEffect(() => {
    if (!mapRef.current || !window.google) return

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: -33.4489, lng: -70.6693 }, // Centro de Santiago
      zoom: 12,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    })

    setMap(mapInstance)

    santiagoBusinesses.forEach((business) => {
      const marker = new window.google.maps.Marker({
        position: { lat: business.lat, lng: business.lng },
        map: mapInstance,
        title: business.name,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="${business.urgent ? "#dc2626" : "#f59e0b"}" stroke="white" strokeWidth="2"/>
              <text x="20" y="25" textAnchor="middle" fill="white" fontFamily="Poppins" fontWeight="bold" fontSize="10">${business.discount}</text>
            </svg>
          `)}`,
          scaledSize: new window.google.maps.Size(40, 40),
        },
      })

      marker.addListener("click", () => {
        setSelectedBusiness(business)
      })
    })
  }, [])

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg" />

      {selectedBusiness && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-2xl p-4 mcdonalds-glow">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-sans font-black text-lg text-primary mb-1">{selectedBusiness.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{selectedBusiness.address}</p>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 fill-secondary text-secondary" />
                <span className="text-sm font-semibold">{selectedBusiness.rating}</span>
                <span className="text-xs text-muted-foreground">• {selectedBusiness.category}</span>
              </div>
            </div>
            <button onClick={() => setSelectedBusiness(null)} className="text-muted-foreground hover:text-foreground">
              ✕
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`px-3 py-1 rounded-full font-black text-sm ${
                  selectedBusiness.urgent
                    ? "bg-primary text-primary-foreground flashy-bounce"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {selectedBusiness.discount} OFF
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {selectedBusiness.timeLeft}
              </div>
              {selectedBusiness.urgent && (
                <div className="flex items-center gap-1 text-xs text-primary font-bold">
                  <Zap className="w-3 h-3" />
                  ¡URGENTE!
                </div>
              )}
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors santiago-pulse">
              ¡RECLAMAR!
            </button>
          </div>
        </div>
      )}

      <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg mcdonalds-glow">
        <MapPin className="w-5 h-5 text-primary" />
      </button>
    </div>
  )
}
