"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Clock, Leaf } from "lucide-react"

interface RouteOptimizerProps {
  pendingOrders: any[]
  currentLocation: { lat: number; lng: number }
  suggestions: any[]
}

export function RouteOptimizer({ pendingOrders, currentLocation, suggestions }: RouteOptimizerProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            AI Route Optimizer
          </CardTitle>
          <CardDescription>Smart suggestions to optimize your delivery routes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="border rounded-lg p-4 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">{suggestion.title}</h4>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Recommended</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{suggestion.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-blue-500" />
                    <span>{suggestion.savings}</span>
                  </div>
                  <div className="flex items-center">
                    <Leaf className="h-3 w-3 mr-1 text-green-500" />
                    <span>{suggestion.carbonReduction}</span>
                  </div>
                </div>
                <Button size="sm">Apply Optimization</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Pending Orders Map</CardTitle>
            <CardDescription>Orders waiting to be optimized into routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 h-64 relative">
              {pendingOrders.map((order, index) => (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${20 + index * 15}%`,
                    top: `${30 + index * 10}%`,
                  }}
                >
                  <div className="relative">
                    <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="absolute -top-6 -left-8 bg-orange-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {order.area}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Optimization Benefits</CardTitle>
            <CardDescription>Potential improvements with AI optimization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-lg font-bold text-green-600">40 mins</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Time Saved</p>
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-lg font-bold text-blue-600">6.4L</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Fuel Saved</p>
              </div>
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-lg font-bold text-purple-600">15.2 kg</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">CO₂ Reduced</p>
              </div>
              <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-lg font-bold text-orange-600">₹450</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Cost Saved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
