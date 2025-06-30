"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
import { User, Mail, Phone, MapPin, Building, Calendar, Settings, Shield, Bell } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProfileData({
        personalInfo: {
          name: user?.name || "Admin User",
          email: user?.email || "admin@autopilotretail.com",
          phone: "+91 98765 43210",
          location: "Mumbai, Maharashtra",
          department: "Operations",
          role: user?.role || "System Administrator",
          joinDate: "January 15, 2023",
          employeeId: "AR-2023-001",
        },
        preferences: {
          notifications: {
            email: true,
            push: true,
            sms: false,
            inventory: true,
            predictions: true,
            alerts: true,
          },
          dashboard: {
            theme: "system",
            language: "English",
            timezone: "Asia/Kolkata",
            currency: "INR",
          },
        },
        activity: [
          {
            action: "Logged into system",
            timestamp: "2 hours ago",
            type: "login",
          },
          {
            action: "Updated inventory levels for Mumbai store",
            timestamp: "4 hours ago",
            type: "inventory",
          },
          {
            action: "Generated demand prediction report",
            timestamp: "1 day ago",
            type: "report",
          },
          {
            action: "Configured IoT sensors in Chennai store",
            timestamp: "2 days ago",
            type: "iot",
          },
          {
            action: "Reviewed eco-analytics dashboard",
            timestamp: "3 days ago",
            type: "analytics",
          },
        ],
        permissions: [
          { module: "Demand Prediction", access: "Full Access", granted: true },
          { module: "Inventory Management", access: "Full Access", granted: true },
          { module: "IoT Monitoring", access: "Full Access", granted: true },
          { module: "Smart Whisperer", access: "Full Access", granted: true },
          { module: "Eco Analytics", access: "Full Access", granted: true },
          { module: "Store Network", access: "Full Access", granted: true },
          { module: "User Management", access: "Read Only", granted: false },
          { module: "System Settings", access: "Full Access", granted: true },
        ],
      })
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage your account settings and preferences</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Profile Overview */}
        <Card className="bg-white dark:bg-gray-900 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback className="text-2xl bg-blue-600 text-white">
                  {profileData.personalInfo.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {profileData.personalInfo.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{profileData.personalInfo.role}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="h-4 w-4 mr-2" />
                    {profileData.personalInfo.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="h-4 w-4 mr-2" />
                    {profileData.personalInfo.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    {profileData.personalInfo.location}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 mb-2">Active</Badge>
                <p className="text-sm text-gray-600 dark:text-gray-400">Joined {profileData.personalInfo.joinDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800">
            <TabsTrigger value="personal">👤 Personal Info</TabsTrigger>
            <TabsTrigger value="preferences">⚙️ Preferences</TabsTrigger>
            <TabsTrigger value="activity">📊 Activity</TabsTrigger>
            <TabsTrigger value="permissions">🔐 Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card className="bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={profileData.personalInfo.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={profileData.personalInfo.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue={profileData.personalInfo.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue={profileData.personalInfo.location} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue={profileData.personalInfo.department} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input id="employeeId" defaultValue={profileData.personalInfo.employeeId} disabled />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(profileData.preferences.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-4 w-4 text-gray-400" />
                        <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                      </div>
                      <Badge variant={value ? "default" : "outline"}>{value ? "Enabled" : "Disabled"}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Dashboard Settings</CardTitle>
                  <CardDescription>Customize your dashboard experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(profileData.preferences.dashboard).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Settings className="h-4 w-4 text-gray-400" />
                        <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                      </div>
                      <Badge variant="outline">{value}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent actions and system interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {profileData.activity.map((activity: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg dark:border-gray-700">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      {activity.type === "login" && <User className="h-5 w-5 text-blue-600" />}
                      {activity.type === "inventory" && <Building className="h-5 w-5 text-green-600" />}
                      {activity.type === "report" && <Calendar className="h-5 w-5 text-purple-600" />}
                      {activity.type === "iot" && <Settings className="h-5 w-5 text-orange-600" />}
                      {activity.type === "analytics" && <Calendar className="h-5 w-5 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{activity.action}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{activity.timestamp}</p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card className="bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle>System Permissions</CardTitle>
                <CardDescription>Your access levels across different modules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {profileData.permissions.map((permission: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <Shield className={`h-5 w-5 ${permission.granted ? "text-green-600" : "text-gray-400"}`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{permission.module}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{permission.access}</p>
                      </div>
                    </div>
                    <Badge variant={permission.granted ? "default" : "outline"}>
                      {permission.granted ? "Granted" : "Restricted"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
