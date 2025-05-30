'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { AuthModal } from '@/components/auth/AuthModal'
import { 
  MapPin, 
  Star, 
  DollarSign, 
  Calendar, 
  TrendingUp,
  Filter,
  Heart,
  Share2,
  Compass,
  ArrowRight
} from 'lucide-react'

interface PopularPlace {
  id: string
  name: string
  country: string
  description: string
  imageUrl: string
  averageCost: number
  bestTimeToVisit: string
  popularFor: string[]
  rating: number
  continent: string
  flag: string
  highlights: string[]
  currentWeather: {
    condition: string
    temp: number
    icon: string
  }
  trendingScore: number
}

export default function PopularPlacesPage() {
  const [places, setPlaces] = useState<PopularPlace[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContinent, setSelectedContinent] = useState('All')
  const [continents, setContinents] = useState<string[]>([])
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login'
  })
  const [favorites, setFavorites] = useState<string[]>([])

  const { user } = useAuth()

  useEffect(() => {
    fetchPopularPlaces()
  }, [selectedContinent])

  const fetchPopularPlaces = async () => {
    setLoading(true)
    try {
      const continent = selectedContinent === 'All' ? '' : selectedContinent
      const response = await fetch(`/api/popular-places?continent=${continent}&limit=8`)
      const data = await response.json()
      
      setPlaces(data.destinations)
      setContinents(data.continents)
    } catch (error) {
      console.error('Error fetching popular places:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (placeId: string) => {
    if (!user) {
      setAuthModal({ isOpen: true, mode: 'login' })
      return
    }

    setFavorites(prev => 
      prev.includes(placeId) 
        ? prev.filter(id => id !== placeId)
        : [...prev, placeId]
    )
  }

  const handlePlanTrip = (place: PopularPlace) => {
    // This would integrate with your existing trip planning flow
    console.log('Planning trip to:', place.name)
    // You could redirect to your form page with pre-filled destination
    window.location.href = `/?destination=${encodeURIComponent(place.name + ', ' + place.country)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-400 to-pink-400 p-2.5 rounded-2xl">
                <Compass className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  WanderWise
                </h1>
                <p className="text-sm text-gray-500">Smart trips, wise plans</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-800 transition-colors">Home</a>
              <a href="/popular-places" className="text-gray-600 hover:text-gray-800 transition-colors border-b-2 border-orange-400 pb-1">Popular places</a>
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">Hi, {user.displayName || user.email}</span>
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setAuthModal({ isOpen: true, mode: 'login' })}
                    className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    LOGIN
                  </button>
                  <button 
                    onClick={() => setAuthModal({ isOpen: true, mode: 'register' })}
                    className="px-6 py-2.5 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    REGISTER
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Popular Destinations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the world's most loved travel destinations, curated by our AI and loved by millions of travelers
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter by continent:</span>
            </div>
            
            <div className="flex items-center space-x-2 overflow-x-auto">
              {continents.map(continent => (
                <button
                  key={continent}
                  onClick={() => setSelectedContinent(continent)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedContinent === continent
                      ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-lg'
                      : 'bg-white/60 text-gray-700 hover:bg-white/80 border border-white/40'
                  }`}
                >
                  {continent}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, idx) => (
              <div key={idx} className="bg-white/60 rounded-2xl p-4 animate-pulse">
                <div className="bg-gray-300 h-48 rounded-xl mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-gray-300 h-4 rounded"></div>
                  <div className="bg-gray-300 h-3 rounded w-3/4"></div>
                  <div className="bg-gray-300 h-3 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Places Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {places.map((place) => (
              <div key={place.id} className="bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={place.imageUrl} 
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay buttons */}
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button
                      onClick={() => toggleFavorite(place.id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                        favorites.includes(place.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/70 text-gray-600 hover:bg-white/90'
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/70 backdrop-blur-sm rounded-full text-gray-600 hover:bg-white/90 transition-all">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Weather overlay */}
                  <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <span>{place.currentWeather.icon}</span>
                    <span className="text-sm font-medium">{place.currentWeather.temp}°C</span>
                  </div>

                  {/* Trending badge */}
                  {place.trendingScore > 80 && (
                    <div className="absolute bottom-3 left-3 bg-orange-500 text-white rounded-full px-2 py-1 flex items-center space-x-1 text-xs font-medium">
                      <TrendingUp className="w-3 h-3" />
                      <span>Trending</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 flex items-center">
                        <span className="mr-2">{place.flag}</span>
                        {place.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{place.country}</p>
                    </div>
                    <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium text-yellow-700">{place.rating}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {place.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-1" />
                        Avg. daily cost
                      </span>
                      <span className="font-semibold text-gray-800">${place.averageCost}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        Best time
                      </span>
                      <span className="font-medium text-gray-700">{place.bestTimeToVisit}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {place.popularFor.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handlePlanTrip(place)}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <span>Plan Trip</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        defaultMode={authModal.mode}
      />
    </div>
  )
}