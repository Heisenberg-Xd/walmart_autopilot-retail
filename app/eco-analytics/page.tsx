"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { WalmartSidebar } from "@/components/walmart-sidebar"
import { AIChatbot } from "@/components/ai-chatbot"
import { Leaf, Recycle, Truck, Zap, Award, TrendingDown, TreePine } from "lucide-react"

export default function EcoAnalyticsPage() {
  const [loading, setLoading] = useState(true)

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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading Eco Analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  const sustainabilityMetrics = [
    {
      category: "Carbon Footprint",
      current: 2.4,
      target: 3.0,
      unit: "tons CO₂ saved",
      trend: "down",
      improvement: "20%",
    },
    {
      category: "Waste Reduction",
      current: 85,
      target: 90,
      unit: "% waste diverted",
      trend: "up",
      improvement: "15%",
    },
    {
      category: "Energy Efficiency",
      current: 78,
      target: 85,
      unit: "% renewable energy",
      trend: "up",
      improvement: "12%",
    },
    {
      category: "Sustainable Packaging",
      current: 92,
      target: 95,
      unit: "% eco-friendly",
      trend: "up",
      improvement: "8%",
    },
  ]

  const ecoInitiatives = [
    {
      title: "Electric Delivery Fleet",
      description: "Transitioning 40% of delivery vehicles to electric",
      impact: "1.2 tons CO₂ saved monthly",
      status: "In Progress",
      completion: 65,
    },
    {
      title: "Solar Panel Installation",
      description: "Installing solar panels across 15 store locations",
      impact: "30% reduction in grid electricity",
      status: "Planning",
      completion: 25,
    },
    {
      title: "Biodegradable Packaging",
      description: "Switching to 100% biodegradable packaging materials",
      impact: "Zero plastic waste by 2025",
      status: "Active",
      completion: 80,
    },
    {
      title: "Food Waste Reduction",
      description: "AI-powered inventory to minimize food wastage",
      impact: "45% reduction in food waste",
      status: "Active",
      completion: 90,
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Eco Analytics</h1>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-green-600 text-white">
                    <Leaf className="h-3 w-3 mr-1" />
                    Sustainability Tracking
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <Award className="h-3 w-3 mr-1" />
                    Carbon Neutral Goal 2025
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">2.4t</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">CO₂ Saved This Month</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carbon Saved</CardTitle>
                <TrendingDown className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4t</div>
                <p className="text-xs text-green-100">This month</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Eco Deliveries</CardTitle>
                <Truck className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-blue-100">Electric & hybrid vehicles</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Waste Diverted</CardTitle>
                <Recycle className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-purple-100">From landfills</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-yellow-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Green Energy</CardTitle>
                <Zap className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-orange-100">Renewable sources</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800">
              <TabsTrigger value="overview">🌍 Overview</TabsTrigger>
              <TabsTrigger value="initiatives">🌱 Initiatives</TabsTrigger>
              <TabsTrigger value="impact">📊 Impact</TabsTrigger>
              <TabsTrigger value="goals">🎯 Goals</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Sustainability Scorecard</CardTitle>
                    <CardDescription>Current performance across key environmental metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {sustainabilityMetrics.map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{metric.category}</span>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800">
                              {metric.trend === "up" ? "↗" : "↘"} {metric.improvement}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>
                            {metric.current} {metric.unit}
                          </span>
                          <span>Target: {metric.target}</span>
                        </div>
                        <Progress value={(metric.current / metric.target) * 100} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Environmental Impact</CardTitle>
                    <CardDescription>Real-time environmental benefits</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <TreePine className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">127</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Trees Equivalent Saved</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600">1,240</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Miles Electric Delivery</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <Recycle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-purple-600">450kg</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Waste Recycled</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <Zap className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-yellow-600">2,340</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">kWh Solar Generated</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="initiatives" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Active Sustainability Initiatives</CardTitle>
                  <CardDescription>Current projects driving environmental impact</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ecoInitiatives.map((initiative, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-lg">{initiative.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">{initiative.description}</p>
                        </div>
                        <Badge
                          className={
                            initiative.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : initiative.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {initiative.status}
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{initiative.completion}%</span>
                        </div>
                        <Progress value={initiative.completion} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-green-600 dark:text-green-400">
                          <span className="font-medium">Impact:</span> {initiative.impact}
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="impact" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Monthly Environmental Impact</CardTitle>
                    <CardDescription>Cumulative benefits this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-3xl font-bold text-green-600">2.4 tons</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">CO₂ Emissions Reduced</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Electric Deliveries</span>
                          <span>1.2 tons CO₂</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Solar Energy</span>
                          <span>0.8 tons CO₂</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Waste Reduction</span>
                          <span>0.4 tons CO₂</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Cost Savings from Green Initiatives</CardTitle>
                    <CardDescription>Financial benefits of sustainability</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600">₹1.8L</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Savings This Month</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Energy Efficiency</span>
                          <span>₹85,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Waste Reduction</span>
                          <span>₹45,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Fuel Savings</span>
                          <span>₹50,000</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="goals" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>2025 Sustainability Goals</CardTitle>
                  <CardDescription>Our commitment to environmental responsibility</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        goal: "Carbon Neutral Operations",
                        target: "100% carbon neutral by 2025",
                        current: "65% progress",
                        progress: 65,
                      },
                      {
                        goal: "Zero Waste to Landfill",
                        target: "100% waste diverted",
                        current: "85% achieved",
                        progress: 85,
                      },
                      {
                        goal: "Renewable Energy",
                        target: "100% renewable electricity",
                        current: "78% renewable",
                        progress: 78,
                      },
                      {
                        goal: "Sustainable Packaging",
                        target: "100% eco-friendly packaging",
                        current: "92% converted",
                        progress: 92,
                      },
                    ].map((goal, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">{goal.goal}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{goal.target}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Current Progress</span>
                            <span>{goal.current}</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
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
