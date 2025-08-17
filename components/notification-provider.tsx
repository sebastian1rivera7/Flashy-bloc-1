"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Notification } from "@/components/notification-item"

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

interface NotificationProviderProps {
  children: ReactNode
  offers: Array<{
    id: number
    business: string
    discount: string
    timeLeft: string
    distance: string
    category: string
  }>
}

export function NotificationProvider({ children, offers }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Initialize with sample notifications
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: "1",
        type: "urgent",
        title: "Flash Deal Ending Soon!",
        message: "25% off at Coffee Corner expires in 12 minutes. Don't miss out!",
        timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
        read: false,
        businessName: "Coffee Corner",
        discount: "25%",
        distance: "0.1 km",
        timeLeft: "12 min",
        category: "Food",
      },
      {
        id: "2",
        type: "new_deal",
        title: "New Deal Near You!",
        message: "Fashion Hub just added a 30% discount on all items.",
        timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
        read: false,
        businessName: "Fashion Hub",
        discount: "30%",
        distance: "0.8 km",
        category: "Shopping",
      },
      {
        id: "3",
        type: "nearby",
        title: "You're Near a Deal!",
        message: "Pizza Palace is just 200m away with 20% off all pizzas.",
        timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
        read: true,
        businessName: "Pizza Palace",
        discount: "20%",
        distance: "0.2 km",
        category: "Food",
      },
      {
        id: "4",
        type: "expiring",
        title: "Deal Expiring Soon",
        message: "Your saved deal at Cinema Plus expires in 45 minutes.",
        timestamp: new Date(Date.now() - 45 * 60000), // 45 minutes ago
        read: true,
        businessName: "Cinema Plus",
        discount: "15%",
        timeLeft: "45 min",
        category: "Entertainment",
      },
      {
        id: "5",
        type: "achievement",
        title: "Savings Milestone!",
        message: "Congratulations! You've saved over $100 this month with Flashy.",
        timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
        read: false,
      },
    ]

    setNotifications(sampleNotifications)
  }, [])

  // Simulate real-time notifications based on offers
  useEffect(() => {
    const interval = setInterval(() => {
      // Check for urgent deals (less than 20 minutes)
      const urgentOffers = offers.filter((offer) => Number.parseInt(offer.timeLeft) < 20)

      urgentOffers.forEach((offer) => {
        const existingNotification = notifications.find((n) => n.businessName === offer.business && n.type === "urgent")

        if (!existingNotification) {
          addNotification({
            type: "urgent",
            title: "Deal Ending Soon!",
            message: `${offer.discount} off at ${offer.business} expires in ${offer.timeLeft}!`,
            read: false,
            businessName: offer.business,
            discount: offer.discount,
            distance: offer.distance,
            timeLeft: offer.timeLeft,
            category: offer.category,
          })
        }
      })
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [offers, notifications])

  const addNotification = (notification: Omit<Notification, "id" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
