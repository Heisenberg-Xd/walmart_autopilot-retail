"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, TrendingUp, Leaf, BarChart3, Users, Store } from "lucide-react"

export function WalmartHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-800/20 to-transparent" />

      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          {/* Walmart Badge */}
          <div className="inline-flex items-center mb-6">
            <Badge className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 text-lg px-4 py-2 font-bold">
              ⚡ Walmart SparkAI
            </Badge>
          </div>

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
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg bg-transparent"
              >
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">AI Demand Prediction</h3>
              <p className="text-blue-100">Forecast demand across Indian regions with 94% accuracy</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Smart Inventory</h3>
              <p className="text-blue-100">Automated micro-fulfillment and inventory optimization</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Leaf className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Eco-Delivery</h3>
              <p className="text-blue-100">Carbon-efficient routing with gamified green rewards</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access */}
        <div className="mt-16 text-center">
          <p className="text-blue-200 mb-6">Quick Access to Dashboards</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/admin">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                <BarChart3 className="mr-2 h-4 w-4" />
                Admin Dashboard
              </Button>
            </Link>
            <Link href="/store">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                <Store className="mr-2 h-4 w-4" />
                Store Manager
              </Button>
            </Link>
            <Link href="/customer">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                <Users className="mr-2 h-4 w-4" />
                Customer Portal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
