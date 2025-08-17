"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Trash2, Zap, Star, Gift, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Notification {
  id: string
  type: "new_deal" | "expiring" | "nearby" | "urgent" | "achievement"
  title: string
  message: string
  timestamp: Date
  read: boolean
  businessName?: string
  discount?: string
  distance?: string
  timeLeft?: string
  category?: string
}

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: () => void
  onDelete: () => void
}

export function NotificationItem({ notification, onMarkAsRead, onDelete }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case "new_deal":
        return <Gift className="w-5 h-5 text-primary" />
      case "expiring":
        return <Clock className="w-5 h-5 text-orange-500" />
      case "nearby":
        return <MapPin className="w-5 h-5 text-blue-500" />
      case "urgent":
        return <Zap className="w-5 h-5 text-red-500" />
      case "achievement":
        return <Star className="w-5 h-5 text-yellow-500" />
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getTypeColor = () => {
    switch (notification.type) {
      case "urgent":
        return "border-red-200 bg-red-50/50"
      case "expiring":
        return "border-orange-200 bg-orange-50/50"
      case "new_deal":
        return "border-primary/20 bg-primary/5"
      default:
        return ""
    }
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "Just now"
  }

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        !notification.read && "ring-2 ring-primary/20",
        getTypeColor(),
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className={cn("font-semibold text-sm", !notification.read && "text-foreground")}>
                {notification.title}
              </h3>
              <div className="flex items-center gap-1">
                {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatTime(notification.timestamp)}
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>

            {/* Notification Details */}
            {(notification.businessName || notification.discount || notification.distance) && (
              <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                {notification.businessName && <span className="font-medium">{notification.businessName}</span>}
                {notification.discount && (
                  <Badge variant="secondary" className="text-xs">
                    {notification.discount} OFF
                  </Badge>
                )}
                {notification.distance && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{notification.distance}</span>
                  </div>
                )}
                {notification.timeLeft && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{notification.timeLeft}</span>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              {!notification.read && (
                <Button variant="ghost" size="sm" onClick={onMarkAsRead} className="h-7 px-2 text-xs">
                  Mark as read
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onDelete} className="h-7 px-2 text-xs text-muted-foreground">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
