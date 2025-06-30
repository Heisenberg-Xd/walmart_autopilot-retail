"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { WalmartSidebar } from "@/components/walmart-sidebar"
import { AIChatbot } from "@/components/ai-chatbot"
import { Store, MapPin, TrendingUp, Users, Package, Search, Filter, Plus } from "lucide-react"

export default function StoreNetworkPage() {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <WalmartSidebar userType="admin" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading Store Network...</p>
          </div>
        </div>
      </div>
    )
  }

  const storeData = [
    {
      id: "WM001",
      name: "Mumbai Bandra West",
      location: "Bandra West, Mumbai, Maharashtra",
      manager: "Rajesh Kumar",
      revenue: "₹2,45,000",
      customers: 1247,
      inventory: 8500,
      status: "excellent",
      growth: "+15%",
      rating: 4.8,
    },
    {
      id: "WM002",
      name: "Delhi Connaught Place",
      location: "Connaught Place, New Delhi",
      manager: "Priya Sharma",
      revenue: "₹2,12,000",
      customers: 1089,
      inventory: 7200,
      status: "good",
      growth: "+12%",
      rating: 4.6,
    },
    {
      id: "WM003",
      name: "Bengaluru Koramangala",
      location: "Koramangala, Bengaluru, Karnataka",
      manager: "Arjun Reddy",
      revenue: "₹1,98,000",
      customers: 956,
      inventory: 6800,
      status: "needs-attention",
      growth: "+8%",
      rating: 4.4,
    },
    {
      id: "WM004",
      name: "Chennai T.Nagar",
      location: "T.Nagar, Chennai, Tamil Nadu",
      manager: "Lakshmi Iyer",
      revenue: "₹1,87,000",
      customers: 892,
      inventory: 6200,
      status: "good",
      growth: "+18%",
      rating: 4.7,
    },
    {
      id: "WM005",
      name: "Pune Kothrud",
      location: "Kothrud, Pune, Maharashtra",
      manager: "Amit Patil",
      revenue: "₹1,65,000",
      customers: 734,
      inventory: 5500,
      status: "excellent",
      growth: "+22%",
      rating: 4.9,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "needs-attention":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredStores = storeData.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.manager.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <WalmartSidebar userType="admin" />

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Store Network</h1>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-blue-600 text-white">
                    <Store className="h-3 w-3 mr-1" />
                    Multi-location Management
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    All Stores Online
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  Map View
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Store
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
                <Store className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-blue-100">Across India</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Network Revenue</CardTitle>
                <TrendingUp className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹45.6L</div>
                <p className="text-xs text-green-100">Today's total</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                <Users className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,567</div>
                <p className="text-xs text-purple-100">Daily active users</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                <Package className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.7</div>
                <p className="text-xs text-orange-100">Customer satisfaction</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search stores, locations, or managers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800">
              <TabsTrigger value="overview">🏪 Overview</TabsTrigger>
              <TabsTrigger value="stores">📍 Store Details</TabsTrigger>
              <TabsTrigger value="performance">📊 Performance</TabsTrigger>
              <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Network Performance</CardTitle>
                    <CardDescription>Overall network health and metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Excellent Performance</span>
                        <span>28 stores (60%)</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Good Performance</span>
                        <span>15 stores (32%)</span>
                      </div>
                      <Progress value={32} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Needs Attention</span>
                        <span>4 stores (8%)</span>
                      </div>
                      <Progress value={8} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Top Performing Regions</CardTitle>
                    <CardDescription>Revenue leaders by region</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { region: "Maharashtra", stores: 12, revenue: "₹12.4L", growth: "+15%" },
                      { region: "Karnataka", stores: 8, revenue: "₹9.8L", growth: "+12%" },
                      { region: "Delhi NCR", stores: 6, revenue: "₹8.2L", growth: "+18%" },
                      { region: "Tamil Nadu", stores: 9, revenue: "₹7.6L", growth: "+8%" },
                    ].map((region, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{region.region}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{region.stores} stores</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{region.revenue}</p>
                          <Badge className="bg-green-100 text-green-800 text-xs">{region.growth}</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="stores" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Store Directory</CardTitle>
                  <CardDescription>Detailed information about all store locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredStores.map((store, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                              <Store className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">{store.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{store.location}</p>
                              <p className="text-xs text-gray-500">
                                ID: {store.id} | Manager: {store.manager}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400 ml-14">
                            <div>
                              <span className="font-medium">Revenue:</span> {store.revenue}
                            </div>
                            <div>
                              <span className="font-medium">Customers:</span> {store.customers.toLocaleString()}
                            </div>
                            <div>
                              <span className="font-medium">Inventory:</span> {store.inventory.toLocaleString()}
                            </div>
                            <div>
                              <span className="font-medium">Rating:</span> {store.rating}/5.0
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex items-center space-x-3">
                          <Badge className={getStatusColor(store.status)}>{store.status.replace("-", " ")}</Badge>
                          <Badge className="bg-green-100 text-green-800">{store.growth}</Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {storeData.slice(0, 6).map((store, index) => (
                  <Card key={index} className="bg-white dark:bg-gray-900">
                    <CardHeader>
                      <CardTitle className="text-lg">{store.name}</CardTitle>
                      <CardDescription>{store.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Performance</span>
                          <Badge className={getStatusColor(store.status)}>{store.status.replace("-", " ")}</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Daily Revenue</span>
                            <span className="font-medium">{store.revenue}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Customer Rating</span>
                            <span className="font-medium">{store.rating}/5.0</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Growth Rate</span>
                            <Badge className="bg-green-100 text-green-800 text-xs">{store.growth}</Badge>
                          </div>
                        </div>
                        <Progress value={store.rating * 20} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Network Growth Trends</CardTitle>
                    <CardDescription>Revenue and expansion metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">+15.2%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Network Growth Rate</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">₹45.6L</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Daily Network Revenue</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Expansion Opportunities</CardTitle>
                    <CardDescription>Potential new locations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { city: "Hyderabad", potential: "High", market: "₹8.5L/month" },
                        { city: "Kolkata", potential: "Medium", market: "₹6.2L/month" },
                        { city: "Ahmedabad", potential: "High", market: "₹7.8L/month" },
                        { city: "Jaipur", potential: "Medium", market: "₹5.4L/month" },
                      ].map((opportunity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{opportunity.city}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Market Size: {opportunity.market}
                            </p>
                          </div>
                          <Badge
                            className={
                              opportunity.potential === "High"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {opportunity.potential} Potential
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AIChatbot />
    </div>
  )
}
