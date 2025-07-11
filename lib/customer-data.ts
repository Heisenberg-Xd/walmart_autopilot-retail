export function generateCustomerData() {
  return {
    user: {
      name: "Sneha Patel",
      greenPoints: 1250,
      level: 3,
      nextLevelPoints: 1500,
      carbonSaved: 15.6,
      ordersThisMonth: 8,
      ecoChoices: 72,
      leaderboardRank: 4,
    },
    recommendations: [
      {
        id: "1",
        name: "Organic Tata Tea Premium",
        price: 145,
        originalPrice: 165,
        rating: 4.8,
        ecoScore: 9,
        trending: true,
        reason: "Based on your tea preferences and eco-friendly choices",
        image: "/placeholder.svg?height=200&width=200",
        inStock: true,
        fastDelivery: true,
      },
      {
        id: "2",
        name: "Handloom Cotton Kurta Set",
        price: 1299,
        rating: 4.6,
        ecoScore: 10,
        trending: false,
        reason: "Sustainable fashion matching your style preferences",
        image: "/placeholder.svg?height=200&width=200",
        inStock: true,
        fastDelivery: false,
      },
      {
        id: "3",
        name: "Solar-Powered Phone Charger",
        price: 899,
        originalPrice: 1199,
        rating: 4.4,
        ecoScore: 8,
        trending: true,
        reason: "Tech gadgets with environmental benefits",
        image: "/placeholder.svg?height=200&width=200",
        inStock: false,
        fastDelivery: false,
      },
      {
        id: "4",
        name: "Bamboo Food Storage Set",
        price: 649,
        rating: 4.9,
        ecoScore: 9,
        trending: false,
        reason: "Perfect for your sustainable kitchen setup",
        image: "/placeholder.svg?height=200&width=200",
        inStock: true,
        fastDelivery: true,
      },
      {
        id: "5",
        name: "Ayurvedic Protein Powder",
        price: 899,
        rating: 4.5,
        ecoScore: 8,
        trending: true,
        reason: "Health and fitness with traditional Indian ingredients",
        image: "/placeholder.svg?height=200&width=200",
        inStock: true,
        fastDelivery: true,
      },
      {
        id: "6",
        name: "Neem-Based Cleaning Kit",
        price: 399,
        rating: 4.7,
        ecoScore: 10,
        trending: false,
        reason: "Natural home care essentials",
        image: "/placeholder.svg?height=200&width=200",
        inStock: true,
        fastDelivery: false,
      },
    ],
    deliverySlots: [
      {
        id: "1",
        date: "Today",
        timeRange: "6:00 PM - 8:00 PM",
        type: "express",
        carbonScore: 450,
        price: 49,
        available: true,
        greenPoints: 0,
        estimatedTime: "7:30 PM",
      },
      {
        id: "2",
        date: "Tomorrow",
        timeRange: "10:00 AM - 12:00 PM",
        type: "standard",
        carbonScore: 280,
        price: 25,
        available: true,
        greenPoints: 10,
        estimatedTime: "11:15 AM",
      },
      {
        id: "3",
        date: "Tomorrow",
        timeRange: "2:00 PM - 4:00 PM",
        type: "eco",
        carbonScore: 120,
        price: 0,
        available: true,
        greenPoints: 50,
        estimatedTime: "3:20 PM",
      },
      {
        id: "4",
        date: "Day After",
        timeRange: "9:00 AM - 11:00 AM",
        type: "eco",
        carbonScore: 95,
        price: 0,
        available: true,
        greenPoints: 40,
        estimatedTime: "10:10 AM",
      },
    ],
    trending: [
      {
        name: "Masala Chai Mix",
        price: 199,
        trendPercentage: 45,
        ecoScore: 7,
      },
      {
        name: "Steel Water Bottle",
        price: 449,
        trendPercentage: 32,
        ecoScore: 9,
      },
      {
        name: "Organic Jaggery",
        price: 89,
        trendPercentage: 28,
        ecoScore: 8,
      },
      {
        name: "Khadi Cotton Socks",
        price: 299,
        trendPercentage: 25,
        ecoScore: 9,
      },
    ],
    challenges: [
      {
        id: "1",
        title: "Eco Delivery Champion",
        description: "Choose eco-friendly delivery 5 times this week",
        progress: 3,
        target: 5,
        reward: 100,
        type: "weekly",
        completed: false,
      },
      {
        id: "2",
        title: "Green Product Explorer",
        description: "Buy 3 products with eco-score 8+",
        progress: 2,
        target: 3,
        reward: 75,
        type: "weekly",
        completed: false,
      },
      {
        id: "3",
        title: "Carbon Saver",
        description: "Save 2kg of carbon this month",
        progress: 1.6,
        target: 2,
        reward: 200,
        type: "monthly",
        completed: false,
      },
      {
        id: "4",
        title: "Daily Green Choice",
        description: "Make one eco-friendly choice today",
        progress: 1,
        target: 1,
        reward: 25,
        type: "daily",
        completed: true,
      },
    ],
    rewards: [
      {
        id: "1",
        name: "20% Off Next Order",
        description: "Get 20% discount on your next purchase",
        cost: 500,
        category: "discount",
        available: true,
      },
      {
        id: "2",
        name: "Free Jute Shopping Bag",
        description: "Handwoven jute bag made by Indian artisans",
        cost: 300,
        category: "product",
        available: true,
      },
      {
        id: "3",
        name: "Tree Planting Certificate",
        description: "Plant a tree in the Aravalli Hills through our partner NGO",
        cost: 800,
        category: "experience",
        available: true,
      },
      {
        id: "4",
        name: "Premium Organic Box",
        description: "Curated selection of organic Indian products",
        cost: 1000,
        category: "product",
        available: true,
      },
      {
        id: "5",
        name: "Free Delivery for a Month",
        description: "Unlimited free eco-friendly deliveries",
        cost: 1200,
        category: "discount",
        available: false,
      },
      {
        id: "6",
        name: "Sustainability Workshop",
        description: "Join our exclusive online sustainability masterclass",
        cost: 600,
        category: "experience",
        available: true,
      },
    ],
  }
}
