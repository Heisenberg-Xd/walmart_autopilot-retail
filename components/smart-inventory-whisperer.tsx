"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, AlertTriangle, Zap, CheckCircle, Clock, ArrowRight, Leaf } from "lucide-react"

interface WhispererSuggestion {
  id: string
  type: "urgent" | "opportunity" | "optimization" | "eco"
  title: string
  description: string
  impact: {
    revenue?: string
    cost?: string
    carbon?: string
    efficiency?: string
  }
  action: string
  confidence: number
  timeframe: string
  status: "new" | "in-progress" | "completed"
}

export function SmartInventoryWhisperer() {
  const [suggestions, setSuggestions] = useState<WhispererSuggestion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate AI generating suggestions
    setTimeout(() => {
      setSuggestions([
        {
          id: "1",
          type: "urgent",
          title: "Critical Stock Alert - Mumbai",
          description:
            "Shift 40 units of Cotton Kurta Sets from Delhi to Mumbai Bandra store. Rising demand detected due to festival season approach.",
          impact: {
            revenue: "+₹52,000",
            efficiency: "+15%",
          },
          action: "Transfer inventory now",
          confidence: 94,
          timeframe: "2 hours",
          status: "new",
        },
        {
          id: "2",
          type: "opportunity",
          title: "Weather-Based Demand Spike",
          description:
            "Heavy rain forecast in Kerala tomorrow. Pre-position raincoats and umbrellas to Kochi and Thiruvananthapuram stores.",
          impact: {
            revenue: "+₹28,000",
            efficiency: "+22%",
          },
          action: "Schedule transfer",
          confidence: 87,
          timeframe: "12 hours",
          status: "new",
        },
        {
          id: "3",
          type: "eco",
          title: "Carbon Optimization Opportunity",
          description:
            "Combine 3 deliveries in Pune area to reduce carbon footprint by 12%. Route optimization available.",
          impact: {
            carbon: "-8.5 kg CO₂",
            cost: "-₹450",
          },
          action: "Optimize routes",
          confidence: 91,
          timeframe: "30 minutes",
          status: "new",
        },
        {
          id: "4",
          type: "optimization",
          title: "Inventory Rebalancing",
          description:
            "Excess winter clothing in Bengaluru stores. Redistribute to Delhi and Shimla for better turnover.",
          impact: {
            efficiency: "+18%",
            cost: "-₹12,000",
          },
          action: "Rebalance stock",
          confidence: 89,
          timeframe: "24 hours",
          status: "in-progress",
        },
        {
          id: "5",
          type: "opportunity",
          title: "Local Event Impact",
          description: "Tech conference in Hyderabad next week. Increase laptop accessories and power banks inventory.",
          impact: {
            revenue: "+₹35,000",
            efficiency: "+25%",
          },
          action: "Prepare inventory",
          confidence: 85,
          timeframe: "3 days",
          status: "completed",
        },
      ])
      setLoading(false)
    }, 1500)
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return AlertTriangle
      case "opportunity":
        return TrendingUp
      case "optimization":
        return Zap
      case "eco":
        return Leaf
      default:
        return Brain
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "text-red-600 bg-red-50 dark:bg-red-900/20"
      case "opportunity":
        return "text-green-600 bg-green-50 dark:bg-green-900/20"
      case "optimization":
        return "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
      case "eco":
        return "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle
      case "in-progress":
        return Clock
      default:
        return ArrowRight
    }
  }

  const handleActionClick = (suggestion: WhispererSuggestion) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === suggestion.id ? { ...s, status: s.status === "new" ? "in-progress" : s.status } : s)),
    )
  }

  if (loading) {
    return (
      <Card className="bg-white dark:bg-gray-900">
        <CardHeader>
          <div className="flex items-center">
            <Brain className="h-6 w-6 text-blue-600 mr-3 animate-pulse" />
            <div>
              <CardTitle>Smart Inventory Whisperer</CardTitle>
              <CardDescription>AI is analyzing your inventory patterns...</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white dark:bg-gray-900">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mr-4">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Smart Inventory Whisperer</CardTitle>
              <CardDescription>AI-powered actionable insights for your retail operations</CardDescription>
            </div>
          </div>
          <Badge className="bg-yellow-400 text-blue-900">
            <Zap className="h-3 w-3 mr-1" />
            Live AI
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {suggestions.map((suggestion) => {
            const TypeIcon = getTypeIcon(suggestion.type)
            const StatusIcon = getStatusIcon(suggestion.status)

            return (
              <Card
                key={suggestion.id}
                className={`border-l-4 ${
                  suggestion.type === "urgent"
                    ? "border-l-red-500"
                    : suggestion.type === "opportunity"
                      ? "border-l-green-500"
                      : suggestion.type === "eco"
                        ? "border-l-emerald-500"
                        : "border-l-blue-500"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start">
                      <div
                        className={`w-10 h-10 rounded-lg ${getTypeColor(suggestion.type)} flex items-center justify-center mr-4 mt-1`}
                      >
                        <TypeIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white mr-3">{suggestion.title}</h4>
                          <Badge
                            variant={
                              suggestion.status === "completed"
                                ? "default"
                                : suggestion.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {suggestion.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">{suggestion.description}</p>

                        {/* Impact Metrics */}
                        <div className="flex flex-wrap gap-3 mb-4">
                          {suggestion.impact.revenue && (
                            <div className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              <span className="text-gray-600 dark:text-gray-400">Revenue: </span>
                              <span className="font-semibold text-green-600 ml-1">{suggestion.impact.revenue}</span>
                            </div>
                          )}
                          {suggestion.impact.cost && (
                            <div className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                              <span className="text-gray-600 dark:text-gray-400">Cost: </span>
                              <span className="font-semibold text-blue-600 ml-1">{suggestion.impact.cost}</span>
                            </div>
                          )}
                          {suggestion.impact.carbon && (
                            <div className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                              <span className="text-gray-600 dark:text-gray-400">Carbon: </span>
                              <span className="font-semibold text-emerald-600 ml-1">{suggestion.impact.carbon}</span>
                            </div>
                          )}
                          {suggestion.impact.efficiency && (
                            <div className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                              <span className="text-gray-600 dark:text-gray-400">Efficiency: </span>
                              <span className="font-semibold text-purple-600 ml-1">{suggestion.impact.efficiency}</span>
                            </div>
                          )}
                        </div>

                        {/* Confidence and Timeframe */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Confidence:</span>
                            <div className="flex items-center">
                              <Progress value={suggestion.confidence} className="w-20 h-2 mr-2" />
                              <span className="text-sm font-semibold">{suggestion.confidence}%</span>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Clock className="h-3 w-3 mr-1" />
                            {suggestion.timeframe}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-end">
                    <Button
                      onClick={() => handleActionClick(suggestion)}
                      disabled={suggestion.status === "completed"}
                      className={
                        suggestion.status === "completed"
                          ? "bg-green-600 hover:bg-green-700"
                          : suggestion.status === "in-progress"
                            ? "bg-yellow-600 hover:bg-yellow-700"
                            : "bg-blue-600 hover:bg-blue-700"
                      }
                    >
                      <StatusIcon className="h-4 w-4 mr-2" />
                      {suggestion.status === "completed"
                        ? "Completed"
                        : suggestion.status === "in-progress"
                          ? "In Progress"
                          : suggestion.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Insights</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600">₹1.15L</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Potential Revenue</div>
          </div>
          <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">8.5kg</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">CO₂ Savings</div>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">89%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Confidence</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
