"use client"

import { Bell, Search, Menu, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FlashyHeaderProps {
  onMenuClick: () => void
  onNotificationClick: () => void
  notificationCount: number
}

export default function FlashyHeader({ onMenuClick, onNotificationClick, notificationCount }: FlashyHeaderProps) {
  return (
    <div className="mcdonalds-gradient text-white p-4 shadow-lg mcdonalds-glow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="text-white hover:bg-white/20">
            <Menu className="w-6 h-6" />
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center santiago-pulse">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-black font-sans tracking-wide">FLASHY</h1>
              <p className="text-sm font-bold opacity-90">Santiago, Chile 🇨🇱</p>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNotificationClick}
          className="text-white hover:bg-white/20 relative"
        >
          <Bell className="w-6 h-6" />
          {notificationCount > 0 && (
            <div
              className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs 
              font-black rounded-full w-6 h-6 flex items-center justify-center flashy-bounce"
            >
              {notificationCount > 9 ? "9+" : notificationCount}
            </div>
          )}
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          placeholder="🔍 ¡Buscar ofertas increíbles en Santiago!"
          className="w-full pl-12 pr-20 py-4 rounded-2xl bg-white text-foreground font-bold
            placeholder-muted-foreground focus:outline-none focus:ring-4 focus:ring-secondary 
            shadow-lg text-lg"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="bg-primary text-primary-foreground px-3 py-2 rounded-full text-sm font-black flashy-bounce">
            🔥 HOT
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm font-bold">
        <div className="flex items-center gap-4">
          <span className="bg-white/20 px-2 py-1 rounded-full">🌡️ 22°C</span>
          <span className="bg-white/20 px-2 py-1 rounded-full">📍 Centro</span>
          <span className="bg-white/20 px-2 py-1 rounded-full">🚇 Metro</span>
        </div>
        <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-black santiago-pulse">
          ¡{notificationCount} OFERTAS URGENTES! 🚨
        </div>
      </div>
    </div>
  )
}

export { FlashyHeader }
