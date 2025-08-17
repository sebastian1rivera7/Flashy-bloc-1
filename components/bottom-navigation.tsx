"use client"

import { Home, MapPin, Bell, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useNotifications } from "@/components/notification-provider"

interface BottomNavigationProps {
  activeView?: "map" | "cards" | "notifications" | "profile"
  onViewChange?: (view: "map" | "cards" | "notifications" | "profile") => void
}

export function BottomNavigation({ activeView = "map", onViewChange }: BottomNavigationProps) {
  const { unreadCount } = useNotifications()

  const navItems = [
    {
      icon: Home,
      label: "Home",
      active: activeView === "map",
      onClick: () => onViewChange?.("map"),
    },
    {
      icon: MapPin,
      label: "Cards",
      active: activeView === "cards",
      onClick: () => onViewChange?.("cards"),
    },
    {
      icon: Bell,
      label: "Offers",
      active: activeView === "notifications",
      onClick: () => onViewChange?.("notifications"),
      badge: unreadCount,
    },
    {
      icon: User,
      label: "Profile",
      active: activeView === "profile",
      onClick: () => onViewChange?.("profile"),
    },
  ]

  return (
    <div className="bg-card border-t border-border px-4 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              onClick={item.onClick}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors relative",
                item.active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge && item.badge > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
                  >
                    {item.badge > 99 ? "99+" : item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
