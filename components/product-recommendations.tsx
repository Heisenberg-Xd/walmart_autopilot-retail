"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Leaf, TrendingUp, ShoppingCart } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  ecoScore: number
  trending: boolean
  reason: string
  image: string
  inStock: boolean
  fastDelivery: boolean
}

interface ProductRecommendationsProps {
  products: Product[]
}

export function ProductRecommendations({ products }: ProductRecommendationsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Recommended for You</h2>
        <p className="text-gray-600">AI-curated products based on your preferences and local trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative">
              <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-gray-400 text-sm">Product Image</div>
              </div>

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.trending && (
                  <Badge className="bg-orange-500 hover:bg-orange-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
                {product.ecoScore >= 8 && (
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <Leaf className="h-3 w-3 mr-1" />
                    Eco-Friendly
                  </Badge>
                )}
              </div>

              {/* Stock Status */}
              <div className="absolute top-2 right-2">
                {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
                {product.fastDelivery && product.inStock && (
                  <Badge className="bg-blue-500 hover:bg-blue-600">Fast Delivery</Badge>
                )}
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{product.reason}</p>
                </div>

                <div className="flex items-center justify-between">
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

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full"
                  disabled={!product.inStock}
                  variant={product.inStock ? "default" : "secondary"}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Notify When Available"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
