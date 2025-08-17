"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Trophy, TrendingUp, Calendar, Target } from "lucide-react"

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

interface Offer {
  id: number
  business: string
  discount: string
  category: string
  originalPrice: string
  discountedPrice: string
}

interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  unlocked: boolean
}

interface ProfileStatsProps {
  user: User
  offers: Offer[]
  achievements: Achievement[]
  onBack: () => void
}

export function ProfileStats({ user, offers, achievements, onBack }: ProfileStatsProps) {
  const monthlyStats = {
    dealsThisMonth: 8,
    savingsThisMonth: 67.45,
    favoriteDay: "Friday",
    mostUsedCategory: "Food",
  }

  const categoryStats = offers.reduce(
    (acc, offer) => {
      acc[offer.category] = (acc[offer.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const totalPossibleSavings = offers.reduce((total, offer) => {
    const savings =
      Number.parseFloat(offer.originalPrice.replace("$", "")) -
      Number.parseFloat(offer.discountedPrice.replace("$", ""))
    return total + savings
  }, 0)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Your Stats</h1>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Overall Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">${user.totalSavings}</div>
                <div className="text-sm text-muted-foreground">Total Saved</div>
                <div className="text-xs text-green-600 mt-1">+${monthlyStats.savingsThisMonth} this month</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-secondary">{user.dealsUsed}</div>
                <div className="text-sm text-muted-foreground">Deals Used</div>
                <div className="text-xs text-blue-600 mt-1">+{monthlyStats.dealsThisMonth} this month</div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold">{monthlyStats.dealsThisMonth}</div>
                  <div className="text-sm text-muted-foreground">Deals Used</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold">${monthlyStats.savingsThisMonth}</div>
                  <div className="text-sm text-muted-foreground">Saved</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold">{monthlyStats.favoriteDay}</div>
                  <div className="text-sm text-muted-foreground">Favorite Day</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold">{monthlyStats.mostUsedCategory}</div>
                  <div className="text-sm text-muted-foreground">Top Category</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Available Deals by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(categoryStats).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(count / offers.length) * 100}%` }}
                        />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {count}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Potential Savings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Potential Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">${totalPossibleSavings.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Available if you use all current deals</div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Achievements ({achievements.filter((a) => a.unlocked).length}/{achievements.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    achievement.unlocked ? "bg-green-50 border border-green-200" : "bg-muted/50"
                  }`}
                >
                  <div className={`text-2xl ${!achievement.unlocked && "grayscale opacity-50"}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold text-sm ${!achievement.unlocked && "text-muted-foreground"}`}>
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                  <Badge
                    variant={achievement.unlocked ? "default" : "secondary"}
                    className={achievement.unlocked ? "bg-green-100 text-green-700" : ""}
                  >
                    {achievement.unlocked ? "Unlocked" : "Locked"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Level Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Level Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Level</span>
                  <Badge className="bg-primary text-primary-foreground">{user.level}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to Platinum</span>
                    <span>23/30 deals</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "76%" }} />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Use 7 more deals to reach Platinum level and unlock exclusive benefits!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}
