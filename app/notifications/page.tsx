"use client"

import { useState, useEffect } from "react"

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "critical",
      title: "Critical Stock Alert",
      message: "Cotton Kurta inventory critically low in Bengaluru Koramangala store",
      timestamp: "2 minutes ago",
      read: false,
      category: "inventory"
    },
    {
      id: 2,
      type: "warning",
      title: "Temperature Alert",
      message: "Freezer temperature exceeded threshold in Mumbai Bandra cold storage",
      timestamp: "15 minutes ago",
      read: false,
      category: "iot"
    },
    {
      id: 3,
      type: "info",
      title: "AI Prediction Update",
      message: "New demand prediction available for umbrella sales in Mumbai region",
      timestamp: "1 hour ago",
      read: true,
      category: "ai"
    },
    {
      id: 4,
      type: "success",
      title: "Delivery Completed",
      message: "Bulk inventory transfer to Delhi CP store completed successfully",
      timestamp: "2 hours ago",
      read: true,
      category: "delivery"
    },
    {
      id: 5,
      type: "warning",
      title: "High Demand Alert",
      message: "Unexpected surge in milk demand detected in Chennai T.Nagar",
      timestamp: "3 hours ago",
      read: false,
      category: "demand"
    },
    {
      id: 6,
      type: "info",
      title: "System Update",
      message: "Smart Whisperer AI model updated with latest market trends",
      timestamp: "5 hours ago",
      read: true,
      category: "system"
    }
  ])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  if (loading) {
    return <div className="p-4 text-center">Loading notifications...</div>
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`border-l-4 p-4 rounded shadow-sm ${
            notif.read ? "bg-gray-100 text-gray-500" : "bg-white"
          } ${
            notif.type === "critical" ? "border-red-600" :
            notif.type === "warning" ? "border-yellow-500" :
            notif.type === "success" ? "border-green-500" :
            "border-blue-400"
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-semibold">{notif.title}</h2>
              <p className="text-sm">{notif.message}</p>
              <p className="text-xs mt-1 text-gray-400">{notif.timestamp}</p>
            </div>
            {!notif.read && (
              <button
                onClick={() => markAsRead(notif.id)}
                className="text-sm text-blue-500 hover:underline"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
