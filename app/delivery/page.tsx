"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { WalmartSidebar } from "@/components/walmart-sidebar"
import { AIChatbot } from "@/components/ai-chatbot"
import { MapPin, Clock, Package, Truck, Star, Leaf } from "lucide-react"

interface DeliveryAnalytics {
  total_deliveries: number
  total_distance_km: number
  carbon_saved_g: number
}

interface Delivery {
  order_id: string
  customer_name: string
  address: string
  status: string
  eta: string
}

export default function DeliveryDashboard() {
  const [loading, setLoading] = useState(true)
  const [ecoStats, setEcoStats] = useState<DeliveryAnalytics | null>(null)
  const [deliveries, setDeliveries] = useState<Delivery[]>([])

  useEffect(() => {
    fetch("http://localhost:5000/api/eco")
      .then((res) => res.json())
      .then((data) => setEcoStats(data))

    fetch("http://localhost:5000/api/delivery")
      .then((res) => res.json())
      .then((data) => setDeliveries(data))

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <WalmartSidebar userType="delivery" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading delivery dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <WalmartSidebar userType="delivery" />

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Delivery Dashboard</h1>
                <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 mr-1" />
                    Vehicle: Hero Electric Optima
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Zone: South Delhi
                  </div>
                  <Badge variant="default" className="bg-green-600">
                    🟢 On Duty
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {ecoStats?.total_deliveries ?? "–"}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Deliveries Today</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{deliveries.length}</div>
                <p className="text-xs text-muted-foreground">In your queue</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Delivery Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">Minutes per delivery</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">4.8</div>
                <p className="text-xs text-muted-foreground">⭐ Average rating</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Eco Score</CardTitle>
                <Leaf className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {(ecoStats?.carbon_saved_g ?? 0 / 1000).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">Carbon efficiency</p>
              </CardContent>
            </Card>
          </div>

          {/* Current Route */}
          <Card className="mb-8 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Current Route: RT-DEL-001</CardTitle>
              <CardDescription>{deliveries.length} deliveries • Lajpat Nagar to Greater Kailash</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Route Progress</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-lg font-bold text-blue-600">4</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Completed</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-lg font-bold text-orange-600">3</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Remaining</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span>ETA: 45 mins</span>
                  <span>Distance: {ecoStats?.total_distance_km ?? "–"} km</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Deliveries */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Next Deliveries</CardTitle>
              <CardDescription>Upcoming stops on your route</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {deliveries.map((delivery, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                        delivery.status === "current" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">Order #{delivery.order_id}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{delivery.address}</p>
                      <p className="text-xs text-gray-500">{delivery.customer_name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={delivery.status === "current" ? "default" : "outline"}>
                      {delivery.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{delivery.eta}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <AIChatbot />
    </div>
  )
}
