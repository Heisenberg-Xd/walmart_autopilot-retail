"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { WalmartSidebar } from "@/components/walmart-sidebar"
import { AIChatbot } from "@/components/ai-chatbot"
import { Package, AlertTriangle, Users, MapPin, Clock, Star } from "lucide-react"

export default function StoreDashboard() {
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
        <WalmartSidebar userType="store" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading store dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <WalmartSidebar userType="store" />

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Store Dashboard - Bandra West</h1>
                <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Mumbai, Maharashtra
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    6:00 AM - 11:00 PM
                  </div>
                  <Badge variant="default" className="bg-green-600">
                    🟢 Open
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">₹45,600</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Today's Revenue</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+15% from yesterday</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">In store right now</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stock Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">3</div>
                <p className="text-xs text-muted-foreground">Require immediate attention</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Eco Score</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">8.5/10</div>
                <p className="text-xs text-muted-foreground">Sustainability rating</p>
              </CardContent>
            </Card>
          </div>

          {/* Inventory Status */}
          <Card className="mb-8 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>Current stock levels and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: "Tata Salt 1kg",
                    current: 15,
                    max: 200,
                    status: "critical",
                  },
                  {
                    name: "Amul Fresh Milk 1L",
                    current: 45,
                    max: 100,
                    status: "healthy",
                  },
                  {
                    name: "Maggi Noodles 2-min",
                    current: 25,
                    max: 150,
                    status: "low",
                  },
                  {
                    name: "Cotton Kurta Set",
                    current: 8,
                    max: 25,
                    status: "healthy",
                  },
                  {
                    name: "Compact Umbrella",
                    current: 12,
                    max: 30,
                    status: "healthy",
                  },
                  {
                    name: "Parle-G Biscuits",
                    current: 85,
                    max: 80,
                    status: "overstock",
                  },
                ].map((item, index) => (
                  <Card key={index} className="bg-gray-50 dark:bg-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <Badge
                          className={
                            item.status === "healthy"
                              ? "bg-green-100 text-green-800"
                              : item.status === "low"
                                ? "bg-yellow-100 text-yellow-800"
                                : item.status === "critical"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Stock</span>
                          <span>
                            {item.current} / {item.max}
                          </span>
                        </div>
                        <Progress value={(item.current / item.max) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders from your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "ORD001",
                  customer: "Rahul Mehta",
                  amount: 450,
                  status: "completed",
                  time: "10 mins ago",
                },
                {
                  id: "ORD002",
                  customer: "Kavya Iyer",
                  amount: 1200,
                  status: "preparing",
                  time: "15 mins ago",
                },
                {
                  id: "ORD003",
                  customer: "Arjun Nair",
                  amount: 680,
                  status: "ready",
                  time: "25 mins ago",
                },
              ].map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{order.amount}</p>
                    <Badge
                      variant={
                        order.status === "completed"
                          ? "default"
                          : order.status === "preparing"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
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
