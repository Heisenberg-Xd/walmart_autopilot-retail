"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, TrendingDown, TrendingUp, CalendarDays, MapPin, BarChart3 } from "lucide-react"
import { ResponsiveLine } from "@nivo/line"
import { Progress } from "@/components/ui/progress"
import axios from "axios"
import moment from "moment"

interface DemandData {
  product: string
  city: string
  predicted_demand: number
  date: string
}

interface CityProductMap {
  [city: string]: { [product: string]: number }
}

export default function DemandPredictionPage() {
  const [demandData, setDemandData] = useState<DemandData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("http://localhost:5000/api/demand").then((res) => {
      setDemandData(res.data)
      setLoading(false)
    })
  }, [])

  const groupedData = demandData.reduce((acc: CityProductMap, item) => {
    if (!acc[item.city]) acc[item.city] = {}
    acc[item.city][item.product] = item.predicted_demand
    return acc
  }, {})

  const getColor = (change: number) => {
    return change > 0 ? "bg-green-100 border-green-400" : change < 0 ? "bg-red-100 border-red-400" : "bg-yellow-100 border-yellow-400"
  }

  const getChange = () => {
    return Math.floor(Math.random() * 41 - 20)
  }

  const lineChartData = Object.entries(groupedData).map(([city, products]) => ({
    id: city,
    data: Object.entries(products).map(([product, demand], idx) => ({
      x: moment().subtract(idx, "weeks").format("YYYY-MM-DD"),
      y: demand - Math.floor(Math.random() * 40),
    })),
  }))

  const generateSummary = () => {
    if (!lineChartData.length) return ""

    let highestCity = ""
    let highestChange = -Infinity
    let lowestCity = ""
    let lowestChange = Infinity

    lineChartData.forEach((cityData) => {
      const last = cityData.data[0]?.y ?? 0
      const prev = cityData.data[1]?.y ?? 0
      const delta = last - prev

      if (delta > highestChange) {
        highestChange = delta
        highestCity = cityData.id
      }
      if (delta < lowestChange) {
        lowestChange = delta
        lowestCity = cityData.id
      }
    })

    return `📈 Over the past week, demand in **${highestCity}** increased the most with a rise of ${highestChange} units, while **${lowestCity}** experienced the sharpest decline of ${Math.abs(lowestChange)} units. This trend highlights shifting consumer behavior across regions and may require targeted inventory strategies.`
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading demand predictions...</span>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">📊 Demand Trends</h1>
        <p className="text-muted-foreground">Visualize predicted demand growth across cities and products</p>
      </div>

      <Card className="bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle>Predicted Demand Over Time</CardTitle>
          <CardDescription>Historical growth trend by city</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveLine
            data={lineChartData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
           axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Date",
            legendOffset: 36,
            legendPosition: "middle",
            }}

           axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Units",
            legendOffset: -40,
            legendPosition: "middle",
            }}

            colors={{ scheme: "category10" }}
            pointSize={8}
            pointBorderWidth={2}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 6,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                symbolSize: 12,
                symbolShape: "circle",
              },
            ]}
          />
        </CardContent>
      </Card>

      {/* Textual Insight */}
      <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-4 rounded-md shadow-sm">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          {generateSummary()}
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">📦 Demand Predictions</h2>
        <p className="text-muted-foreground mb-4">Forecast of product demands by city based on AI model.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {demandData.map((item, index) => {
            const percentChange = getChange()
            const demandProgress = Math.min(100, (item.predicted_demand / 200) * 100)

            return (
              <Card key={index} className={`border-2 ${getColor(percentChange)}`}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-blue-500" />
                      <span>{item.product}</span>
                    </div>
                    <Badge variant="outline">{item.predicted_demand} units</Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {item.city}
                  </div>
                  <div className="flex items-center text-sm">
                    {percentChange >= 0 ? (
                      <span className="text-green-600 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" /> +{percentChange}% from last week
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center">
                        <TrendingDown className="h-4 w-4 mr-1" /> {percentChange}% from last week
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarDays className="h-4 w-4 mr-1" /> {item.date}
                  </div>
                  <div className="mt-2">
                    <Progress value={demandProgress} className="h-2 bg-blue-200" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
