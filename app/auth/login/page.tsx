"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Store, Users, Shield, Truck } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    storeCode: "",
    email: "",
    password: "",
    userType: "customer",
  })

  const router = useRouter()
  const { login } = useAuth()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock authentication logic
      const success = await login(formData)

      if (success) {
        toast({
          title: "Login Successful! 🎉",
          description: `Welcome back! Redirecting to ${formData.userType} dashboard...`,
        })

        // Redirect based on user type
        setTimeout(() => {
          if (formData.userType === "admin") {
            router.push("/admin")
          } else if (formData.userType === "store") {
            router.push("/store")
          } else if (formData.userType === "delivery") {
            router.push("/delivery")
          } else {
            router.push("/customer")
          }
        }, 1000)
      }
    } catch (error) {
      toast({
        title: "Login Failed ❌",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const demoCredentials = {
    admin: { email: "admin@autopilot.in", password: "admin123", storeCode: "HQ001" },
    store: { email: "store@autopilot.in", password: "store123", storeCode: "MUM001" },
    delivery: { email: "delivery@autopilot.in", password: "delivery123", storeCode: "DEL002" },
    customer: { email: "customer@autopilot.in", password: "customer123", storeCode: "" },
  }

  const fillDemoCredentials = (type: keyof typeof demoCredentials) => {
    setFormData({
      ...demoCredentials[type],
      userType: type,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mb-4">
            <Store className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AutoPilot Retail</h1>
          <p className="text-gray-600 dark:text-gray-300">Smart Retail Management System</p>
          <Badge variant="outline" className="mt-2">
            🇮🇳 Made in India
          </Badge>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={formData.userType} onValueChange={(value) => setFormData({ ...formData, userType: value })}>
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="customer" className="text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  Customer
                </TabsTrigger>
                <TabsTrigger value="store" className="text-xs">
                  <Store className="h-3 w-3 mr-1" />
                  Store
                </TabsTrigger>
                <TabsTrigger value="delivery" className="text-xs">
                  <Truck className="h-3 w-3 mr-1" />
                  Delivery
                </TabsTrigger>
                <TabsTrigger value="admin" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  Admin
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleLogin} className="space-y-4">
                {formData.userType !== "customer" && (
                  <div className="space-y-2">
                    <Label htmlFor="storeCode">Store Code</Label>
                    <Input
                      id="storeCode"
                      placeholder="e.g., MUM001, DEL002"
                      value={formData.storeCode}
                      onChange={(e) => setFormData({ ...formData, storeCode: e.target.value })}
                      required={formData.userType !== "customer"}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm font-medium mb-3 text-center">🚀 Quick Demo Access</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(demoCredentials).map(([type, creds]) => (
                    <Button
                      key={type}
                      variant="outline"
                      size="sm"
                      onClick={() => fillDemoCredentials(type as keyof typeof demoCredentials)}
                      className="text-xs"
                    >
                      {type === "admin" && <Shield className="h-3 w-3 mr-1" />}
                      {type === "store" && <Store className="h-3 w-3 mr-1" />}
                      {type === "delivery" && <Truck className="h-3 w-3 mr-1" />}
                      {type === "customer" && <Users className="h-3 w-3 mr-1" />}
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">Secure • Fast • Reliable</p>
      </div>
    </div>
  )
}
