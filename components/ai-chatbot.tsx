"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, X, Bot, User, TrendingUp, Package, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  suggestions?: string[]
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm your AutoPilot AI assistant. I can help you with order tracking, inventory insights, demand predictions, and more. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "Where is my order?",
        "What's trending in Mumbai?",
        "Show inventory alerts",
        "Explain this dashboard",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Order tracking
    if (message.includes("order") || message.includes("track")) {
      return "🚚 Your recent orders:\n\n• Order #WM2024001 - Out for delivery (ETA: 2:30 PM)\n• Order #WM2024002 - Preparing at store\n\nWould you like detailed tracking for any specific order?"
    }

    // Trending/demand queries
    if (message.includes("trending") || message.includes("demand") || message.includes("popular")) {
      const cities = ["Mumbai", "Delhi", "Bengaluru", "Chennai", "Pune"]
      const city = cities.find((c) => message.includes(c.toLowerCase())) || "your area"
      return `📈 Trending in ${city} this week:\n\n• Monsoon essentials (+45% demand)\n• Organic products (+32% demand)\n• Home appliances (+28% demand)\n\nThis is based on our AI demand prediction model with 94% accuracy.`
    }

    // Inventory queries
    if (message.includes("inventory") || message.includes("stock") || message.includes("alert")) {
      return "📦 Current inventory alerts:\n\n🔴 Critical: Tata Salt (Mumbai stores)\n🟡 Low: Umbrellas (Chennai region)\n🟢 Optimal: Most other items\n\nWould you like me to suggest rebalancing actions?"
    }

    // Dashboard explanations
    if (
      message.includes("dashboard") ||
      message.includes("explain") ||
      message.includes("red zone") ||
      message.includes("metric")
    ) {
      return "📊 Dashboard insights:\n\n• Red zones indicate critical stock levels requiring immediate attention\n• Green metrics show optimal performance\n• AI predictions are updated every 15 minutes\n\nWhich specific metric would you like me to explain in detail?"
    }

    // Carbon/eco queries
    if (message.includes("carbon") || message.includes("eco") || message.includes("green")) {
      return "🌱 Sustainability metrics:\n\n• 32% carbon reduction this month\n• 68% of deliveries use eco-friendly routes\n• 2.4 tons CO₂ saved through optimization\n\nYour green choices are making a real impact!"
    }

    // Default response
    return "I understand you're asking about retail operations. I can help with:\n\n• 📦 Order tracking and status\n• 📈 Demand trends and predictions\n• 🏪 Inventory management\n• 🌱 Sustainability metrics\n• 📊 Dashboard explanations\n\nWhat specific information do you need?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: generateBotResponse(inputValue),
        timestamp: new Date(),
        suggestions: ["Tell me more", "Show detailed view", "What else can you help with?", "Export this data"],
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-blue-600 hover:bg-blue-700",
          isOpen && "hidden",
        )}
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col bg-white dark:bg-gray-900">
          {/* Header */}
          <CardHeader className="bg-blue-600 text-white rounded-t-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                  <Bot className="h-4 w-4 text-blue-900" />
                </div>
                <div>
                  <CardTitle className="text-lg">AutoPilot AI</CardTitle>
                  <p className="text-blue-100 text-sm">Walmart SparkAI Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-700 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex", message.type === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
                  )}
                >
                  <div className="flex items-start">
                    {message.type === "bot" && <Bot className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />}
                    {message.type === "user" && <User className="h-4 w-4 mr-2 mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>

                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="mt-3 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 mr-1 mb-1 bg-transparent"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center">
                    <Bot className="h-4 w-4 mr-2 text-blue-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about orders, trends, inventory..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleSuggestionClick("Show trending products")}
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                Trends
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleSuggestionClick("Check inventory alerts")}
              >
                <Package className="h-3 w-3 mr-1" />
                Inventory
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleSuggestionClick("Track my orders")}
              >
                <MapPin className="h-3 w-3 mr-1" />
                Orders
              </Badge>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
