"use client"

import { useState } from "react"
import { MapPin, Star, Clock, Zap } from "lucide-react"

interface SantiagoLocation {
  id: string
  name: string
  category: string
  discount: number
  timeLeft: string
  rating: number
  address: string
  coordinates: { lat: number; lng: number }
  isUrgent: boolean
}

const santiagoLocations: SantiagoLocation[] = [
  {
    id: "1",
    name: "Café Central",
    category: "Comida",
    discount: 25,
    timeLeft: "15 min",
    rating: 4.8,
    address: "Plaza de Armas, Santiago Centro",
    coordinates: { lat: -33.4372, lng: -70.6506 },
    isUrgent: true,
  },
  {
    id: "2",
    name: "Cine Hoyts La Reina",
    category: "Entretenimiento",
    discount: 30,
    timeLeft: "45 min",
    rating: 4.5,
    address: "Av. Larraín 5862, La Reina",
    coordinates: { lat: -33.4569, lng: -70.552 },
    isUrgent: false,
  },
  {
    id: "3",
    name: "Supermercado Jumbo",
    category: "Compras",
    discount: 20,
    timeLeft: "1h 20min",
    rating: 4.2,
    address: "Av. Kennedy 9001, Las Condes",
    coordinates: { lat: -33.405, lng: -70.58 },
    isUrgent: false,
  },
  {
    id: "4",
    name: "Farmacia Ahumada",
    category: "Salud",
    discount: 15,
    timeLeft: "35 min",
    rating: 4.6,
    address: "Av. Providencia 1308, Providencia",
    coordinates: { lat: -33.4372, lng: -70.6178 },
    isUrgent: true,
  },
  {
    id: "5",
    name: "Mall Costanera Center",
    category: "Compras",
    discount: 40,
    timeLeft: "2h 15min",
    rating: 4.7,
    address: "Av. Andrés Bello 2425, Providencia",
    coordinates: { lat: -33.4183, lng: -70.6067 },
    isUrgent: false,
  },
]

function SantiagoMap() {
  const [selectedLocation, setSelectedLocation] = useState<SantiagoLocation | null>(null)
  const [userLocation, setUserLocation] = useState({ lat: -33.4489, lng: -70.6693 }) // Santiago Centro

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Comida":
        return "bg-[#FF6F61] text-white"
      case "Entretenimiento":
        return "bg-[#3BB143] text-white"
      case "Compras":
        return "bg-[#FFB300] text-white"
      case "Salud":
        return "bg-[#00BFFF] text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Comida":
        return "🍽️"
      case "Entretenimiento":
        return "🎬"
      case "Compras":
        return "🛍️"
      case "Salud":
        return "💊"
      default:
        return "📍"
    }
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#87CEEB] to-[#8B7355] overflow-hidden">
      {/* Fondo de Santiago con los Andes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#8B7355] to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#87CEEB] to-transparent"></div>
      </div>

      {/* Mapa simulado de Santiago */}
      <div className="relative w-full h-full">
        {/* Calles principales simuladas */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/30 transform -translate-y-1/2"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/30 transform -translate-x-1/2"></div>
          <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-white/20"></div>
          <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-white/20"></div>
          <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-white/20"></div>
          <div className="absolute left-2/3 top-0 bottom-0 w-0.5 bg-white/20"></div>
        </div>

        {/* Ubicación del usuario */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-4 h-4 bg-[#FF6F61] rounded-full border-2 border-white shadow-lg santiago-glow"></div>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#FF6F61] text-white px-2 py-1 rounded text-xs font-medium">
            Tú estás aquí
          </div>
        </div>

        {/* Marcadores de negocios */}
        {santiagoLocations.map((location, index) => {
          const x = 20 + index * 15 + Math.sin(index) * 10
          const y = 25 + index * 12 + Math.cos(index) * 8

          return (
            <div
              key={location.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => setSelectedLocation(location)}
            >
              <div className={`relative ${location.isUrgent ? "flashy-pulse" : ""}`}>
                <div
                  className={`w-12 h-12 rounded-full ${getCategoryColor(location.category)} 
                  flex items-center justify-center text-lg shadow-lg border-2 border-white
                  hover:scale-110 transition-transform duration-200`}
                >
                  {getCategoryIcon(location.category)}
                </div>
                <div
                  className="absolute -top-2 -right-2 bg-[#FF4C4C] text-white text-xs font-bold 
                  rounded-full w-6 h-6 flex items-center justify-center"
                >
                  {location.discount}%
                </div>
                {location.isUrgent && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <Zap className="w-4 h-4 text-[#FFB300] animate-bounce" />
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Popup de ubicación seleccionada */}
        {selectedLocation && (
          <div
            className="absolute top-4 left-4 right-4 bg-white rounded-xl shadow-2xl p-4 z-30 
            border-2 border-[#FF6F61] animate-in slide-in-from-top duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg text-[#4B5563]">{selectedLocation.name}</h3>
                <p className="text-sm text-gray-600">{selectedLocation.address}</p>
              </div>
              <button onClick={() => setSelectedLocation(null)} className="text-gray-400 hover:text-gray-600 text-xl">
                ×
              </button>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedLocation.category)}`}
              >
                {selectedLocation.category}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-[#FFB300] fill-current" />
                <span className="text-sm font-medium">{selectedLocation.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-[#FF4C4C]">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{selectedLocation.timeLeft}</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FF6F61] to-[#FF4C4C] text-white p-3 rounded-lg mb-3">
              <div className="text-2xl font-bold">{selectedLocation.discount}% OFF</div>
              <div className="text-sm opacity-90">¡Oferta especial disponible!</div>
            </div>

            <button
              className="w-full bg-[#3BB143] text-white py-3 rounded-lg font-semibold 
              hover:bg-[#2ea33a] transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              Ir al negocio
            </button>
          </div>
        )}

        {/* Leyenda de Santiago */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="text-sm font-semibold text-[#4B5563] mb-2">📍 Santiago, Chile</div>
          <div className="text-xs text-gray-600">{santiagoLocations.length} ofertas cerca de ti</div>
        </div>

        {/* Indicador de los Andes */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
          <div className="text-xs text-[#8B7355] font-medium">🏔️ Cordillera de los Andes</div>
        </div>
      </div>
    </div>
  )
}

export { SantiagoMap }
