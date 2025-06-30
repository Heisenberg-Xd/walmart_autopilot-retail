"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/hooks/use-auth"
import { Home, Bell, Settings, LogOut, Zap, ChevronDown, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Navigation() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  if (pathname === "/auth/login") {
    return null
  }

  return (
    <nav className="border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-gray-900 dark:text-white">AutoPilot Retail</span>
                <Badge className="ml-2 bg-yellow-400 text-blue-900 text-xs">Walmart SparkAI</Badge>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {!user && (
              <>
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Sign In
                  </Button>
                </Link>
              </>
            )}

            {user && (
              <>
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                </Link>

                {/* Add dropdown menu for different modules */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      Modules
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href="/demand-prediction">Demand Prediction</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/inventory-management">Inventory Management</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/iot-monitoring">IoT Monitoring</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/smart-whisperer">Smart Whisperer</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/eco-analytics">Eco Analytics</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/store-network">Store Network</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Notifications */}
                <Link href="/notifications">
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                      3
                    </Badge>
                  </Button>
                </Link>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-sm bg-blue-600 text-white">
                          {user.avatar || user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        {user.storeCode && (
                          <Badge variant="outline" className="w-fit text-xs">
                            {user.storeCode}
                          </Badge>
                        )}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
