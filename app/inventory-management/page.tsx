"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { WalmartSidebar } from "@/components/walmart-sidebar"
import { AIChatbot } from "@/components/ai-chatbot"
import { Package, AlertTriangle, TrendingUp, Search, Filter, Download, Plus } from "lucide-react"

interface InventoryItem {
  product_id: string
  product_name: string
  quantity: number
  store_id: string
  last_updated: string
}

interface EnrichedInventoryItem extends InventoryItem {
  percent: number
  status: "healthy" | "low" | "critical"
  reorderAlert: boolean
  daysToDeplete: number
}

export default function InventoryManagementPage() {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [inventoryData, setInventoryData] = useState<EnrichedInventoryItem[]>([])

  useEffect(() => {
    fetch("http://localhost:5000/api/inventory")
      .then(res => res.json())
      .then((data: InventoryItem[]) => {
        const enriched = data.map(item => {
          const maxStock = 500
          const percent = Math.min(100, (item.quantity / maxStock) * 100)
          const status: "healthy" | "low" | "critical" =
            percent > 80 ? "healthy" : percent > 50 ? "low" : "critical"
          const reorderAlert = item.quantity < 0.3 * maxStock
          const daysToDeplete = Math.round(item.quantity / (item.quantity / 30)) || 0

          return {
            ...item,
            percent,
            status,
            reorderAlert,
            daysToDeplete,
          }
        })
        setInventoryData(enriched)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "low":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredInventory = inventoryData.filter(
    item =>
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.store_id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <WalmartSidebar userType="admin" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading Inventory...</p>
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Inventory Management</h1>
            <p className="text-gray-500 text-sm">Live product tracking across all stores</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Export</Button>
            <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700"><Plus className="h-4 w-4 mr-2" />Add Item</Button>
          </div>
        </div>

        {/* Search */}
        <div className="flex mb-4 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products or stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" />Filters</Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800">
            <TabsTrigger value="overview">📊 Overview</TabsTrigger>
            <TabsTrigger value="products">📦 Products</TabsTrigger>
            <TabsTrigger value="locations">🏬 Locations</TabsTrigger>
            <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Stock Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Healthy</span>
                  <span>{inventoryData.filter(i => i.status === "healthy").length}</span>
                </div>
                <Progress value={inventoryData.filter(i => i.status === "healthy").length * 100 / inventoryData.length} />
                <div className="flex justify-between text-sm">
                  <span>Low</span>
                  <span>{inventoryData.filter(i => i.status === "low").length}</span>
                </div>
                <Progress value={inventoryData.filter(i => i.status === "low").length * 100 / inventoryData.length} />
                <div className="flex justify-between text-sm">
                  <span>Critical</span>
                  <span>{inventoryData.filter(i => i.status === "critical").length}</span>
                </div>
                <Progress value={inventoryData.filter(i => i.status === "critical").length * 100 / inventoryData.length} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* PRODUCTS */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>Live status of each product</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredInventory.length > 0 ? (
                  <div className="space-y-4">
                    {filteredInventory.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium">{item.product_name}</h3>
                            <Badge variant="outline" className="text-xs">{item.store_id}</Badge>
                            <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                            {item.reorderAlert && <Badge className="bg-red-200 text-red-800 text-xs">Reorder</Badge>}
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div><strong>Qty:</strong> {item.quantity}</div>
                            <div><strong>Depletion:</strong> {item.daysToDeplete} days</div>
                            <div><strong>Last Updated:</strong> {item.last_updated}</div>
                            <div><Progress value={item.percent} className="h-2" /></div>
                          </div>
                        </div>
                        <div className="ml-4 flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Restock</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No products match your search.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* LOCATIONS */}
          <TabsContent value="locations">
            <Card>
              <CardHeader>
                <CardTitle>Store Locations</CardTitle>
                <CardDescription>Grouped inventory by store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[...new Set(inventoryData.map(i => i.store_id))].map((store, idx) => {
                  const items = inventoryData.filter(i => i.store_id === store)
                  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0)
                  const avgHealth = Math.round(items.reduce((sum, i) => sum + i.percent, 0) / items.length)
                  return (
                    <div key={idx} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{store}</h3>
                        <Badge className="text-sm">Avg Health: {avgHealth}%</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Quantity: {totalQty}</p>
                      <Progress value={avgHealth} className="h-2 mt-1" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ANALYTICS */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center dark:bg-blue-900/20">
                  <div className="text-xl font-bold text-blue-700">18.4 days</div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Average Days to Deplete</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center dark:bg-green-900/20">
                  <div className="text-xl font-bold text-green-700">
                    {Math.round((inventoryData.filter(i => i.status === "healthy").length * 100) / inventoryData.length)}%
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Products Healthy</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <AIChatbot />
    </div>
  )
}
