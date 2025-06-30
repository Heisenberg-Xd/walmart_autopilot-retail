"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Leaf, Recycle, Truck, Zap } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface EcoMetricsProps {
  data: {
    carbonReduction: {
      thisMonth: number
      target: number
      breakdown: Array<{ category: string; value: number; color: string }>
    }
    wasteReduction: {
      recycled: number
      reused: number
      total: number
    }
    greenDeliveries: {
      percentage: number
      trend: number
    }
    energyEfficiency: {
      score: number
      improvements: Array<{ area: string; saving: number }>
    }
  }
}

export function EcoMetrics({ data }: EcoMetricsProps) {
  const carbonProgress = (data.carbonReduction.thisMonth / data.carbonReduction.target) * 100

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Reduction</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{data.carbonReduction.thisMonth}t</div>
            <div className="space-y-2 mt-2">
              <Progress value={carbonProgress} className="h-2" />
              <p className="text-xs text-green-600">{Math.round(carbonProgress)}% of monthly target</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waste Diverted</CardTitle>
            <Recycle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {(
                ((data.wasteReduction.recycled + data.wasteReduction.reused) / data.wasteReduction.total) *
                100
              ).toFixed(1)}
              %
            </div>
            <p className="text-xs text-blue-600 mt-2">
              {data.wasteReduction.recycled + data.wasteReduction.reused}kg of {data.wasteReduction.total}kg
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Green Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{data.greenDeliveries.percentage}%</div>
            <p className="text-xs text-purple-600 mt-2">+{data.greenDeliveries.trend}% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energy Efficiency</CardTitle>
            <Zap className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{data.energyEfficiency.score}/100</div>
            <Badge variant="outline" className="mt-2 text-orange-600 border-orange-600">
              Excellent
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Carbon Reduction Breakdown</CardTitle>
            <CardDescription>Sources of carbon savings this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.carbonReduction.breakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ category, value }) => `${category}: ${value}t`}
                  >
                    {data.carbonReduction.breakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Energy Efficiency Improvements</CardTitle>
            <CardDescription>Areas with highest energy savings potential</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.energyEfficiency.improvements}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="area" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, "Potential Saving"]} />
                  <Bar dataKey="saving" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sustainability Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Sustainability Goals Progress</CardTitle>
          <CardDescription>Track progress towards environmental targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Carbon Neutral Operations</span>
                <span className="text-sm text-gray-600">78% complete</span>
              </div>
              <Progress value={78} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Zero Waste to Landfill</span>
                <span className="text-sm text-gray-600">65% complete</span>
              </div>
              <Progress value={65} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">100% Renewable Energy</span>
                <span className="text-sm text-gray-600">92% complete</span>
              </div>
              <Progress value={92} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Sustainable Packaging</span>
                <span className="text-sm text-gray-600">84% complete</span>
              </div>
              <Progress value={84} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
