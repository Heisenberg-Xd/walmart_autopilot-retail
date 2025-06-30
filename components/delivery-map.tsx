"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "lucide-react"

interface DeliveryMapProps {
  routes: any[]
  currentLocation: { lat: number; lng: number }
}

export function DeliveryMap({ routes, currentLocation }: DeliveryMapProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Navigation className="h-5 w-5 mr-2" />
            Live Route Map
          </CardTitle>
          <CardDescription>Real-time tracking of your delivery routes</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Simplified Map Visualization */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6 h-96 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-green-100/50 dark:from-gray-600/50 dark:to-gray-500/50"></div>

            {/* Current Location */}
            <div
              className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: "30%", top: "40%" }}
            >
              <div className="relative">
                <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                <div className="absolute -top-8 -left-8 bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  📍 You are here
                </div>
              </div>
            </div>

            {/* Route Points */}
            {[
              { name: "Lajpat Nagar", pos: { left: "25%", top: "35%" }, status: "completed" },
              { name: "Greater Kailash I", pos: { left: "35%", top: "45%" }, status: "current" },
              { name: "Greater Kailash II", pos: { left: "45%", top: "50%" }, status: "pending" },
              { name: "Nehru Place", pos: { left: "55%", top: "55%" }, status: "pending" },
            ].map((point, index) => (
              <div key={index} className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2" style={point.pos}>
                <div className="relative">
                  <div
                    className={`w-3 h-3 rounded-full border-2 border-white shadow-lg ${
                      point.status === "completed"
                        ? "bg-green-500"
                        : point.status === "current"
                          ? "bg-orange-500"
                          : "bg-gray-400"
                    }`}
                  ></div>
                  <div className="absolute -top-6 -left-6 text-xs font-medium whitespace-nowrap">{point.name}</div>
                </div>
              </div>
            ))}

            {/* Route Lines */}
            <svg className="absolute inset-0 w-full h-full z-5">
              <path
                d="M 30% 40% Q 32% 37% 35% 45% Q 40% 47% 45% 50% Q 50% 52% 55% 55%"
                stroke="#3b82f6"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
              <div className="space-y-2 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                  <span>Current Location</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Completed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  <span>Current Stop</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                  <span>Pending</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Route Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Route Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-lg font-bold text-blue-600">12.5 km</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Total Distance</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-lg font-bold text-green-600">45 mins</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">ETA</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-lg font-bold text-orange-600">7</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Total Stops</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-lg font-bold text-purple-600">₹4,250</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Order Value</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Eco Impact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Carbon Saved Today</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">15.2 kg CO₂</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Electric Vehicle Usage</span>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">100%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Route Efficiency</span>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">92%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
