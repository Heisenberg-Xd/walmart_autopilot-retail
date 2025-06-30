"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { WalmartSidebar } from "@/components/walmart-sidebar"
import { AIChatbot } from "@/components/ai-chatbot"
import { TrendingUp, TrendingDown, AlertTriangle, Brain, Target, Zap } from "lucide-react"

export default function DemandPredictionPage() {
  const [loading, setLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <WalmartSidebar userType="admin" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading AI Demand Predictions...</p>
          </div>
        </div>
      </div>
    )
  }

  const predictions = [
    {
      product: "Tata Salt 1kg",
      currentStock: 450,
      predictedDemand: 680,
      confidence: 94,
      trend: "up",
      zone: "Mumbai Central",
      action: "Restock Required",
    },
    {
      product: "Amul Fresh Milk 1L",
      currentStock: 320,
      predictedDemand: 280,
      confidence: 87,
      trend: "down",
      zone: "Delhi CP",
      action: "Optimal Stock",
    },
    {
      product: "Cotton Kurta Set",
      currentStock: 150,
      predictedDemand: 420,
      confidence: 92,
      trend: "up",
      zone: "Bengaluru Koramangala",
      action: "Urgent Restock",
    },
    {
      product: "Compact Umbrella",
      currentStock: 200,
      predictedDemand: 350,
      confidence: 76,
      trend: "up",
      zone: "Chennai T.Nagar",
      action: "Monitor Closely",
    },
  ]

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <WalmartSidebar userType="admin" />

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI Demand Prediction</h1>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-blue-600 text-white">
                    <Brain className="h-3 w-3 mr-1" />
                    AI Powered
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Live Predictions
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                {["24h", "7d", "30d"].map((timeframe) => (
                  <Button
                    key={timeframe}
                    variant={selectedTimeframe === timeframe ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(timeframe)}
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
                <Target className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-blue-100">Last 30 days average</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Predictions</CardTitle>
                <Brain className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-green-100">Across all stores</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                <AlertTriangle className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-orange-100">Require immediate action</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
                <Zap className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹2.4L</div>
                <p className="text-xs text-purple-100">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="predictions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-gray-800">
              <TabsTrigger value="predictions">🔮 Predictions</TabsTrigger>
              <TabsTrigger value="trends">📈 Trends</TabsTrigger>
              <TabsTrigger value="insights">💡 Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="predictions" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>High-Confidence Predictions</CardTitle>
                  <CardDescription>AI predictions with 85%+ confidence for next {selectedTimeframe}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {predictions.map((prediction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium">{prediction.product}</h3>
                          <Badge variant="outline" className="text-xs">
                            {prediction.zone}
                          </Badge>
                          {prediction.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div>
                            <span className="font-medium">Current Stock:</span> {prediction.currentStock}
                          </div>
                          <div>
                            <span className="font-medium">Predicted Demand:</span> {prediction.predictedDemand}
                          </div>
                          <div>
                            <span className="font-medium">Confidence:</span> {prediction.confidence}%
                          </div>
                        </div>
                        <div className="mt-2">
                          <Progress value={prediction.confidence} className="h-2" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <Badge
                          className={
                            prediction.action === "Urgent Restock"
                              ? "bg-red-100 text-red-800"
                              : prediction.action === "Restock Required"
                                ? "bg-yellow-100 text-yellow-800"
                                : prediction.action === "Monitor Closely"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-green-100 text-green-800"
                          }
                        >
                          {prediction.action}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Demand Trends Analysis</CardTitle>
                  <CardDescription>Historical and predicted demand patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Top Growing Categories</h4>
                      {[
                        { category: "Personal Care", growth: "+24%" },
                        { category: "Home & Kitchen", growth: "+18%" },
                        { category: "Fashion", growth: "+15%" },
                        { category: "Electronics", growth: "+12%" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <span>{item.category}</span>
                          <Badge className="bg-green-100 text-green-800">{item.growth}</Badge>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Seasonal Patterns</h4>
                      {[
                        { pattern: "Monsoon Essentials", status: "Peak Season" },
                        { pattern: "Festival Items", status: "Upcoming" },
                        { pattern: "Summer Clothing", status: "Declining" },
                        { pattern: "School Supplies", status: "Off Season" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <span>{item.pattern}</span>
                          <Badge variant="outline">{item.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>AI-Generated Insights</CardTitle>
                  <CardDescription>Smart recommendations based on demand analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      insight: "Umbrella demand is 3x higher in Mumbai due to unexpected rainfall predictions",
                      action: "Increase umbrella stock by 200% in Mumbai stores",
                      priority: "High",
                    },
                    {
                      insight: "Cotton clothing demand rising 25% faster than synthetic in Bengaluru",
                      action: "Shift inventory mix towards cotton products",
                      priority: "Medium",
                    },
                    {
                      insight: "Milk demand patterns show 15% increase on weekends in Delhi",
                      action: "Optimize weekend delivery schedules",
                      priority: "Low",
                    },
                  ].map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <Badge
                          className={
                            item.priority === "High"
                              ? "bg-red-100 text-red-800"
                              : item.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {item.priority} Priority
                        </Badge>
                      </div>
                      <p className="text-gray-900 dark:text-white mb-2">{item.insight}</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        💡 Recommended Action: {item.action}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AIChatbot />
    </div>
  )
}
