export interface TravelPreferences {
  origin: string
  destination: string
  startDate: Date
  endDate: Date
  budget: number
  travelers: number
  interests: string[]
  travelMode: 'driving' | 'walking' | 'transit' | 'bicycling'
  tripStyle: 'relaxed' | 'packed' | 'adventure' | 'cultural'
}

export interface Activity {
  id: string
  name: string
  description: string
  location: {
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  duration: number // in minutes
  timeSlot: {
    start: string // HH:MM format
    end: string
  }
  category: string
  estimatedCost?: number
  tips?: string[]
}

export interface DayPlan {
  day: number
  date: string
  theme: string // e.g., "Cultural Exploration", "Nature & Adventure"
  activities: Activity[]
  totalDistance: number
  totalTravelTime: number
  recommendedHotels: Hotel[]
  dailyBudget: number
  weatherTip?: string
}

export interface Hotel {
  id: string
  name: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  price: number
  rating: number
  amenities: string[]
  imageUrl?: string
  bookingUrl: string
}

export interface Itinerary {
  id: string
  title: string
  destination: string
  duration: number // days
  totalBudget: number
  days: DayPlan[]
  createdAt: Date
  preferences: TravelPreferences
  aiInsights: string[]
  packingList: string[]
}