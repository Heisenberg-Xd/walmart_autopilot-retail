"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  userType: "admin" | "store" | "delivery" | "customer"
  storeCode?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (credentials: any) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem("autopilot_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials: any): Promise<boolean> => {
    try {
      // Mock authentication - in real app, this would be an API call
      const mockUsers = {
        "admin@autopilot.in": {
          id: "1",
          name: "Rajesh Kumar",
          email: "admin@autopilot.in",
          userType: "admin" as const,
          storeCode: "HQ001",
          avatar: "👨‍💼",
        },
        "store@autopilot.in": {
          id: "2",
          name: "Priya Sharma",
          email: "store@autopilot.in",
          userType: "store" as const,
          storeCode: "MUM001",
          avatar: "👩‍💼",
        },
        "delivery@autopilot.in": {
          id: "3",
          name: "Amit Singh",
          email: "delivery@autopilot.in",
          userType: "delivery" as const,
          storeCode: "DEL002",
          avatar: "🚛",
        },
        "customer@autopilot.in": {
          id: "4",
          name: "Sneha Patel",
          email: "customer@autopilot.in",
          userType: "customer" as const,
          avatar: "👩‍🦱",
        },
      }

      const user = mockUsers[credentials.email as keyof typeof mockUsers]

      if (user && credentials.password) {
        setUser(user)
        localStorage.setItem("autopilot_user", JSON.stringify(user))
        return true
      }

      return false
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("autopilot_user")
    router.push("/auth/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
