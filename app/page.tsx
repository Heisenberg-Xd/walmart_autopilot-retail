import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Package, Leaf, BarChart3, Users, Store, Truck, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <Badge className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 text-lg px-4 py-2 font-bold mb-6">
              ⚡ Walmart SparkAI
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">AutoPilot Retail</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              AI-Powered Predictive Retail Fulfillment System
              <br />
              <span className="text-yellow-300 font-semibold">Smart Inventory • Eco-Delivery • Real-Time IoT</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/auth/login">
                <Button
                  size="lg"
                  className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-semibold px-8 py-4 text-lg"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Launch Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">94%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Prediction Accuracy</div>
          </Card>
          <Card className="text-center p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-green-600 mb-2">32%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Carbon Reduction</div>
          </Card>
          <Card className="text-center p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">2,847</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Stores</div>
          </Card>
          <Card className="text-center p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-orange-600 mb-2">89%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Customer Satisfaction</div>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-blue-600 mb-4" />
              <CardTitle className="text-xl">AI Demand Prediction</CardTitle>
              <CardDescription>Forecast demand across Indian regions with 94% accuracy</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Predict high-demand products using historical data and external factors
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
            <CardHeader>
              <Package className="h-10 w-10 text-green-600 mb-4" />
              <CardTitle className="text-xl">Smart Inventory</CardTitle>
              <CardDescription>Automated micro-fulfillment and inventory optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Optimize stock routing and prevent overstock/understock conditions
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
            <CardHeader>
              <Leaf className="h-10 w-10 text-emerald-600 mb-4" />
              <CardTitle className="text-xl">Eco-Delivery</CardTitle>
              <CardDescription>Carbon-efficient routing with gamified green rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Recommend eco-friendly delivery slots with gamified sustainability
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Access */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Admin Dashboard</CardTitle>
              <CardDescription>Monitor predictions and manage inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Access Admin Panel</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Store className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Store Manager</CardTitle>
              <CardDescription>Manage local inventory and orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/store">
                <Button className="w-full bg-green-600 hover:bg-green-700">Store Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-800 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Truck className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Delivery Partner</CardTitle>
              <CardDescription>Optimize routes and track deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/delivery">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Delivery Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Customer Portal</CardTitle>
              <CardDescription>Personalized recommendations and eco-options</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/customer">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Shop Now</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
