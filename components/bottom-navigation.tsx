"use client"

import { Home, MapPin, Bell, User, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useNotifications } from "@/components/notification-provider"
import { useRouter, usePathname } from "next/navigation"

interface BottomNavigationProps {
  activeView?: "map" | "cards" | "notifications" | "profile"
  onViewChange?: (view: "map" | "cards" | "notifications" | "profile") => void
}

export function BottomNavigation({ activeView = "map" }: BottomNavigationProps) {
  const { unreadCount } = useNotifications()
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    {
      icon: Home,
      label: "Inicio",
      active: pathname === "/",
      onClick: () => router.push("/"),
    },
    {
      icon: MapPin,
      label: "Mapa",
      active: pathname === "/mapa",
      onClick: () => router.push("/mapa"),
    },
    {
      icon: Tag,
      label: "Ofertas",
      active: pathname === "/ofertas",
      onClick: () => router.push("/ofertas"),
    },
    {
      icon: Bell,
      label: "Alertas",
      active: pathname === "/notificaciones",
      onClick: () => router.push("/notificaciones"),
      badge: unreadCount,
    },
    {
      icon: User,
      label: "Perfil",
      active: pathname === "/perfil",
      onClick: () => router.push("/perfil"),
    },
  ]

  return (
    <div className="bg-white border-t border-gray-200 px-2 py-3 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              onClick={item.onClick}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 relative min-w-[60px]",
                item.active
                  ? "text-primary bg-primary/10 scale-105 shadow-sm"
                  : "text-gray-500 hover:text-primary hover:bg-gray-50 active:scale-95",
              )}
            >
              <div className="relative">
                <Icon className={cn("w-6 h-6", item.active && "animate-pulse")} />
                {item.badge && item.badge > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center animate-bounce"
                  >
                    {item.badge > 99 ? "99+" : item.badge}
                  </Badge>
                )}
              </div>
              <span className={cn("text-xs font-medium", item.active ? "font-bold" : "font-normal")}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
