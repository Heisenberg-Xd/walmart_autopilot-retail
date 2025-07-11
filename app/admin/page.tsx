"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { WalmartSidebar } from "@/components/walmart-sidebar"
import { AIChatbot } from "@/components/ai-chatbot"
import { SmartInventoryWhisperer } from "@/components/smart-inventory-whisperer"
import { TrendingUp, Package, AlertTriangle, Leaf, Zap, MapPin } from "lucide-react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [ecoData, setEcoData] = useState<any>(null)
  const [inventoryData, setInventoryData] = useState<any[]>([])

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"]

  useEffect(() => {
    fetch("http://localhost:5000/api/admin-dashboard")
      .then(res => res.json())
      .then(data => {
        setEcoData(data.ecoData || null)
        setInventoryData(data.inventoryData || [])
        setLoading(false)
      })
      .catch(err => {
        console.error("Error loading data:", err)
        setLoading(false)
      })
  }, [])

  const getLowStock = () =>
    inventoryData
      .filter((item) => item.quantity && item.quantity < 100)
      .sort((a, b) => a.quantity - b.quantity)

  const pieData = Object.values(
    inventoryData.reduce((acc: any, item) => {
      const key = item.product_name
      if (!acc[key]) acc[key] = { name: key, value: 0 }
      acc[key].value += Number(item.quantity || 0)
      return acc
    }, {})
  )

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
      <div className="flex-1 overflow-auto p-6">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
            <div className="flex gap-3">
              <Badge className="bg-blue-600 text-white"><Zap className="h-3 w-3 mr-1" />Walmart SparkAI</Badge>
              <Badge variant="outline"><MapPin className="h-3 w-3 mr-1" />All India Network</Badge>
              <Badge variant="outline" className="text-green-600 border-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div> Live Data
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹45,60,000</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Today's Network Revenue</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">AI Predictions</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-blue-100">94.2% accuracy rate</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">Active Transfers</CardTitle>
              <Package className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-green-100">Micro-fulfillment active</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getLowStock().length}</div>
              <p className="text-xs text-orange-100">Low-stock products</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
            <CardHeader>
              <CardTitle>Carbon Saved</CardTitle>
              <CardDescription>Sustainability data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {ecoData?.total_distance_km?.toFixed ? ecoData.total_distance_km.toFixed(1) + " km" : "N/A"}
              </div>
              <p className="text-xs text-orange-100">All India</p>
            </CardContent>
          </Card>
        </div>

        {/* Smart Whisperer */}
        <div className="mb-8">
          <SmartInventoryWhisperer />
        </div>

        {/* Inventory Summary Pie Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Inventory Composition</CardTitle>
            <CardDescription>Proportion of each product category in stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Cards (Low Stock Priority) */}
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
            <CardDescription>Sorted by urgency of reorder</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getLowStock().slice(0, 6).map((item, idx) => (
                <Card key={idx} className="bg-gray-50 dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="flex justify-between mb-3">
                      <span className="font-medium">{item.product_name}</span>
                      <Badge className="bg-red-100 text-red-800">Low Stock</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Quantity</span>
                        <span>{item.quantity}</span>
                      </div>
                      <Progress value={(item.quantity / 1000) * 100} className="h-2" />
                      <p className="text-xs text-yellow-600">⚠ Predicted depletion soon</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chatbot */}
      <AIChatbot />
    </div>
  )
}