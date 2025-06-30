"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface LocalDemandChartProps {
  data: Array<{
    hour: string
    demand: number
    prediction: number
  }>
  trends: Array<{
    product: string
    trend: string
    reason: string
    icon: string
  }>
}

export function LocalDemandChart({ data, trends }: LocalDemandChartProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Today's Demand Pattern
            </CardTitle>
            <CardDescription>Hourly demand vs AI predictions for your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [value, name === "demand" ? "Actual Demand" : "AI Prediction"]}
                  />
                  <Line type="monotone" dataKey="demand" stroke="#3b82f6" strokeWidth={2} name="Actual" />
                  <Line
                    type="monotone"
                    dataKey="prediction"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Predicted"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Local Trends Alert
            </CardTitle>
            <CardDescription>Products trending in your area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {trends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{trend.icon}</span>
                  <div>
                    <p className="font-medium">{trend.product}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{trend.reason}</p>
                  </div>
                </div>
                <Badge variant={trend.trend.startsWith("+") ? "default" : "secondary"}>
                  {trend.trend.startsWith("+") ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {trend.trend}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Demand Insights</CardTitle>
          <CardDescription>AI-powered insights for your store</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Peak Hours</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                6:00 PM - 8:00 PM shows highest demand. Consider increasing staff during these hours.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Weather Impact</h4>
              <p className="text-sm text-green-700 dark:text-green-400">
                Rain forecast tomorrow. Stock up on umbrellas, raincoats, and hot beverages.
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Weekend Prep</h4>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                Fresh vegetables and cooking ingredients show 25% higher demand on weekends.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
