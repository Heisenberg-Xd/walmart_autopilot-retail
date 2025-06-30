"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Leaf, Truck, MapPin, Star } from "lucide-react"

interface DeliverySlot {
  id: string
  date: string
  timeRange: string
  type: "standard" | "eco" | "express"
  carbonScore: number
  price: number
  available: boolean
  greenPoints: number
  estimatedTime: string
}

interface DeliverySlotsProps {
  slots: DeliverySlot[]
}

export function DeliverySlots({ slots }: DeliverySlotsProps) {
  const getSlotIcon = (type: string) => {
    switch (type) {
      case "eco":
        return <Leaf className="h-4 w-4" />
      case "express":
        return <Truck className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getSlotColor = (type: string) => {
    switch (type) {
      case "eco":
        return "bg-green-100 text-green-800 border-green-200"
      case "express":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSlotLabel = (type: string) => {
    switch (type) {
      case "eco":
        return "Eco-Friendly"
      case "express":
        return "Express"
      default:
        return "Standard"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Smart Delivery Options</h2>
        <p className="text-gray-600">Choose eco-friendly delivery slots and earn Green Points</p>
      </div>

      {/* Eco Recommendation */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <Star className="h-5 w-5 mr-2" />
            Recommended Eco Slot
          </CardTitle>
          <CardDescription className="text-green-700">
            Save 40% carbon emissions and earn bonus Green Points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Tomorrow, 2:00 PM - 4:00 PM</p>
              <p className="text-sm text-green-700">Consolidated delivery route</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-800">FREE</p>
              <p className="text-sm text-green-600">+50 Green Points</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slots.map((slot) => (
          <Card key={slot.id} className={`hover:shadow-md transition-shadow ${!slot.available ? "opacity-60" : ""}`}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getSlotIcon(slot.type)}
                    <span className="font-medium">{slot.date}</span>
                  </div>
                  <Badge className={getSlotColor(slot.type)}>{getSlotLabel(slot.type)}</Badge>
                </div>

                <div>
                  <p className="text-lg font-semibold">{slot.timeRange}</p>
                  <p className="text-sm text-gray-600">Est. delivery: {slot.estimatedTime}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Leaf className="h-3 w-3 text-green-500 mr-1" />
                      <span>{slot.carbonScore}g CO₂</span>
                    </div>
                    {slot.greenPoints > 0 && (
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span>+{slot.greenPoints} pts</span>
                      </div>
                    )}
                  </div>
                  <div className="font-semibold">{slot.price === 0 ? "FREE" : `$${slot.price}`}</div>
                </div>

                <Button
                  className="w-full"
                  disabled={!slot.available}
                  variant={slot.type === "eco" ? "default" : "outline"}
                >
                  {slot.available ? "Select Slot" : "Unavailable"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pickup Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Pickup Locations
          </CardTitle>
          <CardDescription>Collect your order from nearby pickup points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Downtown Hub</p>
                <p className="text-sm text-gray-600">0.3 miles away • Open 24/7</p>
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-800 mb-1">+25 Green Points</Badge>
                <p className="text-sm font-medium">FREE</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Smart Locker - Mall</p>
                <p className="text-sm text-gray-600">0.8 miles away • 6 AM - 10 PM</p>
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-800 mb-1">+15 Green Points</Badge>
                <p className="text-sm font-medium">FREE</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
