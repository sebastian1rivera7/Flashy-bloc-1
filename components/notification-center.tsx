"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Check, Settings } from "lucide-react"
import { NotificationItem } from "@/components/notification-item"
import { useNotifications } from "@/components/notification-provider"

interface Offer {
  id: number
  business: string
  discount: string
  timeLeft: string
  distance: string
  category: string
  description: string
  originalPrice: string
  discountedPrice: string
  rating: number
  image: string
}

interface NotificationCenterProps {
  offers: Offer[]
}

export function NotificationCenter({ offers }: NotificationCenterProps) {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, unreadCount } = useNotifications()
  const [filter, setFilter] = useState<"all" | "unread" | "urgent">("all")

  const filteredNotifications = notifications.filter((notification) => {
    switch (filter) {
      case "unread":
        return !notification.read
      case "urgent":
        return notification.type === "urgent" || notification.type === "expiring"
      default:
        return true
    }
  })

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <Check className="w-4 h-4 mr-1" />
                Mark All Read
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {[
            { key: "all", label: "All", count: notifications.length },
            { key: "unread", label: "Unread", count: unreadCount },
            {
              key: "urgent",
              label: "Urgent",
              count: notifications.filter((n) => n.type === "urgent" || n.type === "expiring").length,
            },
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={filter === tab.key ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(tab.key as "all" | "unread" | "urgent")}
              className="relative"
            >
              {tab.label}
              {tab.count > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                  {tab.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {filter === "unread"
                  ? "All caught up! No unread notifications."
                  : filter === "urgent"
                    ? "No urgent notifications at the moment."
                    : "You'll see new deals and updates here."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={() => markAsRead(notification.id)}
                onDelete={() => deleteNotification(notification.id)}
              />
            ))
          )}
        </div>
      </ScrollArea>

      {/* Quick Stats */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">{offers.length}</div>
            <div className="text-xs text-muted-foreground">Active Deals</div>
          </div>
          <div>
            <div className="text-lg font-bold text-secondary">
              {offers.filter((offer) => Number.parseInt(offer.timeLeft) < 30).length}
            </div>
            <div className="text-xs text-muted-foreground">Expiring Soon</div>
          </div>
          <div>
            <div className="text-lg font-bold text-accent">
              $
              {offers
                .reduce((total, offer) => {
                  const savings =
                    Number.parseFloat(offer.originalPrice.replace("$", "")) -
                    Number.parseFloat(offer.discountedPrice.replace("$", ""))
                  return total + savings
                }, 0)
                .toFixed(0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Savings</div>
          </div>
        </div>
      </div>
    </div>
  )
}
