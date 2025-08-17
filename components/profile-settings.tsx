"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Bell, MapPin, Shield, Smartphone } from "lucide-react"

interface User {
  name: string
  email: string
  avatar: string
  joinDate: string
  level: string
  totalSavings: number
  dealsUsed: number
  favoriteCategory: string
}

interface ProfileSettingsProps {
  user: User
  onBack: () => void
}

export function ProfileSettings({ user, onBack }: ProfileSettingsProps) {
  const [settings, setSettings] = useState({
    notifications: {
      pushNotifications: true,
      emailNotifications: false,
      smsNotifications: true,
      newDeals: true,
      expiringDeals: true,
      nearbyDeals: true,
    },
    location: {
      shareLocation: true,
      backgroundLocation: false,
      locationRadius: "1",
    },
    privacy: {
      profileVisible: true,
      shareStats: false,
      dataCollection: true,
    },
    preferences: {
      darkMode: false,
      language: "English",
      currency: "USD",
    },
  })

  const updateSetting = (category: keyof typeof settings, key: string, value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }))
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={user.email} />
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Update Profile
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                </div>
                <Switch
                  checked={settings.notifications.pushNotifications}
                  onCheckedChange={(checked) => updateSetting("notifications", "pushNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get deals via email</p>
                </div>
                <Switch
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) => updateSetting("notifications", "emailNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Deals</Label>
                  <p className="text-sm text-muted-foreground">Alert when new deals are available</p>
                </div>
                <Switch
                  checked={settings.notifications.newDeals}
                  onCheckedChange={(checked) => updateSetting("notifications", "newDeals", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Expiring Deals</Label>
                  <p className="text-sm text-muted-foreground">Warn when deals are about to expire</p>
                </div>
                <Switch
                  checked={settings.notifications.expiringDeals}
                  onCheckedChange={(checked) => updateSetting("notifications", "expiringDeals", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Share Location</Label>
                  <p className="text-sm text-muted-foreground">Allow app to access your location</p>
                </div>
                <Switch
                  checked={settings.location.shareLocation}
                  onCheckedChange={(checked) => updateSetting("location", "shareLocation", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Background Location</Label>
                  <p className="text-sm text-muted-foreground">Find deals even when app is closed</p>
                </div>
                <Switch
                  checked={settings.location.backgroundLocation}
                  onCheckedChange={(checked) => updateSetting("location", "backgroundLocation", checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="radius">Search Radius (km)</Label>
                <Input
                  id="radius"
                  type="number"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={settings.location.locationRadius}
                  onChange={(e) => updateSetting("location", "locationRadius", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Profile Visible</Label>
                  <p className="text-sm text-muted-foreground">Allow others to see your profile</p>
                </div>
                <Switch
                  checked={settings.privacy.profileVisible}
                  onCheckedChange={(checked) => updateSetting("privacy", "profileVisible", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Share Statistics</Label>
                  <p className="text-sm text-muted-foreground">Share savings stats with friends</p>
                </div>
                <Switch
                  checked={settings.privacy.shareStats}
                  onCheckedChange={(checked) => updateSetting("privacy", "shareStats", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Collection</Label>
                  <p className="text-sm text-muted-foreground">Help improve the app with usage data</p>
                </div>
                <Switch
                  checked={settings.privacy.dataCollection}
                  onCheckedChange={(checked) => updateSetting("privacy", "dataCollection", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                App Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Use dark theme</p>
                </div>
                <Switch
                  checked={settings.preferences.darkMode}
                  onCheckedChange={(checked) => updateSetting("preferences", "darkMode", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button className="w-full" size="lg">
            Save All Settings
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}
