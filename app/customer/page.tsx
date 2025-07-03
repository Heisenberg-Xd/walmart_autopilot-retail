"use client"

import { useState, useEffect } from "react"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WalmartSidebar } from "@/components/walmart-sidebar"
import { AIChatbot } from "@/components/ai-chatbot"
import { Leaf, Star, ShoppingCart } from "lucide-react"

interface Product {
  name: string
  price: number
  originalPrice?: number
  rating: number
  ecoScore: number
  trending: boolean
  inStock: boolean
}

interface Reward {
  name: string
  description: string
  cost: number
  available: boolean
}

export default function CustomerExperience() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [rewards, setRewards] = useState<Reward[]>([])

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))

    fetch("http://localhost:5000/api/rewards")
      .then(res => res.json())
      .then(data => setRewards(data))

    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <WalmartSidebar userType="customer" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading your personalized experience...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <WalmartSidebar userType="customer" />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, Sneha!</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Discover personalized recommendations and eco-friendly options
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center mb-2">
                  <Leaf className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-lg font-semibold text-green-600">1,250 Green Points</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Eco Champion
                </Badge>
              </div>
            </div>
          </div>

          {/* Recommended Products */}
          <Card className="mb-8 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>AI-curated products based on your preferences and local trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow bg-gray-50 dark:bg-gray-700">
                    <CardContent className="p-4">
                      <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-gray-400 text-sm">Product Image</div>
                      </div>
                      {product.trending && <Badge className="bg-orange-500 hover:bg-orange-600 mb-2">Trending</Badge>}
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm ml-1">{product.rating}</span>
                          </div>
                          <div className="flex items-center">
                            <Leaf className="h-4 w-4 text-green-500" />
                            <span className="text-sm ml-1">{product.ecoScore}/10</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-xl font-bold">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                          )}
                        </div>
                      </div>
                      <Button className="w-full" disabled={!product.inStock}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Green Rewards */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Green Rewards</CardTitle>
              <CardDescription>Redeem your Green Points for exclusive rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewards.map((reward, index) => (
                  <div key={index} className="border rounded-lg p-4 dark:border-gray-700">
                    <h4 className="font-medium mb-2">{reward.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{reward.cost} points</span>
                      </div>
                      <Button size="sm" disabled={1250 < reward.cost}>
                        {1250 >= reward.cost ? "Redeem" : "Not enough points"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <AIChatbot />
    </div>
  )
}
