"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, X, Sparkles, Flame } from "lucide-react"

interface NotificationPreviewProps {
  onClose?: () => void
}

export function NotificationPreview({ onClose }: NotificationPreviewProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg p-6 max-w-md w-full space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Vista Preliminar - Notificaciones</h2>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Notificación Normal */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">Notificación Normal</h3>
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full -translate-y-8 translate-x-8" />
            <CardContent className="p-4 relative">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5 relative">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary tracking-wider">FLASHY</span>
                      <h4 className="font-semibold text-sm">Nueva oferta cerca</h4>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="text-xs text-muted-foreground">2m</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    🎯 Starbucks Plaza Italia tiene un 25% de descuento en frappés
                  </p>
                  <div className="flex items-center gap-3 mb-2 text-xs">
                    <span className="font-medium">Starbucks</span>
                    <Badge variant="secondary" className="text-xs bg-primary/20 text-primary border-primary/30">
                      25% OFF
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>150m</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    ⚡ Ver oferta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notificación Urgente */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">Notificación Urgente</h3>
          <Card className="border-2 border-red-500 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 shadow-2xl relative overflow-hidden animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 animate-pulse" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-pulse" />
            <CardContent className="p-4 relative">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5 relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                    <Flame className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-red-600 tracking-wider animate-pulse">⚡ FLASHY</span>
                      <h4 className="font-black text-sm text-red-700 animate-bounce">¡OFERTA FLASH!</h4>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                      <span className="text-xs text-red-600 font-black animate-pulse">AHORA</span>
                    </div>
                  </div>
                  <p className="text-sm text-red-700 font-bold mb-2 animate-pulse">
                    🔥 ¡70% OFF en McDonald's Providencia! Solo por 15 minutos 🔥
                  </p>
                  <div className="flex items-center gap-3 mb-3 text-xs">
                    <span className="font-black text-red-700">McDonald's</span>
                    <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-black animate-bounce border-2 border-yellow-400">
                      🔥 70% OFF 🔥
                    </Badge>
                    <div className="flex items-center gap-1 text-red-600">
                      <Clock className="w-3 h-3 animate-spin" />
                      <span className="font-black animate-pulse">14:32</span>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-black h-8 text-xs animate-bounce border-2 border-white shadow-lg">
                    ⚡ ¡RECLAMAR AHORA! ⚡
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-xs text-muted-foreground text-center pt-2">
          🎯 Las notificaciones Flashy aparecerán como pop-ups únicos en tu pantalla
        </div>
      </div>
    </div>
  )
}
