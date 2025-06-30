"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Gift, Target, Users } from "lucide-react"

interface User {
  name: string
  greenPoints: number
  level: number
  nextLevelPoints: number
  carbonSaved: number
  leaderboardRank: number
}

interface Challenge {
  id: string
  title: string
  description: string
  progress: number
  target: number
  reward: number
  type: "daily" | "weekly" | "monthly"
  completed: boolean
}

interface Reward {
  id: string
  name: string
  description: string
  cost: number
  category: "discount" | "product" | "experience"
  available: boolean
}

interface GamificationPanelProps {
  user: User
  challenges: Challenge[]
  rewards: Reward[]
}

export function GamificationPanel({ user, challenges, rewards }: GamificationPanelProps) {
  const levelProgress = (user.greenPoints / user.nextLevelPoints) * 100

  return (
    <div className="space-y-6">
      {/* User Progress */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-6 w-6 mr-2 text-yellow-600" />
            Your Eco Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-700">{user.greenPoints}</p>
              <p className="text-sm text-gray-600">Green Points</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">Level {user.level}</p>
              <p className="text-sm text-gray-600">Eco Champion</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {user.level + 1}</span>
              <span>
                {user.greenPoints} / {user.nextLevelPoints}
              </span>
            </div>
            <Progress value={levelProgress} className="h-3" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-xl font-bold text-green-600">{user.carbonSaved}kg</p>
              <p className="text-xs text-gray-600">Carbon Saved</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-xl font-bold text-blue-600">#{user.leaderboardRank}</p>
              <p className="text-xs text-gray-600">Leaderboard</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Active Challenges
          </CardTitle>
          <CardDescription>Complete challenges to earn Green Points and unlock rewards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium">{challenge.title}</h4>
                  <p className="text-sm text-gray-600">{challenge.description}</p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      challenge.type === "daily" ? "default" : challenge.type === "weekly" ? "secondary" : "outline"
                    }
                  >
                    {challenge.type}
                  </Badge>
                  <p className="text-sm font-medium text-green-600 mt-1">+{challenge.reward} points</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {challenge.progress} / {challenge.target}
                  </span>
                </div>
                <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
              </div>

              {challenge.completed && (
                <Badge className="mt-2 bg-green-100 text-green-800">Completed! Claim reward</Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rewards Store */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="h-5 w-5 mr-2" />
            Rewards Store
          </CardTitle>
          <CardDescription>Redeem your Green Points for exclusive rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <div key={reward.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{reward.name}</h4>
                  <Badge
                    variant={
                      reward.category === "discount"
                        ? "default"
                        : reward.category === "product"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {reward.category}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 mb-3">{reward.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{reward.cost} points</span>
                  </div>
                  <Button
                    size="sm"
                    disabled={!reward.available || user.greenPoints < reward.cost}
                    variant={user.greenPoints >= reward.cost ? "default" : "outline"}
                  >
                    {user.greenPoints >= reward.cost ? "Redeem" : "Not enough points"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Community Leaderboard
          </CardTitle>
          <CardDescription>See how you rank among eco-conscious shoppers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { rank: 1, name: "EcoWarrior23", points: 2450, badge: "🏆" },
              { rank: 2, name: "GreenGuru", points: 2380, badge: "🥈" },
              { rank: 3, name: "SustainableSam", points: 2210, badge: "🥉" },
              { rank: user.leaderboardRank, name: user.name, points: user.greenPoints, badge: "⭐", isUser: true },
              { rank: 5, name: "EcoFriendly42", points: 1890, badge: "" },
            ].map((player, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${player.isUser ? "bg-blue-50 border border-blue-200" : "bg-gray-50"}`}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-3">{player.badge || `#${player.rank}`}</span>
                  <div>
                    <p className={`font-medium ${player.isUser ? "text-blue-800" : ""}`}>
                      {player.name} {player.isUser && "(You)"}
                    </p>
                    <p className="text-sm text-gray-600">{player.points} Green Points</p>
                  </div>
                </div>
                {player.rank <= 3 && <Badge className="bg-yellow-100 text-yellow-800">Top 3</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
