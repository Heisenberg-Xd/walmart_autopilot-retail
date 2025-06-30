"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { WalmartSidebar } from "@/components/walmart-sidebar"
import { AIChatbot } from "@/components/ai-chatbot"
import { Wifi, Thermometer, Droplets, Zap, AlertTriangle, CheckCircle, Activity } from "lucide-react"

export default function IoTMonitoringPage() {
  const [loading, setLoading] = useState(true)
  const [realTimeData, setRealTimeData] = useState({
    temperature: 22.5,
    humidity: 45,
    power: 87,
    connectivity: 98,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(30, Math.min(70, prev.humidity + (Math.random() - 0.5) * 5)),
        power: Math.max(70, Math.min(100, prev.power + (Math.random() - 0.5) * 3)),
        connectivity: Math.max(90, Math.min(100, prev.connectivity + (Math.random() - 0.5) * 2)),
      }))
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <WalmartSidebar userType="admin" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading IoT Monitoring Dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  const sensorData = [
    {
      id: "TEMP_001",
      name: "Temperature Sensor - Freezer A1",
      location: "Mumbai Bandra - Cold Storage",
      value: realTimeData.temperature.toFixed(1),
      unit: "°C",
      status: realTimeData.temperature > 25 ? "warning" : "healthy",
      lastUpdate: "2 sec ago",
      icon: Thermometer,
    },
    {
      id: "HUM_002",
      name: "Humidity Sensor - Storage B2",
      location: "Delhi CP - Warehouse",
      value: realTimeData.humidity.toFixed(0),
      unit: "%",
      status: realTimeData.humidity > 60 ? "warning" : "healthy",
      lastUpdate: "5 sec ago",
      icon: Droplets,
    },
    {
      id: "POW_003",
      name: "Power Monitor - Main Grid",
      location: "Bengaluru Koramangala",
      value: realTimeData.power.toFixed(0),
      unit: "%",
      status: realTimeData.power < 80 ? "critical" : "healthy",
      lastUpdate: "1 sec ago",
      icon: Zap,
    },
    {
      id: "NET_004",
      name: "Network Connectivity",
      location: "Chennai T.Nagar",
      value: realTimeData.connectivity.toFixed(0),
      unit: "%",
      status: realTimeData.connectivity < 95 ? "warning" : "healthy",
      lastUpdate: "3 sec ago",
      icon: Wifi,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <WalmartSidebar userType="admin" />

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">IoT Monitoring</h1>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-blue-600 text-white">
                    <Wifi className="h-3 w-3 mr-1" />
                    Real-time Monitoring
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Live Data Stream
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Configure Alerts
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Add Sensor
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Sensors</CardTitle>
                <Activity className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">247</div>
                <p className="text-xs text-blue-100">Across all locations</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Healthy Status</CardTitle>
                <CheckCircle className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">234</div>
                <p className="text-xs text-green-100">94.7% operational</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">13</div>
                <p className="text-xs text-orange-100">Require attention</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Points</CardTitle>
                <Zap className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2M</div>
                <p className="text-xs text-purple-100">Collected today</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="sensors" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800">
              <TabsTrigger value="sensors">🔌 Sensors</TabsTrigger>
              <TabsTrigger value="alerts">🚨 Alerts</TabsTrigger>
              <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
              <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="sensors" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Real-time Sensor Data</CardTitle>
                  <CardDescription>Live monitoring of all IoT sensors across the network</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sensorData.map((sensor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                          <sensor.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{sensor.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{sensor.location}</p>
                          <p className="text-xs text-gray-500">ID: {sensor.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {sensor.value}
                            {sensor.unit}
                          </div>
                          <p className="text-xs text-gray-500">{sensor.lastUpdate}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(sensor.status)}
                          <Badge className={getStatusColor(sensor.status)}>{sensor.status}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Temperature Monitoring</CardTitle>
                    <CardDescription>Cold storage temperature trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600">{realTimeData.temperature.toFixed(1)}°C</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Current Average</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Optimal Range (18-24°C)</span>
                          <span>{realTimeData.temperature >= 18 && realTimeData.temperature <= 24 ? "✅" : "⚠️"}</span>
                        </div>
                        <Progress
                          value={Math.min(100, Math.max(0, ((realTimeData.temperature - 15) / 15) * 100))}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Network Connectivity</CardTitle>
                    <CardDescription>IoT device connectivity status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-3xl font-bold text-green-600">{realTimeData.connectivity.toFixed(0)}%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Network Uptime</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Connected Devices</span>
                          <span>234/247</span>
                        </div>
                        <Progress value={realTimeData.connectivity} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Active Alerts</CardTitle>
                  <CardDescription>Current system alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      severity: "critical",
                      message: "Freezer temperature exceeded threshold in Mumbai Bandra",
                      sensor: "TEMP_001",
                      time: "2 mins ago",
                      action: "Auto-notification sent to store manager",
                    },
                    {
                      severity: "warning",
                      message: "High humidity detected in Delhi CP warehouse",
                      sensor: "HUM_002",
                      time: "15 mins ago",
                      action: "Ventilation system activated",
                    },
                    {
                      severity: "info",
                      message: "Power consumption spike in Bengaluru store",
                      sensor: "POW_003",
                      time: "1 hour ago",
                      action: "Monitoring for patterns",
                    },
                  ].map((alert, index) => (
                    <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`p-1 rounded-full ${
                            alert.severity === "critical"
                              ? "bg-red-100"
                              : alert.severity === "warning"
                                ? "bg-yellow-100"
                                : "bg-blue-100"
                          }`}
                        >
                          <AlertTriangle
                            className={`h-4 w-4 ${
                              alert.severity === "critical"
                                ? "text-red-600"
                                : alert.severity === "warning"
                                  ? "text-yellow-600"
                                  : "text-blue-600"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Sensor: {alert.sensor}</p>
                          <p className="text-sm text-blue-600 dark:text-blue-400">Action: {alert.action}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            alert.severity === "critical"
                              ? "bg-red-100 text-red-800"
                              : alert.severity === "warning"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {alert.severity}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Sensor Performance</CardTitle>
                    <CardDescription>Overall system health metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">99.2%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">System Uptime</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">1.2M</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Data Points Today</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Energy Efficiency</CardTitle>
                    <CardDescription>Power consumption optimization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-emerald-600">15%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Energy Savings</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">₹45K</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Cost Savings/Month</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Alert Configuration</CardTitle>
                  <CardDescription>Configure thresholds and notification settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Temperature Thresholds</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Critical High</span>
                          <Badge className="bg-red-100 text-red-800">25°C</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Warning High</span>
                          <Badge className="bg-yellow-100 text-yellow-800">24°C</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Warning Low</span>
                          <Badge className="bg-yellow-100 text-yellow-800">18°C</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Critical Low</span>
                          <Badge className="bg-red-100 text-red-800">15°C</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Notification Settings</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Email Alerts</span>
                          <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">SMS Alerts</span>
                          <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Push Notifications</span>
                          <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Auto-Response</span>
                          <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AIChatbot />
    </div>
  )
}
