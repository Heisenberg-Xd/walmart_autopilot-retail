"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Package } from "lucide-react"

interface InventoryMapProps {
  data: Array<{
    location: string
    zone: string
    stockLevel: number
    capacity: number
    status: "healthy" | "low" | "critical"
    topProducts: Array<{ name: string; stock: number }>
  }>
}

export function InventoryMap({ data }: InventoryMapProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500"
      case "low":
        return "bg-yellow-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-100 text-green-800">Healthy</Badge>
      case "low":
        return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {/* Map Visualization (Simplified) */}
      <div className="bg-gray-100 rounded-lg p-6 h-64 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-50"></div>
        <div className="relative z-10">
          <h3 className="text-lg font-semibold mb-4">Store Locations</h3>
          <div className="grid grid-cols-3 gap-4 h-full">
            {data.slice(0, 6).map((location, index) => (
              <div
                key={index}
                className="relative"
                style={{
                  left: `${Math.random() * 60}%`,
                  top: `${Math.random() * 60}%`,
                }}
              >
                <div
                  className={`w-4 h-4 rounded-full ${getStatusColor(location.status)} border-2 border-white shadow-lg`}
                ></div>
                <div className="absolute -top-8 -left-8 bg-white rounded-lg shadow-lg p-2 text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                  <div className="font-medium">{location.location}</div>
                  <div className="text-gray-600">
                    {Math.round((location.stockLevel / location.capacity) * 100)}% capacity
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((location, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="font-medium">{location.location}</span>
                </div>
                {getStatusBadge(location.status)}
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span>Stock Level</span>
                  <span>
                    {location.stockLevel.toLocaleString()} / {location.capacity.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getStatusColor(location.status)}`}
                    style={{ width: `${(location.stockLevel / location.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Package className="h-3 w-3 mr-1" />
                  Top Products
                </h4>
                <div className="space-y-1">
                  {location.topProducts.slice(0, 3).map((product, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-gray-600">{product.name}</span>
                      <span>{product.stock}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
