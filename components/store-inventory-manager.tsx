"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { AlertTriangle, Package, Search, Plus } from "lucide-react"
import { useState } from "react"

interface InventoryItem {
  id: string
  name: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  price: number
  lastRestocked: string
  supplier: string
  status: "healthy" | "low" | "critical" | "overstock"
}

interface StoreInventoryManagerProps {
  inventory: InventoryItem[]
  alerts: Array<{
    id: string
    type: string
    message: string
    priority: "high" | "medium" | "low"
    product: string
  }>
}

export function StoreInventoryManager({ inventory, alerts }: StoreInventoryManagerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", ...Array.from(new Set(inventory.map((item) => item.category)))]

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "low":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "overstock":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStockPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100)
  }

  return (
    <div className="space-y-6">
      {/* Alerts Section */}
      {alerts.length > 0 && (
        <Card className="bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800 dark:text-orange-300">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Stock Alerts ({alerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.slice(0, 3).map((alert, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
              >
                <div>
                  <p className="font-medium text-orange-800 dark:text-orange-300">{alert.message}</p>
                  <p className="text-sm text-orange-600 dark:text-orange-400">Product: {alert.product}</p>
                </div>
                <Badge variant={alert.priority === "high" ? "destructive" : "secondary"}>{alert.priority}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Inventory Management
          </CardTitle>
          <CardDescription>Manage your store's product inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
            <Button className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          {/* Inventory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInventory.map((item) => (
              <Card key={item.id} className="bg-gray-50 dark:bg-gray-700">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Stock Level</span>
                        <span>
                          {item.currentStock} / {item.maxStock}
                        </span>
                      </div>
                      <Progress value={getStockPercentage(item.currentStock, item.maxStock)} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <div>
                        <p>Price: ₹{item.price}</p>
                        <p>Min: {item.minStock}</p>
                      </div>
                      <div>
                        <p>Category: {item.category}</p>
                        <p>Supplier: {item.supplier}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Restock
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
