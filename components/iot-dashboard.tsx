"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wifi, Thermometer, Shield, Activity, AlertTriangle } from "lucide-react"

export function IoTDashboard() {
  const iotDevices = [
    {
      id: "IOT-MUM-001",
      name: "Mumbai Bandra Store",
      type: "Smart Shelf Sensors",
      status: "online",
      temperature: 22,
      humidity: 45,
      batteryLevel: 87,
      lastUpdate: "2 mins ago",
      alerts: 0,
    },
    {
      id: "IOT-DEL-002",
      name: "Delhi CP Store",
      type: "Inventory Trackers",
      status: "online",
      temperature: 18,
      humidity: 38,
      batteryLevel: 92,
      lastUpdate: "1 min ago",
      alerts: 1,
    },
    {
      id: "IOT-BLR-003",
      name: "Bengaluru Koramangala",
      type: "Environmental Sensors",
      status: "warning",
      temperature: 25,
      humidity: 62,
      batteryLevel: 23,
      lastUpdate: "5 mins ago",
      alerts: 2,
    },
    {
      id: "IOT-CHN-004",
      name: "Chennai T.Nagar",
      type: "Smart Refrigeration",
      status: "online",
      temperature: 4,
      humidity: 85,
      batteryLevel: 78,
      lastUpdate: "30 secs ago",
      alerts: 0,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-green-600 bg-green-50 dark:bg-green-900/20"
      case "warning":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
      case "offline":
        return "text-red-600 bg-red-50 dark:bg-red-900/20"
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20"
    }
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Devices</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">2,847</div>
            <p className="text-xs text-muted-foreground">98.5% uptime</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-xs text-muted-foreground">3 critical, 9 warnings</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Points/Hour</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1.2M</div>
            <p className="text-xs text-muted-foreground">Real-time monitoring</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.2%</div>
            <p className="text-xs text-muted-foreground">Network reliability</p>
          </CardContent>
        </Card>
      </div>

      {/* Device Status Grid */}
      <Card className="bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle>IoT Device Status</CardTitle>
          <CardDescription>Real-time monitoring of smart sensors across all stores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {iotDevices.map((device) => (
              <Card key={device.id} className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{device.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{device.type}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{device.id}</p>
                    </div>
                    <Badge className={getStatusColor(device.status)}>{device.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <Thermometer className="h-4 w-4 text-blue-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium">{device.temperature}°C</p>
                        <p className="text-xs text-gray-500">Temperature</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 text-green-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium">{device.humidity}%</p>
                        <p className="text-xs text-gray-500">Humidity</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Battery Level</span>
                      <span>{device.batteryLevel}%</span>
                    </div>
                    <Progress value={device.batteryLevel} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Last update: {device.lastUpdate}</span>
                    {device.alerts > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {device.alerts} alert{device.alerts > 1 ? "s" : ""}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Data Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Environmental Monitoring</CardTitle>
            <CardDescription>Temperature and humidity trends across stores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Optimal Conditions</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  87% of stores maintaining ideal temperature (18-24°C) and humidity (40-60%) levels
                </p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">Attention Required</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  Bengaluru store showing elevated humidity (62%) - AC system check recommended
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Smart Inventory Tracking</CardTitle>
            <CardDescription>Real-time stock level monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                <div>
                  <p className="font-medium">Smart Shelf Sensors</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Weight-based stock detection</p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                <div>
                  <p className="font-medium">RFID Trackers</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Individual item tracking</p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                <div>
                  <p className="font-medium">Computer Vision</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered visual monitoring</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Beta</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
