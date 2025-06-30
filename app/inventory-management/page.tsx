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

export default function InventoryManagementPage() {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

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
            <p className="text-gray-600 dark:text-gray-300">Loading Inventory Management...</p>
          </div>
        </div>
      </div>
    )
  }

  const inventoryData = [
    {
      id: "INV001",
      product: "Tata Salt 1kg",
      category: "Grocery",
      currentStock: 450,
      minStock: 200,
      maxStock: 1000,
      location: "Mumbai Bandra",
      status: "healthy",
      lastUpdated: "2 mins ago",
    },
    {
      id: "INV002",
      product: "Amul Fresh Milk 1L",
      category: "Dairy",
      currentStock: 85,
      minStock: 100,
      maxStock: 500,
      location: "Delhi CP",
      status: "low",
      lastUpdated: "5 mins ago",
    },
    {
      id: "INV003",
      product: "Cotton Kurta Set",
      category: "Fashion",
      currentStock: 25,
      minStock: 50,
      maxStock: 200,
      location: "Bengaluru Koramangala",
      status: "critical",
      lastUpdated: "1 min ago",
    },
    {
      id: "INV004",
      product: "Samsung Galaxy Earbuds",
      category: "Electronics",
      currentStock: 150,
      minStock: 50,
      maxStock: 300,
      location: "Chennai T.Nagar",
      status: "healthy",
      lastUpdated: "3 mins ago",
    },
  ]

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
    (item) =>
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <WalmartSidebar userType="admin" />

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Inventory Management</h1>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-blue-600 text-white">
                    <Package className="h-3 w-3 mr-1" />
                    Real-time Tracking
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Auto-sync Enabled
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                <Package className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,847</div>
                <p className="text-xs text-blue-100">Across all locations</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Stock</CardTitle>
                <TrendingUp className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">11,234</div>
                <p className="text-xs text-green-100">87.4% availability</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                <AlertTriangle className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-orange-100">Need immediate attention</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Value</CardTitle>
                <Package className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹45.6L</div>
                <p className="text-xs text-purple-100">Total inventory value</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products, categories, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800">
              <TabsTrigger value="overview">📊 Overview</TabsTrigger>
              <TabsTrigger value="products">📦 Products</TabsTrigger>
              <TabsTrigger value="locations">🏪 Locations</TabsTrigger>
              <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Stock Status Distribution</CardTitle>
                    <CardDescription>Current inventory health across all items</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Healthy Stock (80-100%)</span>
                        <span>8,456 items</span>
                      </div>
                      <Progress value={65.8} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Moderate Stock (50-80%)</span>
                        <span>2,778 items</span>
                      </div>
                      <Progress value={21.6} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Low Stock (20-50%)</span>
                        <span>1,457 items</span>
                      </div>
                      <Progress value={11.3} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Critical Stock (0-20%)</span>
                        <span>156 items</span>
                      </div>
                      <Progress value={1.2} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Recent Stock Movements</CardTitle>
                    <CardDescription>Latest inventory updates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { action: "Restocked", product: "Tata Salt 1kg", quantity: "+500", time: "2 mins ago" },
                      { action: "Sold", product: "Samsung Earbuds", quantity: "-25", time: "5 mins ago" },
                      { action: "Transfer", product: "Cotton Kurta", quantity: "+100", time: "10 mins ago" },
                      { action: "Adjustment", product: "Amul Milk", quantity: "-15", time: "15 mins ago" },
                    ].map((movement, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{movement.product}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{movement.action}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className={movement.quantity.startsWith("+") ? "text-green-600" : "text-red-600"}
                          >
                            {movement.quantity}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{movement.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Product Inventory</CardTitle>
                  <CardDescription>Detailed view of all products and their stock levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredInventory.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium">{item.product}</h3>
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {item.location}
                            </Badge>
                            <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div>
                              <span className="font-medium">Current:</span> {item.currentStock}
                            </div>
                            <div>
                              <span className="font-medium">Min:</span> {item.minStock}
                            </div>
                            <div>
                              <span className="font-medium">Max:</span> {item.maxStock}
                            </div>
                            <div>
                              <span className="font-medium">Updated:</span> {item.lastUpdated}
                            </div>
                          </div>
                          <div className="mt-2">
                            <Progress value={(item.currentStock / item.maxStock) * 100} className="h-2" />
                          </div>
                        </div>
                        <div className="ml-4 flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Restock
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="locations" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Location-wise Inventory</CardTitle>
                  <CardDescription>Stock levels across different store locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { location: "Mumbai Bandra", items: 3245, value: "₹12.4L", status: "healthy" },
                      { location: "Delhi CP", items: 2876, value: "₹9.8L", status: "low" },
                      { location: "Bengaluru Koramangala", items: 2134, value: "₹8.2L", status: "critical" },
                      { location: "Chennai T.Nagar", items: 2987, value: "₹11.1L", status: "healthy" },
                      { location: "Pune Kothrud", items: 1605, value: "₹4.1L", status: "low" },
                    ].map((store, index) => (
                      <Card key={index} className="bg-gray-50 dark:bg-gray-800">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium">{store.location}</span>
                            <Badge className={getStatusColor(store.status)}>{store.status}</Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Total Items</span>
                              <span>{store.items.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Inventory Value</span>
                              <span className="font-medium">{store.value}</span>
                            </div>
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
                    <CardTitle>Inventory Turnover</CardTitle>
                    <CardDescription>Product movement analytics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">6.2x</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Average Turnover Rate</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">18 days</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Average Days in Stock</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Top Performing Categories</CardTitle>
                    <CardDescription>By inventory turnover rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { category: "Dairy & Fresh", turnover: "12.4x", trend: "+15%" },
                        { category: "Personal Care", turnover: "8.7x", trend: "+8%" },
                        { category: "Snacks & Beverages", turnover: "7.2x", trend: "+12%" },
                        { category: "Home Essentials", turnover: "5.9x", trend: "+5%" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{item.category}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Turnover: {item.turnover}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">{item.trend}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AIChatbot />
    </div>
  )
}
