"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, Users, MapPin, ShoppingCart, Star } from "lucide-react"

export function AIRecommendationPanel() {
  const recommendations = [
    {
      id: "1",
      type: "demand",
      title: "Monsoon Demand Surge Predicted",
      description:
        "AI models predict 45% increase in umbrella and raincoat demand across Kerala and Karnataka in next 48 hours",
      confidence: 94,
      impact: "High",
      action: "Pre-position inventory",
      region: "South India",
      timeframe: "48 hours",
    },
    {
      id: "2",
      type: "customer",
      title: "Customer Behavior Shift Detected",
      description: "Organic products showing 32% higher purchase rate among customers aged 25-35 in metro cities",
      confidence: 87,
      impact: "Medium",
      action: "Expand organic range",
      region: "Metro Cities",
      timeframe: "1 week",
    },
    {
      id: "3",
      type: "social",
      title: "Social Media Trend Alert",
      description:
        "Viral cooking trend driving 28% spike in kitchen appliance searches. Stock up on air fryers and mixers",
      confidence: 91,
      impact: "High",
      action: "Increase kitchen inventory",
      region: "All India",
      timeframe: "3 days",
    },
    {
      id: "4",
      type: "regional",
      title: "Festival Season Preparation",
      description: "Diwali approaching - traditional wear and home decor items expected to see 60% demand increase",
      confidence: 96,
      impact: "Very High",
      action: "Festival inventory boost",
      region: "North & West India",
      timeframe: "2 weeks",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "demand":
        return TrendingUp
      case "customer":
        return Users
      case "social":
        return Star
      case "regional":
        return MapPin
      default:
        return Brain
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "demand":
        return "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
      case "customer":
        return "text-green-600 bg-green-50 dark:bg-green-900/20"
      case "social":
        return "text-purple-600 bg-purple-50 dark:bg-purple-900/20"
      case "regional":
        return "text-orange-600 bg-orange-50 dark:bg-orange-900/20"
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Very High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "High":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Card className="bg-white dark:bg-gray-900">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mr-3">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle>AI Recommendation Engine</CardTitle>
              <CardDescription>Smart insights powered by machine learning and social trends</CardDescription>
            </div>
          </div>
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Live AI</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recommendations.map((rec) => {
            const TypeIcon = getTypeIcon(rec.type)

            return (
              <Card key={rec.id} className="bg-gray-50 dark:bg-gray-800 border-0">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start">
                      <div
                        className={`w-10 h-10 rounded-lg ${getTypeColor(rec.type)} flex items-center justify-center mr-4 mt-1`}
                      >
                        <TypeIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white mr-3">{rec.title}</h4>
                          <Badge className={getImpactColor(rec.impact)}>{rec.impact} Impact</Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">{rec.description}</p>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {rec.region}
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {rec.timeframe}
                          </div>
                        </div>

                        <div className="flex items-center mb-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400 mr-3">AI Confidence:</span>
                          <div className="flex items-center flex-1">
                            <Progress value={rec.confidence} className="w-24 h-2 mr-2" />
                            <span className="text-sm font-semibold">{rec.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {rec.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* AI Insights Summary */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">🧠 AI Insights Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Recommendations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">92%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">₹2.4L</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Potential Revenue</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
