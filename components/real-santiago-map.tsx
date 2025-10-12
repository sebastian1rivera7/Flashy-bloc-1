"use client"

import { useState } from "react"
import { MapPin, Star, Clock, Zap } from "lucide-react"

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
  const [selectedBusiness, setSelectedBusiness] = useState<(typeof santiagoBusinesses)[0] | null>(null)

  return (
    <div className="relative w-full h-full">
      {/* Simulated Santiago Map Background */}
      <div
        className="w-full h-full rounded-lg bg-gradient-to-br from-green-100 via-blue-50 to-green-200 relative overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            linear-gradient(45deg, rgba(156, 163, 175, 0.1) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(156, 163, 175, 0.1) 25%, transparent 25%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 20px 20px, 20px 20px",
        }}
      >
        {/* Santiago Streets Simulation */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 right-0 h-1 bg-gray-300 opacity-60"></div>
          <div className="absolute top-2/3 left-0 right-0 h-1 bg-gray-300 opacity-60"></div>
          <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-300 opacity-60"></div>
          <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-300 opacity-60"></div>
        </div>

        {/* Business Markers */}
        {santiagoBusinesses.map((business, index) => (
          <button
            key={business.id}
            onClick={() => setSelectedBusiness(business)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center font-bold text-xs text-white transition-all duration-300 hover:scale-110 ${
              business.urgent ? "bg-red-500 animate-pulse santiago-pulse" : "bg-yellow-500 mcdonalds-glow"
            }`}
            style={{
              left: `${25 + index * 15}%`,
              top: `${30 + index * 10}%`,
            }}
          >
            {business.discount}
          </button>
        ))}

        {/* Santiago Landmarks */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full shadow-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-red-600 mt-4 whitespace-nowrap">
          Plaza de Armas
        </div>
      </div>

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
