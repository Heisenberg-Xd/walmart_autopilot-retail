export function generateDeliveryData() {
  return {
    driver: {
      name: "Amit Singh",
      vehicle: "Hero Electric Optima",
      zone: "South Delhi",
      completedToday: 12,
      currentLocation: { lat: 28.5355, lng: 77.391 },
    },
    metrics: {
      pendingDeliveries: 8,
      avgDeliveryTime: 18,
      rating: 4.8,
      ecoScore: 9.2,
    },
    activeRoutes: [
      {
        id: "RT-DEL-001",
        area: "Lajpat Nagar to Greater Kailash",
        progress: 65,
        completed: 4,
        remaining: 3,
        eta: "45 mins",
        totalDistance: "12.5 km",
        deliveries: [
          {
            orderId: "DEL001",
            customerName: "Sunita Agarwal",
            address: "A-45, Lajpat Nagar II",
            status: "completed",
            eta: "Delivered",
          },
          {
            orderId: "DEL002",
            customerName: "Vikram Gupta",
            address: "B-23, Greater Kailash I",
            status: "current",
            eta: "15 mins",
          },
          {
            orderId: "DEL003",
            customerName: "Meera Sharma",
            address: "C-67, Greater Kailash II",
            status: "pending",
            eta: "30 mins",
          },
          {
            orderId: "DEL004",
            customerName: "Rajesh Kumar",
            address: "D-12, Nehru Place",
            status: "pending",
            eta: "45 mins",
          },
        ],
      },
    ],
    pendingOrders: [
      {
        id: "PND001",
        customer: "Anita Desai",
        area: "Connaught Place",
        timeSlot: "2:00 PM - 4:00 PM",
        value: 850,
        priority: "urgent",
        items: 3,
      },
      {
        id: "PND002",
        customer: "Rohit Malhotra",
        area: "Karol Bagh",
        timeSlot: "4:00 PM - 6:00 PM",
        value: 1200,
        priority: "normal",
        items: 5,
      },
      {
        id: "PND003",
        customer: "Deepika Singh",
        area: "Janakpuri",
        timeSlot: "6:00 PM - 8:00 PM",
        value: 650,
        priority: "normal",
        items: 2,
      },
    ],
    routeSuggestions: [
      {
        id: "SUGG001",
        title: "Optimize Current Route",
        description: "Reorder stops to save 15 minutes and reduce fuel consumption",
        savings: "15 mins, 2.3L fuel",
        carbonReduction: "5.2 kg CO₂",
      },
      {
        id: "SUGG002",
        title: "Combine Nearby Orders",
        description: "Group 3 orders in Vasant Kunj area for efficient delivery",
        savings: "25 mins, 4.1L fuel",
        carbonReduction: "9.8 kg CO₂",
      },
    ],
  }
}
