"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Package,
  TrendingUp,
  MapPin,
  Users,
  Brain,
  Zap,
  Leaf,
  Store,
  Truck,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Bell,
  User,
} from "lucide-react"

interface SidebarProps {
  userType: "admin" | "store" | "delivery" | "customer"
}

export function WalmartSidebar({ userType }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const getMenuItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        icon: BarChart3,
        href: `/${userType}`,
        badge: null,
      },
    ]

    switch (userType) {
      case "admin":
        return [
          ...baseItems,
          {
            title: "Demand Prediction",
            icon: TrendingUp,
            href: "/demand-prediction",
            badge: "AI",
          },
          {
            title: "Inventory Management",
            icon: Package,
            href: "/inventory-management",
            badge: null,
          },
          {
            title: "IoT Monitoring",
            icon: Wifi,
            href: "/iot-monitoring",
            badge: "Live",
          },
          {
            title: "Smart Whisperer",
            icon: Brain,
            href: "/smart-whisperer",
            badge: "New",
          },
          {
            title: "Eco Analytics",
            icon: Leaf,
            href: "/eco-analytics",
            badge: null,
          },
          {
            title: "Store Network",
            icon: Store,
            href: "/store-network",
            badge: null,
          },
          {
            title: "Notifications",
            icon: Bell,
            href: "/notifications",
            badge: "3",
          },
          {
            title: "Profile",
            icon: User,
            href: "/profile",
            badge: null,
          },
        ]
      case "store":
        return [
          ...baseItems,
          {
            title: "Inventory",
            icon: Package,
            href: "/inventory-management",
            badge: null,
          },
          {
            title: "IoT Sensors",
            icon: Wifi,
            href: "/iot-monitoring",
            badge: "Live",
          },
          {
            title: "Local Demand",
            icon: TrendingUp,
            href: "/demand-prediction",
            badge: null,
          },
          {
            title: "Orders",
            icon: Users,
            href: "/store/orders",
            badge: null,
          },
          {
            title: "Performance",
            icon: BarChart3,
            href: "/store/performance",
            badge: null,
          },
          {
            title: "Notifications",
            icon: Bell,
            href: "/notifications",
            badge: "2",
          },
          {
            title: "Profile",
            icon: User,
            href: "/profile",
            badge: null,
          },
        ]
      case "delivery":
        return [
          ...baseItems,
          {
            title: "Active Routes",
            icon: MapPin,
            href: "/delivery/routes",
            badge: null,
          },
          {
            title: "Pending Orders",
            icon: Package,
            href: "/delivery/orders",
            badge: null,
          },
          {
            title: "Route Optimizer",
            icon: Zap,
            href: "/delivery/optimizer",
            badge: "AI",
          },
          {
            title: "Eco Delivery",
            icon: Leaf,
            href: "/eco-analytics",
            badge: null,
          },
          {
            title: "Notifications",
            icon: Bell,
            href: "/notifications",
            badge: "1",
          },
          {
            title: "Profile",
            icon: User,
            href: "/profile",
            badge: null,
          },
        ]
      default:
        return [
          ...baseItems,
          {
            title: "Recommendations",
            icon: Brain,
            href: "/customer/recommendations",
            badge: "AI",
          },
          {
            title: "Smart Delivery",
            icon: Truck,
            href: "/customer/delivery",
            badge: null,
          },
          {
            title: "Green Rewards",
            icon: Leaf,
            href: "/eco-analytics",
            badge: null,
          },
          {
            title: "Notifications",
            icon: Bell,
            href: "/notifications",
            badge: "5",
          },
          {
            title: "Profile",
            icon: User,
            href: "/profile",
            badge: null,
          },
        ]
    }
  }

  const menuItems = getMenuItems()

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg text-gray-900 dark:text-white">AutoPilot</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{userType} Portal</p>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                collapsed ? "px-2" : "px-3",
                pathname === item.href && "bg-blue-600 text-white hover:bg-blue-700",
              )}
            >
              <item.icon className={cn("h-4 w-4", collapsed ? "" : "mr-3")} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      
    </div>
  )
}
