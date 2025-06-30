"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, MessageSquare, Zap, MapPin, BarChart3, Leaf } from "lucide-react"

export function FeatureShowcase() {
  const features = [
    {
      icon: Brain,
      title: "Smart Inventory Whisperer",
      description: "AI assistant that provides instant actionable inventory suggestions",
      highlights: ["Real-time demand shifts", "Automated rebalancing", "Carbon optimization"],
      color: "blue",
    },
    {
      icon: MessageSquare,
      title: "AI Chatbot Assistant",
      description: "24/7 intelligent support for customers and store managers",
      highlights: ["Order tracking", "Trend analysis", "Dashboard insights"],
      color: "green",
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "ML-powered demand forecasting across Indian regions",
      highlights: ["7-day forecasts", "Regional trends", "Seasonal patterns"],
      color: "purple",
    },
    {
      icon: MapPin,
      title: "IoT Dashboard",
      description: "Real-time monitoring of inventory and delivery networks",
      highlights: ["Live tracking", "Route optimization", "Performance metrics"],
      color: "orange",
    },
    {
      icon: Zap,
      title: "Micro-Fulfillment",
      description: "Automated inventory movement and optimization",
      highlights: ["Smart routing", "Cost reduction", "Faster delivery"],
      color: "yellow",
    },
    {
      icon: Leaf,
      title: "Eco-Delivery System",
      description: "Sustainable delivery with gamified green rewards",
      highlights: ["Carbon tracking", "Green points", "Eco-routes"],
      color: "emerald",
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
      green: "text-green-600 bg-green-50 dark:bg-green-900/20",
      purple: "text-purple-600 bg-purple-50 dark:bg-purple-900/20",
      orange: "text-orange-600 bg-orange-50 dark:bg-orange-900/20",
      yellow: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20",
      emerald: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-yellow-400 text-blue-900 mb-4 text-lg px-4 py-2">🚀 AI-Powered Features</Badge>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Next-Generation Retail Intelligence</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the future of retail with our comprehensive AI-driven platform designed for Indian markets
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-900"
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg ${getColorClasses(feature.color)} flex items-center justify-center mb-4`}
                >
                  <feature.icon
                    className={`h-6 w-6 ${feature.color === "yellow" ? "text-yellow-700" : `text-${feature.color}-600`}`}
                  />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-6">
                  {feature.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <div
                        className={`w-2 h-2 rounded-full ${feature.color === "yellow" ? "bg-yellow-500" : `bg-${feature.color}-500`} mr-3`}
                      />
                      {highlight}
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Retail Operations?</h3>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of retailers across India who are already using AutoPilot Retail to optimize their
                inventory and reduce carbon footprint.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-semibold">
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
                >
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
