"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WalmartSidebar } from "@/components/walmart-sidebar"
import { AIChatbot } from "@/components/ai-chatbot"
import { Brain, Lightbulb, TrendingUp, Target, Zap, MessageSquare, Send } from "lucide-react"

export default function SmartWhispererPage() {
  const [loading, setLoading] = useState(true)
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    {
      type: "ai",
      message:
        "Hello! I'm your Smart Inventory Whisperer. I can help you with demand predictions, inventory optimization, and strategic insights. What would you like to know?",
      timestamp: "Just now",
    },
  ])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    // Add user message
    const newUserMessage = {
      type: "user",
      message: chatMessage,
      timestamp: "Just now",
    }

    // Simulate AI response
    const aiResponses = [
      "Based on current trends, I recommend increasing umbrella stock by 40% in Mumbai stores due to monsoon predictions.",
      "Your cotton kurta inventory in Bengaluru is running low. Historical data shows 25% increase in demand during this period.",
      "I've detected a pattern: milk sales spike 15% on weekends in Delhi. Consider adjusting your weekend inventory.",
      "Temperature sensors indicate optimal storage conditions. Your fresh produce should maintain quality for 2-3 more days.",
      "Cross-selling opportunity: Customers buying salt often purchase cooking oil. Consider bundling these items.",
    ]

    const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
    const newAiMessage = {
      type: "ai",
      message: randomResponse,
      timestamp: "Just now",
    }

    setChatHistory((prev) => [...prev, newUserMessage, newAiMessage])
    setChatMessage("")
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <WalmartSidebar userType="admin" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading Smart Whisperer...</p>
          </div>
        </div>
      </div>
    )
  }

  const insights = [
    {
      title: "Demand Surge Alert",
      description: "Umbrella demand predicted to increase 3x in Mumbai due to weather patterns",
      confidence: 94,
      action: "Increase stock by 200%",
      priority: "high",
      category: "Weather-based",
    },
    {
      title: "Cross-selling Opportunity",
      description: "Customers buying Tata Salt also purchase Cooking Oil 78% of the time",
      confidence: 87,
      action: "Create bundle offers",
      priority: "medium",
      category: "Behavioral",
    },
    {
      title: "Inventory Optimization",
      description: "Cotton clothing moving 25% faster than synthetic in Bengaluru",
      confidence: 91,
      action: "Adjust inventory mix",
      priority: "medium",
      category: "Trend Analysis",
    },
    {
      title: "Seasonal Pattern",
      description: "Festival season approaching - traditional wear demand will spike",
      confidence: 89,
      action: "Prepare festival inventory",
      priority: "high",
      category: "Seasonal",
    },
  ]

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <WalmartSidebar userType="admin" />

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Smart Inventory Whisperer</h1>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-purple-600 text-white">
                    <Brain className="h-3 w-3 mr-1" />
                    AI-Powered Insights
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Learning Mode Active
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">127</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Insights Generated Today</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
                <Lightbulb className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-purple-100">Generated today</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
                <Target className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-blue-100">Prediction accuracy</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Actions Taken</CardTitle>
                <TrendingUp className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-green-100">Recommendations implemented</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
                <Zap className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹3.2L</div>
                <p className="text-xs text-orange-100">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="insights" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-gray-800">
              <TabsTrigger value="insights">💡 Smart Insights</TabsTrigger>
              <TabsTrigger value="chat">💬 AI Chat</TabsTrigger>
              <TabsTrigger value="analytics">📊 Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Latest AI Insights</CardTitle>
                  <CardDescription>Smart recommendations based on real-time data analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                            <Brain className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">{insight.title}</h3>
                            <Badge variant="outline" className="text-xs mt-1">
                              {insight.category}
                            </Badge>
                          </div>
                        </div>
                        <Badge
                          className={
                            insight.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : insight.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {insight.priority} priority
                        </Badge>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-3">{insight.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-sm">
                            <span className="font-medium">Confidence:</span> {insight.confidence}%
                          </div>
                          <div className="text-sm text-blue-600 dark:text-blue-400">
                            <span className="font-medium">Recommended Action:</span> {insight.action}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Dismiss
                          </Button>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            Implement
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900 h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Chat with Smart Whisperer
                  </CardTitle>
                  <CardDescription>
                    Ask questions about inventory, demand patterns, or get strategic advice
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {chatHistory.map((chat, index) => (
                      <div key={index} className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            chat.type === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                          }`}
                        >
                          <p>{chat.message}</p>
                          <p className={`text-xs mt-1 ${chat.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                            {chat.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask the Smart Whisperer anything..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Insight Performance</CardTitle>
                    <CardDescription>How well our AI predictions perform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">94.2%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Overall Accuracy</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Demand Predictions</span>
                          <span>96.8%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Trend Analysis</span>
                          <span>92.4%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Cross-selling Insights</span>
                          <span>89.7%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle>Business Impact</CardTitle>
                    <CardDescription>Measurable results from AI insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">₹3.2L</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Cost Savings This Month</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Inventory Optimization</span>
                          <span>₹1.8L</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Demand Accuracy</span>
                          <span>₹0.9L</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Cross-selling Revenue</span>
                          <span>₹0.5L</span>
                        </div>
                      </div>
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
