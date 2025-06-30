"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { WalmartSidebar } from "@/components/walmart-sidebar"
import { AIChatbot } from "@/components/ai-chatbot"
import { SmartInventoryWhisperer } from "@/components/smart-inventory-whisperer"
import { TrendingUp, Package, AlertTriangle, Leaf, Zap, MapPin } from "lucide-react"

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
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
            <p className="text-gray-600 dark:text-gray-300">Loading Walmart SparkAI Dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <WalmartSidebar userType="admin" />

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-blue-600 text-white">
                    <Zap className="h-3 w-3 mr-1" />
                    Walmart SparkAI
                  </Badge>
                  <Badge variant="outline">
                    <MapPin className="h-3 w-3 mr-1" />
                    All India Network
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Live Data
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹45,60,000</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Today's Network Revenue</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Predictions</CardTitle>
                <TrendingUp className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-blue-100">94.2% accuracy rate</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Transfers</CardTitle>
                <Package className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-green-100">Micro-fulfillment active</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-orange-100">Require immediate action</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carbon Saved</CardTitle>
                <Leaf className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4t</div>
                <p className="text-xs text-emerald-100">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Smart Inventory Whisperer */}
          <div className="mb-8">
            <SmartInventoryWhisperer />
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800">
              <TabsTrigger value="overview">📊 Overview</TabsTrigger>
              <TabsTrigger value="predictions">🤖 AI Predictions</TabsTrigger>
              <TabsTrigger value="inventory">📦 Inventory</TabsTrigger>
              <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Network Performance</CardTitle>
                    <CardDescription>Real-time metrics across India</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Order Fulfillment Rate</span>
                        <span>96.8%</span>
                      </div>
                      <Progress value={96.8} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Inventory Accuracy</span>
                        <span>94.2%</span>
                      </div>
                      <Progress value={94.2} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Delivery Performance</span>
                        <span>91.5%</span>
                      </div>
                      <Progress value={91.5} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Customer Satisfaction</span>
                        <span>4.7/5.0</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Top Performing Stores</CardTitle>
                    <CardDescription>Highest revenue stores today</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "Mumbai Bandra", revenue: "₹2,45,000", growth: "+15%" },
                      { name: "Delhi CP", revenue: "₹2,12,000", growth: "+12%" },
                      { name: "Bengaluru Koramangala", revenue: "₹1,98,000", growth: "+18%" },
                      { name: "Chennai T.Nagar", revenue: "₹1,87,000", growth: "+8%" },
                    ].map((store, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{store.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Revenue: {store.revenue}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          {store.growth}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="predictions" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>AI Demand Predictions</CardTitle>
                  <CardDescription>High-confidence predictions for next 24 hours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      product: "Tata Salt 1kg",
                      zone: "Mumbai Central",
                      demand: 450,
                      confidence: 92,
                    },
                    {
                      product: "Cotton Kurta Set",
                      zone: "Bengaluru Koramangala",
                      demand: 320,
                      confidence: 87,
                    },
                    {
                      product: "Amul Fresh Milk",
                      zone: "Delhi Connaught Place",
                      demand: 280,
                      confidence: 94,
                    },
                    {
                      product: "Compact Umbrella",
                      zone: "Chennai T.Nagar",
                      demand: 150,
                      confidence: 76,
                    },
                  ].map((prediction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{prediction.product}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{prediction.zone}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={prediction.confidence > 90 ? "default" : "secondary"}>
                          {prediction.confidence}% confidence
                        </Badge>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{prediction.demand} units</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Inventory Status</CardTitle>
                  <CardDescription>Real-time stock levels across all locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        location: "Mumbai Bandra Store",
                        stockLevel: 8500,
                        capacity: 10000,
                        status: "healthy",
                      },
                      {
                        location: "Delhi CP Store",
                        stockLevel: 3200,
                        capacity: 8000,
                        status: "low",
                      },
                      {
                        location: "Bengaluru Koramangala",
                        stockLevel: 1500,
                        capacity: 5000,
                        status: "critical",
                      },
                    ].map((store, index) => (
                      <Card key={index} className="bg-gray-50 dark:bg-gray-800">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium">{store.location}</span>
                            <Badge
                              className={
                                store.status === "healthy"
                                  ? "bg-green-100 text-green-800"
                                  : store.status === "low"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {store.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Stock Level</span>
                              <span>
                                {store.stockLevel.toLocaleString()} / {store.capacity.toLocaleString()}
                              </span>
                            </div>
                            <Progress value={(store.stockLevel / store.capacity) * 100} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Revenue Analytics</CardTitle>
                    <CardDescription>Daily revenue trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">₹45.6L</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Today's Revenue</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">+15.2%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Growth vs Yesterday</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Sustainability Metrics</CardTitle>
                    <CardDescription>Environmental impact tracking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-emerald-600">2.4t</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">CO₂ Saved This Month</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">68%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Eco-Friendly Deliveries</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}
