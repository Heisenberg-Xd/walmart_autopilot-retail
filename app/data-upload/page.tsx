"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { WalmartSidebar } from "@/components/walmart-sidebar"
import { AIChatbot } from "@/components/ai-chatbot"
import { FileUploadSection } from "@/components/file-upload-section"
import { Upload, Database, FileText, Users, Package, MapPin, TrendingUp, Truck, Brain } from "lucide-react"

const datasetTypes = [
  {
    id: "users",
    name: "Users Data",
    description: "Customer information, preferences, and green points",
    icon: Users,
    schema: [
      { name: "user_id", type: "string", example: "U500" },
      { name: "name", type: "string", example: "Jason" },
      { name: "city", type: "string", example: "Jaipur" },
      { name: "green_points", type: "string", example: "461" },
      { name: "preferred_slot", type: "string", example: "Afternoon" },
    ],
    color: "bg-blue-500",
  },
  {
    id: "product_catalog",
    name: "Product Catalog",
    description: "Product information, categories, prices, and eco scores",
    icon: Package,
    schema: [
      { name: "product_id", type: "string", example: "P005" },
      { name: "name", type: "string", example: "Handwash 250ml" },
      { name: "category", type: "string", example: "Personal Care" },
      { name: "price", type: "number", example: "888" },
      { name: "eco_score", type: "number", example: "4" },
    ],
    color: "bg-green-500",
  },
  {
    id: "external_events",
    name: "External Events",
    description: "Weather data, city events, and external factors",
    icon: FileText,
    schema: [
      { name: "date", type: "date", example: "2024-06-28" },
      { name: "city", type: "string", example: "Delhi" },
      { name: "weather", type: "string", example: "Stormy" },
      { name: "event", type: "string", example: "Monsoon Alert" },
    ],
    color: "bg-orange-500",
  },
  {
    id: "smart_whispers",
    name: "Smart Whispers",
    description: "AI-generated suggestions and recommendations",
    icon: Brain,
    schema: [
      { name: "id", type: "string", example: "W499" },
      { name: "suggestion_text", type: "string", example: "Move 71 Kurta Set from Mumbai to Mumbai." },
      { name: "triggered_on", type: "date", example: "2025-06-29 08:46 AM" },
      { name: "status", type: "string", example: "In Review" },
    ],
    color: "bg-purple-500",
  },
  {
    id: "delivery_data",
    name: "Delivery Data",
    description: "Delivery information, routes, and carbon savings",
    icon: Truck,
    schema: [
      { name: "delivery_id", type: "string", example: "D999" },
      { name: "user_id", type: "string", example: "U193" },
      { name: "store_id", type: "string", example: "S001" },
      { name: "distance_km", type: "string", example: "13.3" },
      { name: "delivery_mode", type: "string", example: "Grouped" },
      { name: "delivery_time", type: "date", example: "2025-06-30 01:36 PM" },
      { name: "carbon_saved_g", type: "number", example: "394" },
    ],
    color: "bg-indigo-500",
  },
  {
    id: "store_locations",
    name: "Store Locations",
    description: "Store information and geographical coordinates",
    icon: MapPin,
    schema: [
      { name: "store_id", type: "string", example: "S005" },
      { name: "store_name", type: "string", example: "Surat Store" },
      { name: "city", type: "string", example: "Surat" },
      { name: "latitude", type: "number", example: "-15.7225" },
      { name: "longitude", type: "number", example: "-136.1711" },
    ],
    color: "bg-red-500",
  },
  {
    id: "sales_data",
    name: "Sales Data",
    description: "Historical sales information and trends",
    icon: TrendingUp,
    schema: [
      { name: "date", type: "date", example: "2024-03-07" },
      { name: "product_id", type: "string", example: "P004" },
      { name: "product_name", type: "string", example: "LED Bulb" },
      { name: "store_id", type: "string", example: "S002" },
      { name: "store_city", type: "string", example: "Mumbai" },
      { name: "units_sold", type: "string", example: "66" },
    ],
    color: "bg-yellow-500",
  },
  {
    id: "inventory_data",
    name: "Inventory Data",
    description: "Current stock levels and inventory tracking",
    icon: Database,
    schema: [
      { name: "store_id", type: "string", example: "S001" },
      { name: "product_id", type: "string", example: "P005" },
      { name: "product_name", type: "string", example: "Handwash 250ml" },
      { name: "quantity", type: "number", example: "137" },
      { name: "last_updated", type: "date", example: "2025-06-27 02:51 PM" },
    ],
    color: "bg-teal-500",
  },
]

