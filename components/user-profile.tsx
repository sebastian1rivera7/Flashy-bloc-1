"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Settings, Edit, Trophy, MapPin, Bell, Shield, HelpCircle, LogOut } from "lucide-react"
import { ProfileSettings } from "@/components/profile-settings"
import { ProfileStats } from "@/components/profile-stats"

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

interface UserProfileProps {
  offers: Offer[]
}

export function UserProfile({ offers }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "settings" | "stats">("profile")

  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: "/placeholder.svg?height=80&width=80&text=AJ",
    joinDate: "March 2024",
    level: "Gold Member",
    totalSavings: 247.85,
    dealsUsed: 23,
    favoriteCategory: "Food",
  }

  const achievements = [
    { id: 1, title: "Early Bird", description: "Used 5 deals before 10 AM", icon: "🌅", unlocked: true },
    { id: 2, title: "Foodie", description: "Claimed 10 food deals", icon: "🍕", unlocked: true },
    { id: 3, title: "Saver", description: "Saved over $200", icon: "💰", unlocked: true },
    { id: 4, title: "Explorer", description: "Visited 15 different businesses", icon: "🗺️", unlocked: false },
  ]

  const menuItems = [
    { icon: Settings, label: "Account Settings", action: () => setActiveTab("settings") },
    { icon: Bell, label: "Notification Preferences", action: () => setActiveTab("settings") },
    { icon: MapPin, label: "Location Settings", action: () => setActiveTab("settings") },
    { icon: Shield, label: "Privacy & Security", action: () => console.log("Privacy settings") },
    { icon: HelpCircle, label: "Help & Support", action: () => console.log("Help center") },
    { icon: LogOut, label: "Sign Out", action: () => console.log("Sign out") },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "settings":
        return <ProfileSettings user={user} onBack={() => setActiveTab("profile")} />
      case "stats":
        return (
          <ProfileStats
            user={user}
            offers={offers}
            achievements={achievements}
            onBack={() => setActiveTab("profile")}
          />
        )
      default:
        return (
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              {/* Profile Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                      <p className="text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {user.level}
                        </Badge>
                        <span className="text-sm text-muted-foreground">Member since {user.joinDate}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">${user.totalSavings}</div>
                    <div className="text-sm text-muted-foreground">Total Saved</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-secondary">{user.dealsUsed}</div>
                    <div className="text-sm text-muted-foreground">Deals Used</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-accent">{offers.length}</div>
                    <div className="text-sm text-muted-foreground">Available</div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => setActiveTab("stats")} className="h-12">
                  <Trophy className="w-4 h-4 mr-2" />
                  View Stats
                </Button>
                <Button variant="outline" onClick={() => setActiveTab("settings")} className="h-12">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>

              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {achievements
                    .filter((a) => a.unlocked)
                    .slice(0, 3)
                    .map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{achievement.title}</h4>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Unlocked
                        </Badge>
                      </div>
                    ))}
                </CardContent>
              </Card>

              {/* Menu Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <Button key={index} variant="ghost" className="w-full justify-start h-12" onClick={item.action}>
                        <Icon className="w-4 h-4 mr-3" />
                        {item.label}
                      </Button>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        )
    }
  }

  return <div className="flex flex-col h-full bg-background">{renderContent()}</div>
}
