"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Package, Leaf, Users, MapPin, Zap } from "lucide-react"

export function StatsOverview() {
  const stats = [
    {
      icon: TrendingUp,
      label: "Prediction Accuracy",
      value: "94.2%",
      change: "+2.1%",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: Package,
      label: "Inventory Efficiency",
      value: "87%",
      change: "+5.3%",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: Leaf,
      label: "Carbon Reduction",
      value: "32%",
      change: "+8.2%",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      icon: Users,
      label: "Active Stores",
      value: "2,847",
      change: "+156",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      icon: MapPin,
      label: "Cities Covered",
      value: "28",
      change: "+3",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      icon: Zap,
      label: "AI Insights/Day",
      value: "15.2K",
      change: "+1.8K",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
  ]

  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 mb-4">
            Real-Time Analytics
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Powered by Walmart SparkAI</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Live metrics from across India's retail network, updated every minute
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className={`${stat.bgColor} border-0 hover:scale-105 transition-transform duration-200`}>
              <CardContent className="p-6 text-center">
                <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{stat.label}</div>
                <Badge variant="outline" className="text-xs">
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