export default function DataUploadPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <WalmartSidebar userType="admin" />

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Data Upload Center</h1>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-blue-600 text-white">
                    <Upload className="h-3 w-3 mr-1" />
                    CSV Upload
                  </Badge>
                  <Badge variant="outline">
                    <Database className="h-3 w-3 mr-1" />8 Dataset Types
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Ready to Upload
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-gray-800">
              <TabsTrigger value="overview">📊 Overview</TabsTrigger>
              <TabsTrigger value="upload">📤 Upload Data</TabsTrigger>
              <TabsTrigger value="history">📋 Upload History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {datasetTypes.map((dataset) => (
                  <Card key={dataset.id} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-lg ${dataset.color} text-white`}>
                          <dataset.icon className="h-5 w-5" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {dataset.schema.length} fields
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{dataset.name}</CardTitle>
                      <CardDescription className="text-sm">{dataset.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Schema Preview:</p>
                        <div className="space-y-1">
                          {dataset.schema.slice(0, 3).map((field, index) => (
                            <div key={index} className="flex justify-between text-xs">
                              <span className="font-mono text-blue-600 dark:text-blue-400">{field.name}</span>
                              <span className="text-gray-500">{field.type}</span>
                            </div>
                          ))}
                          {dataset.schema.length > 3 && (
                            <div className="text-xs text-gray-400">+{dataset.schema.length - 3} more fields</div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Upload Guidelines</CardTitle>
                  <CardDescription>Important information for successful data uploads</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">✅ Supported Formats</h4>
                      <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                        <li>• CSV files with UTF-8 encoding</li>
                        <li>• Maximum file size: 50MB</li>
                        <li>• Headers must match schema exactly</li>
                        <li>• Date format: YYYY-MM-DD or YYYY-MM-DD HH:MM AM/PM</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">❌ Common Issues</h4>
                      <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                        <li>• Missing required columns</li>
                        <li>• Invalid date formats</li>
                        <li>• Special characters in numeric fields</li>
                        <li>• Duplicate IDs in the same file</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upload" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {datasetTypes.map((dataset) => (
                  <FileUploadSection key={dataset.id} dataset={dataset} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Recent Upload History</CardTitle>
                  <CardDescription>Track your recent data uploads and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        filename: "users_2025_01_03.csv",
                        type: "Users Data",
                        timestamp: "2025-01-03 14:30",
                        status: "success",
                        records: 1250,
                      },
                      {
                        filename: "inventory_mumbai_store.csv",
                        type: "Inventory Data",
                        timestamp: "2025-01-03 12:15",
                        status: "success",
                        records: 890,
                      },
                      {
                        filename: "sales_december_2024.csv",
                        type: "Sales Data",
                        timestamp: "2025-01-02 16:45",
                        status: "error",
                        records: 0,
                        error: "Invalid date format in row 45",
                      },
                      {
                        filename: "product_catalog_update.csv",
                        type: "Product Catalog",
                        timestamp: "2025-01-02 10:20",
                        status: "success",
                        records: 456,
                      },
                    ].map((upload, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="font-medium">{upload.filename}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{upload.type}</p>
                              <p className="text-xs text-gray-500">{upload.timestamp}</p>
                            </div>
                          </div>
                          {upload.error && <p className="text-sm text-red-600 mt-2 ml-8">{upload.error}</p>}
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              upload.status === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }
                          >
                            {upload.status}
                          </Badge>
                          {upload.records > 0 && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {upload.records.toLocaleString()} records
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
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