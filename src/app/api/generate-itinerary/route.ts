import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

// Utility function to calculate days between dates
function calculateDays(startDate: Date, endDate: Date): number {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Dummy hotel data generator
function generateDummyHotels(destination: string, dayIndex: number) {
  const hotelTemplates = [
    {
      luxury: { priceRange: [200, 400], amenities: ['Spa', 'Fine Dining', 'City Views', 'Concierge'] },
      mid: { priceRange: [80, 150], amenities: ['WiFi', 'Fitness Center', 'Restaurant', 'Room Service'] },
      budget: { priceRange: [30, 70], amenities: ['WiFi', 'Shared Bath', 'Breakfast', 'Clean Rooms'] }
    }
  ]

  const destinationHotels = {
    tokyo: [
      { name: 'Park Hyatt Tokyo', type: 'luxury', address: '3-7-1-2 Nishi Shinjuku, Tokyo' },
      { name: 'Hotel Gracery Shinjuku', type: 'mid', address: '1-19-1 Kabukicho, Shinjuku' },
      { name: 'Capsule Hotel Anshin Oyado', type: 'budget', address: '2-1-1 Kabukicho, Shinjuku' }
    ],
    paris: [
      { name: 'The Ritz Paris', type: 'luxury', address: '15 Place Vendôme, 75001 Paris' },
      { name: 'Hotel Malte Opera', type: 'mid', address: '63 Rue de Richelieu, 75002 Paris' },
      { name: 'Hotel Jeanne d\'Arc', type: 'budget', address: '3 Rue de Jarente, 75004 Paris' }
    ],
    bali: [
      { name: 'The Mulia Resort', type: 'luxury', address: 'Jl. Raya Nusa Dua Selatan, Bali' },
      { name: 'Puri Saron Hotel', type: 'mid', address: 'Jl. Danau Tamblingan, Sanur' },
      { name: 'Puri Garden Hotel', type: 'budget', address: 'Jl. Raya Ubud, Ubud' }
    ]
  }

  const destKey = destination.toLowerCase().includes('tokyo') ? 'tokyo' :
                  destination.toLowerCase().includes('paris') ? 'paris' :
                  destination.toLowerCase().includes('bali') ? 'bali' : 'tokyo'

  return destinationHotels[destKey as keyof typeof destinationHotels].map((hotel, idx) => {
    const template = hotelTemplates[0][hotel.type as keyof typeof hotelTemplates[0]]
    const price = Math.floor(Math.random() * (template.priceRange[1] - template.priceRange[0])) + template.priceRange[0]
    
    return {
      id: `hotel-${dayIndex}-${idx}`,
      name: hotel.name,
      address: hotel.address,
      coordinates: { lat: 0, lng: 0 }, // Dummy coordinates
      price,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 to 5.0 rating
      amenities: template.amenities,
      bookingUrl: `https://booking.com/search?dest=${encodeURIComponent(hotel.name)}`
    }
  })
}

interface Activity {
  name: string
  description: string
  location: string
  timeSlot: {
    start: string
    end: string
  }
  category: 'sightseeing' | 'food' | 'entertainment' | 'culture' | 'nature' | 'shopping' | 'adventure'
  estimatedCost: number
  tips: string[]
}

interface Day {
  day: number
  theme: string
  activities: Activity[]
  dailyBudget: number
  weatherTip: string
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set')
      return NextResponse.json(
        {
          error: 'API configuration error',
          details: 'Gemini API key is not configured',
          type: 'configuration_error'
        },
        { status: 500 }
      )
    }

    const preferences = await request.json()

    // Validate required fields - check for destination and numberOfDays
    if (!preferences.destination || !preferences.numberOfDays || preferences.numberOfDays < 1) {
      console.error('Validation failed: Missing destination or invalid numberOfDays', preferences);
      return NextResponse.json(
        {
          error: 'Invalid request',
          details: 'Missing required fields: destination or numberOfDays', // Updated error detail
          type: 'validation_error'
        },
        { status: 400 }
      )
    }

    // Calculate trip duration using numberOfDays directly
    const days = preferences.numberOfDays
    // Remove startDate and endDate as they are no longer needed for duration calculation
    // const startDate = new Date(preferences.startDate)
    // const endDate = new Date(preferences.endDate)
    // const days = calculateDays(startDate, endDate)

    console.log('Generating itinerary with preferences:', {
      destination: preferences.destination,
      days: days, // Use the calculated days
      budget: preferences.budget,
      travelers: preferences.travelers,
      currency: preferences.currency, // Added currency to log
      timezone: preferences.timezone // Added timezone to log
    })

    // Create detailed prompt for Gemini AI
    const systemPrompt = `
      You are WanderWise, an expert AI travel planner that creates amazing, personalized travel experiences.
      You understand local culture, hidden gems, optimal timing, and budget considerations.

      Create a detailed JSON itinerary with this EXACT structure:
      {
        "title": "Catchy trip title (e.g., 'Magical Tokyo Adventure')",
        "aiInsights": [
          "3-4 key insights about the destination",
          "Local tips and cultural insights",
          "Best timing and seasonal advice",
          "Money-saving tips specific to this destination"
        ],
        "packingList": [
          "Essential items based on activities and weather",
          "Destination-specific items",
          "Technology and practical items",
          "Clothing recommendations"
        ],
        "days": [
          {
            "day": 1,
            "theme": "Day theme (e.g., 'Cultural Immersion', 'Urban Exploration')",
            "activities": [
              {
                "name": "Specific place/activity name",
                "description": "Engaging 2-3 sentence description with local context and why it's special",
                "location": "Full address with district/area and city",
                "timeSlot": { "start": "09:00", "end": "11:30" },
                "category": "sightseeing|food|entertainment|culture|nature|shopping|adventure",
                "estimatedCost": 25,
                "tips": [
                  "Local insider tip or hack",
                  "Best photo spots or timing",
                  "What to avoid or be careful about"
                ]
              }
            ],
            "dailyBudget": 120,
            "weatherTip": "Weather-appropriate advice and seasonal considerations"
          }
        ]
      }

      IMPORTANT GUIDELINES:
      - Plan for exactly ${days} days.
      - Consider a total budget of ${preferences.budget} ${preferences.currency}.
      - Include 4-6 activities per day based on trip style
      - Provide REAL, specific addresses and locations
      - Consider realistic travel times between locations
      - Include diverse activity types (sightseeing, food, culture, etc.)
      - Add local insights and cultural context
      - Balance indoor/outdoor activities
      - Consider meal times and local dining customs
      - Stay within budget while maximizing experience
      - Include hidden gems alongside popular attractions
      - Make descriptions engaging and informative
      - Ensure activities match the traveler's interests
      - Consider the trip style (relaxed, packed, adventure, cultural)
      - Consider the timezone ${preferences.timezone} for planning daily activities.
    `

    const userPrompt = `
      Plan an incredible ${days}-day trip to ${preferences.destination} for ${preferences.travelers} travelers.

      Trip Details:
      - Budget: ${preferences.budget} ${preferences.currency} total
      - Trip style: ${preferences.tripStyle}
      - Interests: ${preferences.interests.join(', ')}
      - Travel mode: ${preferences.travelMode}
      - Duration: ${days} days

      Create a ${preferences.tripStyle} itinerary that maximizes their interests while staying within the budget of ${preferences.budget} ${preferences.currency}.
      Include local experiences, authentic dining, and optimal timing for each activity, considering the ${preferences.timezone} timezone.
      Make it feel like a local expert planned their trip!

      Focus especially on: ${preferences.interests.slice(0, 3).join(', ')} activities.

      Return ONLY the JSON response with no additional text or formatting.
    `

    console.log('Sending request to Gemini AI...')

    // Generate content with Gemini AI
    const result = await model.generateContent([
      { text: systemPrompt },
      { text: userPrompt }
    ])

    const response = result.response.text()
    console.log('Gemini AI response received')

    // Clean the response to ensure it's valid JSON
    const cleanedResponse = response
      .replace(/```json\n?/g, '')
      .replace(/```\n?$/g, '')
      .replace(/^\s*[\r\n]/gm, '') // Remove empty lines
      .trim()

    let aiItinerary
    try {
      aiItinerary = JSON.parse(cleanedResponse)
    } catch (parseError) {
      console.error('JSON parsing error:', parseError)
      console.log('Raw response:', response) // Log raw response for debugging
      return NextResponse.json(
        {
          error: 'Failed to parse AI response',
          details: 'Invalid JSON format received from AI',
          type: 'parsing_error',
          rawResponse: response // Include raw response in error for debugging
        },
        { status: 500 }
      )
    }

    // Process each day and add dummy hotel data (still using mock data for now)
    const processedDays = aiItinerary.days.map((day: Day, index: number) => {
      // Add unique IDs to activities
      const processedActivities = day.activities.map((activity: Activity, actIndex: number) => ({
        id: `day-${index}-activity-${actIndex}`,
        name: activity.name,
        description: activity.description,
        location: {
          address: activity.location,
          coordinates: { lat: 0, lng: 0 } // Dummy coordinates
        },
        duration: 120, // Default 2 hours
        timeSlot: activity.timeSlot,
        category: activity.category,
        estimatedCost: activity.estimatedCost || 0,
        tips: activity.tips || [],
      }))

      // Generate dummy hotels for this day
      // Note: This still uses mock data based on hardcoded destinations
      const recommendedHotels = generateDummyHotels(preferences.destination, index)

      // Calculate day statistics
      // We no longer have startDate and endDate here, so date will be generic Day 1, Day 2 etc.
      // If actual dates are needed, we would need to derive them from a single start date and numberOfDays
      const currentDate = `Day ${index + 1}` // Use generic Day X for now
      // const currentDate = new Date(startDate)
      // currentDate.setDate(startDate.getDate() + index)

      return {
        day: index + 1,
        date: currentDate, // Use generic date string
        theme: day.theme || `Day ${index + 1} Adventure`,
        activities: processedActivities,
        totalDistance: Math.random() * 20 + 5, // Mock data - 5-25 miles
        totalTravelTime: Math.random() * 60 + 30, // Mock data - 30-90 minutes
        recommendedHotels,
        dailyBudget: day.dailyBudget || Math.floor(preferences.budget / days),
        weatherTip: day.weatherTip || "Check local weather before heading out!",
      }
    })

    // Create final itinerary object
    const itinerary = {
      id: `wanderwise-${Date.now()}`,
      title: aiItinerary.title || `Amazing ${preferences.destination} Adventure`,
      destination: preferences.destination,
      duration: days,
      totalBudget: preferences.budget,
      days: processedDays,
      createdAt: new Date(),
      preferences: preferences, // Include full preferences sent to API
      aiInsights: aiItinerary.aiInsights || [
        "Your AI travel assistant has optimized this itinerary for your preferences",
        "Local recommendations included based on cultural insights",
        "Budget-friendly options prioritized throughout your journey",
        "Timing optimized to avoid crowds and maximize experiences"
      ],
      packingList: aiItinerary.packingList || [
        "Comfortable walking shoes",
        "Weather-appropriate clothing",
        "Portable charger",
        "Camera or smartphone",
        "Travel documents and copies"
      ],
    }

    console.log('Itinerary generated successfully')
    return NextResponse.json(itinerary)

  } catch (error) {
    console.error('API Error:', error)

    // Return more specific error information
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: 'Failed to generate itinerary',
          details: error.message,
          type: 'generation_error'
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        error: 'An unexpected error occurred',
        details: 'Unknown error during itinerary generation',
        type: 'unknown_error'
      },
      { status: 500 }
    )
  }
}