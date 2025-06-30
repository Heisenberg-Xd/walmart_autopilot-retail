"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Users, Leaf } from "lucide-react"

interface StorePerformanceProps {
  data: {
    salesGrowth: number
    customerSatisfaction: number
    inventoryTurnover: number
    ecoScore: number
  }
}

export function StorePerformance({ data }: StorePerformanceProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Sales Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">+{data.salesGrowth}%</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">vs last month</p>
            <Progress value={data.salesGrowth * 5} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Star className="h-4 w-4 mr-2" />
              Customer Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
              {data.customerSatisfaction}/5.0
            </div>
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">⭐ Average rating</p>
            <Progress value={data.customerSatisfaction * 20} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Inventory Turnover
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{data.inventoryTurnover}x</div>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">times per month</p>
            <Progress value={data.inventoryTurnover * 10} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Leaf className="h-4 w-4 mr-2" />
              Eco Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">{data.ecoScore}/10</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">Sustainability rating</p>
            <Progress value={data.ecoScore * 10} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>AI-powered recommendations to improve your store performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Sales Performance</h4>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Excellent</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Your sales growth of {data.salesGrowth}% is above the regional average of 12%.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Target Achievement</span>
                  <span>108%</span>
                </div>
                <Progress value={108} className="h-1" />
              </div>
            </div>

            <div className="p-4 border rounded-lg dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Customer Satisfaction</h4>
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                  Very Good
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Rating of {data.customerSatisfaction}/5.0 is great! Focus on reducing wait times to reach 5.0.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Customer Retention</span>
                  <span>94%</span>
                </div>
                <Progress value={94} className="h-1" />
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">💡 AI Recommendation</h4>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Your inventory turnover is excellent at {data.inventoryTurnover}x per month. Consider expanding your
              fast-moving categories like groceries and dairy products to increase revenue by an estimated 18%.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
