import { NextRequest, NextResponse } from 'next/server'

// Using REST Countries API + our curated data for popular destinations
const POPULAR_DESTINATIONS = [
  {
    id: 'tokyo-japan',
    name: 'Tokyo',
    country: 'Japan',
    description: 'A vibrant metropolis blending ultra-modern technology with ancient traditions',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    averageCost: 150,
    bestTimeToVisit: 'March-May, September-November',
    popularFor: ['Culture', 'Food', 'Technology', 'History'],
    rating: 4.8,
    continent: 'Asia',
    flag: '🇯🇵',
    highlights: [
      'Cherry blossom season',
      'World-class cuisine',
      'Ancient temples and modern skyscrapers',
      'Unique cultural experiences'
    ]
  },
  {
    id: 'paris-france',
    name: 'Paris',
    country: 'France',
    description: 'The City of Light, renowned for its art, fashion, gastronomy and culture',
    imageUrl: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&q=80',
    averageCost: 120,
    bestTimeToVisit: 'April-June, September-October',
    popularFor: ['Art', 'Romance', 'Fashion', 'History'],
    rating: 4.7,
    continent: 'Europe',
    flag: '🇫🇷',
    highlights: [
      'Eiffel Tower and iconic landmarks',
      'World-class museums like the Louvre',
      'Charming neighborhoods and cafés',
      'Fashion and shopping paradise'
    ]
  },
  {
    id: 'bali-indonesia',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise known for its beaches, temples, and spiritual retreats',
    imageUrl: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80',
    averageCost: 80,
    bestTimeToVisit: 'April-October',
    popularFor: ['Beaches', 'Spirituality', 'Nature', 'Adventure'],
    rating: 4.6,
    continent: 'Asia',
    flag: '🇮🇩',
    highlights: [
      'Stunning beaches and surf spots',
      'Ancient Hindu temples',
      'Lush rice terraces and volcanoes',
      'Yoga and wellness retreats'
    ]
  },
  {
    id: 'new-york-usa',
    name: 'New York City',
    country: 'United States',
    description: 'The city that never sleeps, a global hub of culture, finance, and entertainment',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
    averageCost: 180,
    bestTimeToVisit: 'April-June, September-November',
    popularFor: ['Entertainment', 'Shopping', 'Art', 'Food'],
    rating: 4.5,
    continent: 'North America',
    flag: '🇺🇸',
    highlights: [
      'Iconic skyline and Central Park',
      'Broadway shows and world-class museums',
      'Diverse neighborhoods and cuisine',
      'Shopping and nightlife'
    ]
  },
  {
    id: 'london-uk',
    name: 'London',
    country: 'United Kingdom',
    description: 'Historic capital city rich in royal heritage, museums, and cultural landmarks',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    averageCost: 140,
    bestTimeToVisit: 'May-September',
    popularFor: ['History', 'Culture', 'Royal Heritage', 'Theatre'],
    rating: 4.4,
    continent: 'Europe',
    flag: '🇬🇧',
    highlights: [
      'Buckingham Palace and royal attractions',
      'World-class museums and galleries',
      'Historic landmarks like Big Ben',
      'Vibrant theatre and pub culture'
    ]
  },
  {
    id: 'rome-italy',
    name: 'Rome',
    country: 'Italy',
    description: 'The Eternal City, where ancient history meets Renaissance art and modern life',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    averageCost: 110,
    bestTimeToVisit: 'April-June, September-October',
    popularFor: ['History', 'Art', 'Food', 'Architecture'],
    rating: 4.6,
    continent: 'Europe',
    flag: '🇮🇹',
    highlights: [
      'Colosseum and ancient Roman ruins',
      'Vatican City and Sistine Chapel',
      'Incredible Italian cuisine',
      'Beautiful fountains and piazzas'
    ]
  },
  {
    id: 'barcelona-spain',
    name: 'Barcelona',
    country: 'Spain',
    description: 'Vibrant coastal city famous for Gaudí architecture, beaches, and nightlife',
    imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',
    averageCost: 100,
    bestTimeToVisit: 'May-September',
    popularFor: ['Architecture', 'Beaches', 'Art', 'Nightlife'],
    rating: 4.5,
    continent: 'Europe',
    flag: '🇪🇸',
    highlights: [
      'Sagrada Familia and Gaudí masterpieces',
      'Beautiful Mediterranean beaches',
      'Vibrant food and nightlife scene',
      'Gothic Quarter and Park Güell'
    ]
  },
  {
    id: 'amsterdam-netherlands',
    name: 'Amsterdam',
    country: 'Netherlands',
    description: 'Charming canal city known for its historic architecture, art museums, and bike culture',
    imageUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80',
    averageCost: 130,
    bestTimeToVisit: 'April-September',
    popularFor: ['Canals', 'Art', 'History', 'Cycling'],
    rating: 4.4,
    continent: 'Europe',
    flag: '🇳🇱',
    highlights: [
      'Picturesque canals and houseboats',
      'Van Gogh Museum and Rijksmuseum',
      'Bike-friendly city culture',
      'Vibrant tulip season'
    ]
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const continent = searchParams.get('continent')
    const limit = parseInt(searchParams.get('limit') || '8')

    let filteredDestinations = POPULAR_DESTINATIONS

    // Filter by continent if specified
    if (continent && continent !== 'all') {
      filteredDestinations = POPULAR_DESTINATIONS.filter(
        dest => dest.continent.toLowerCase() === continent.toLowerCase()
      )
    }

    // Sort by rating (highest first)
    filteredDestinations = filteredDestinations
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)

    // Add some dynamic data (simulating real-time updates)
    const enrichedDestinations = filteredDestinations.map(dest => ({
      ...dest,
      currentWeather: generateWeatherData(dest.name),
      trendingScore: Math.floor(Math.random() * 100) + 50, // 50-149
      lastUpdated: new Date().toISOString()
    }))

    return NextResponse.json({
      destinations: enrichedDestinations,
      total: filteredDestinations.length,
      continents: ['All', 'Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania']
    })

  } catch (error) {
    console.error('Popular places API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch popular places' },
      { status: 500 }
    )
  }
}

// Helper function to generate mock weather data
function generateWeatherData(cityName: string) {
  const weatherOptions = [
    { condition: 'Sunny', temp: 25, icon: '☀️' },
    { condition: 'Partly Cloudy', temp: 22, icon: '⛅' },
    { condition: 'Cloudy', temp: 18, icon: '☁️' },
    { condition: 'Rainy', temp: 15, icon: '🌧️' }
  ]
  
  // Use city name to generate consistent weather (not truly random)
  const index = cityName.length % weatherOptions.length
  return weatherOptions[index]
}