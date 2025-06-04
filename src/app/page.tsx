'use client'

import { useState } from 'react'
import { TravelPreferences, Itinerary } from '@/types'
import { ItineraryDisplay } from '@/components/itinerary/ItineraryDisplay'
import { AuthModal } from '@/components/auth/AuthModal'
import { useAuth } from '@/contexts/AuthContext'
import { 
  MapPin, 
  Compass, 
  Sparkles, 
  LogOut,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'

const destinations = [
  { 
    id: 'tokyo',
    name: 'Tokyo, Japan',
    flag: '🇯🇵',
    popular: true,
    avgCost: 2500,
    currency: 'JPY',
    timezone: 'Asia/Tokyo'
  },
  { 
    id: 'paris',
    name: 'Paris, France',
    flag: '🇫🇷',
    popular: true,
    avgCost: 3000,
    currency: 'EUR',
    timezone: 'Europe/Paris'
  },
  { 
    id: 'bali',
    name: 'Bali, Indonesia',
    flag: '🇮🇩',
    popular: true,
    avgCost: 2000,
    currency: 'IDR',
    timezone: 'Asia/Makassar'
  },
  { 
    id: 'newyork',
    name: 'New York, USA',
    flag: '🇺🇸',
    popular: false,
    avgCost: 3500,
    currency: 'USD',
    timezone: 'America/New_York'
  }
]

const interestOptions = [
  { id: 'culture', label: 'Culture', icon: '🏛️' },
  { id: 'nature', label: 'Nature', icon: '🌲' },
  { id: 'food', label: 'Food', icon: '🍽️' },
  { id: 'adventure', label: 'Adventure', icon: '🏄' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'nightlife', label: 'Nightlife', icon: '🌃' },
  { id: 'art', label: 'Art', icon: '🎨' },
  { id: 'history', label: 'History', icon: '📿' },
]

const tripStyles = [
  { id: 'cultural', label: 'Cultural', icon: '🎭', desc: 'Deep cultural immersion' },
  { id: 'relaxed', label: 'Relaxed', icon: '🧘', desc: 'Slow-paced exploration' },
  { id: 'adventure', label: 'Adventure', icon: '🎢', desc: 'Thrill-seeking activities' },
  { id: 'packed', label: 'Packed', icon: '⚡', desc: 'Maximum experiences' }
]

export default function WanderWisePage() {
  const [currentView, setCurrentView] = useState<'home' | 'form' | 'itinerary'>('home')
  const [selectedDestination, setSelectedDestination] = useState(destinations[0])
  const [destinationInput, setDestinationInput] = useState('')
  const [budget, setBudget] = useState(selectedDestination.avgCost)
  const [numberOfDays, setNumberOfDays] = useState(5)
  const [formData, setFormData] = useState({
    origin: '',
    startDate: '',
    endDate: '',
    budget: 2000,
    travelers: 2,
    interests: [] as string[],
    tripStyle: 'cultural' as const,
    travelMode: 'walking' as const
  })
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadingStep, setLoadingStep] = useState('')
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login'
  })

  const { user, logout } = useAuth()

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleGenerateItinerary = async (preferences: any) => {
    console.log('handleGenerateItinerary called with preferences:', preferences);
    // Check if user is logged in for full features
    if (!user) {
      setAuthModal({ isOpen: true, mode: 'login' })
      console.error('Validation failed: user not logged in');
      return
    }

    // Validation using the passed preferences object
    // Removed origin validation
    // if (!preferences.origin || !preferences.origin.trim()) {
    //   setError('Please enter your origin city')
    //   console.error('Validation failed: origin missing in preferences');
    //   return
    // }
    // Validate destination input
    if (!preferences.destination || !preferences.destination.trim()) { // Use preferences.destination
      setError('Please enter a destination')
      console.error('Validation failed: destination missing in preferences');
      return
    }

    if (preferences.numberOfDays < 1) {
      setError('Number of days must be at least 1')
      console.error('Validation failed: invalid number of days in preferences');
      return
    }
    if (!preferences.interests || preferences.interests.length === 0) {
      setError('Please select at least one interest')
      console.error('Validation failed: no interests selected in preferences');
      return
    }

    setLoading(true)
    setError(null)
    setLoadingStep('Analyzing your preferences...')
    console.log('Validation passed, setting loading state.');

    try {
      // Preferences object is already prepared and passed as argument

      console.log('Sending preferences to API:', preferences);

      // Simulate loading steps
      setTimeout(() => setLoadingStep('Consulting Gemini AI...'), 1000)
      setTimeout(() => setLoadingStep('Finding hidden gems...'), 2000)
      setTimeout(() => setLoadingStep('Optimizing your route...'), 3000)

      // Call the API
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('API responded with !response.ok, data:', data);
        throw new Error(data.details || data.error || 'Failed to generate itinerary')
      }

      console.log('API responded with OK, data:', data);
      setItinerary(data)
      setCurrentView('itinerary')

    } catch (err) {
      console.error('Itinerary generation caught error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
      setLoadingStep('')
      console.log('Finished itinerary generation process.');
    }
  }

  const resetForm = () => {
    setCurrentView('home')
    setItinerary(null)
    setError(null)
    // Reset form data and new state variables
    setFormData({
      origin: '', // Keeping origin in form data state for consistency, but not used in API call
      startDate: '',
      endDate: '',
      budget: selectedDestination.avgCost,
      travelers: 2,
      interests: [] as string[],
      tripStyle: 'cultural' as const,
      travelMode: 'walking' as const
    })
    setDestinationInput(''); // Reset destination input
    setBudget(selectedDestination.avgCost);
    setNumberOfDays(5);
  }

  // Quick demo with real API call
  const handleQuickDemo = async () => {
    console.log('EXPLORE button clicked. Current destinationInput:', destinationInput);
    // Prepare the full preferences object for the API call
    const demoPreferences = {
      // origin: 'Los Angeles, CA', // Removed origin from demo preferences
      destination: destinationInput, // Use destinationInput directly
      budget: budget,
      travelers: 2,
      interests: ['culture', 'food', 'adventure'],
      tripStyle: 'cultural' as const,
      travelMode: 'walking' as const,
      numberOfDays: numberOfDays,
      // currency: selectedDestination.currency, // Removed currency
      // timezone: selectedDestination.timezone // Removed timezone
    }

    // Call the main generation function with the prepared preferences
    await handleGenerateItinerary(demoPreferences); 

    // Optionally, update states AFTER the generation if needed for UI consistency
    // For this demo, we might want to pre-fill the main form if user switches
     setFormData(prev => ({
       ...prev,
       // origin: demoPreferences.origin, // Removed origin update
       interests: demoPreferences.interests,
       tripStyle: demoPreferences.tripStyle,
       travelMode: demoPreferences.travelMode,
      // destination, budget, travelers, startDate, endDate are handled by dedicated states
     }));
    setDestinationInput(demoPreferences.destination);
    setBudget(demoPreferences.budget);
    setNumberOfDays(demoPreferences.numberOfDays);
  };

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (currentView === 'itinerary' && itinerary) {
    return <ItineraryDisplay itinerary={itinerary} onReset={resetForm} />
  }

  if (currentView === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
          <div className="max-w-6xl mx-auto px-6 py-4">
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
              
              <button
                onClick={() => setCurrentView('home')}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="max-w-2xl mx-auto px-6 py-20">
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-12 text-center border border-white/40 shadow-xl">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full mb-6">
                <div className="w-8 h-8 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Creating Your Perfect Journey...</h3>
              <p className="text-gray-600 mb-8">Our AI is crafting a personalized itinerary just for you</p>
              
              <div className="space-y-3 text-sm text-gray-500">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-pulse"></div>
                  <span>{loadingStep || 'Initializing...'}</span>
                </div>
              </div>

              <div className="mt-8 text-xs text-gray-400">
                This may take 10-30 seconds as we consult our AI travel expert...
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                Plan Your Dream Trip
              </h2>
              <p className="text-xl text-gray-600">Tell us your preferences and we'll create the perfect itinerary</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8 max-w-2xl mx-auto">
                <div className="flex items-center space-x-3">
                  <span className="text-red-500 text-xl">⚠️</span>
                  <div>
                    <h3 className="font-medium text-red-900">Oops!</h3>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/40 space-y-6">

              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <input
                  type="text"
                  id="destination"
                  value={destinationInput}
                  onChange={(e) => setDestinationInput(e.target.value)}
                  placeholder="Enter a city or place"
                  className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg text-gray-800"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget
                  </label>
                  <input
                    type="range"
                    min={selectedDestination.avgCost * 0.5}
                    max={selectedDestination.avgCost * 2}
                    step={100}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>${Math.round(selectedDestination.avgCost * 0.5)}</span>
                    <span>${Math.round(selectedDestination.avgCost * 2)}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm text-gray-600">Your Budget</div>
                  <div className="text-xl font-bold text-gray-800">${budget}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-lg">
                <label className="block text-sm font-medium text-gray-700 flex-shrink-0">Number of Days</label>
                <div className="flex items-center space-x-2 flex-grow justify-end">
                  <button
                    onClick={() => setNumberOfDays(Math.max(1, numberOfDays - 1))}
                    className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={numberOfDays}
                    onChange={(e) => setNumberOfDays(Number(e.target.value))}
                    className="w-16 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    onClick={() => setNumberOfDays(numberOfDays + 1)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={handleGenerateItinerary}
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 w-full"
                >
                  {loading ? 'CREATING ITINERARY...' : 'GENERATE ITINERARY'}
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    )
  }

  // Home View
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-r from-pink-200 to-red-200 rounded-full opacity-40"></div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-400 to-pink-400 p-2.5 rounded-2xl shadow-lg">
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
              <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors border-b-2 border-orange-400 pb-1">Home</Link>
              <Link href="/popular-places" className="text-gray-600 hover:text-gray-800 transition-colors">Popular places</Link>
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">Hi, {user.displayName || user.email}</span>
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
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

      <main className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                  <span className="text-gray-800">Your next </span>
                  <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">travel</span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Destination </span>
                  <span className="text-gray-800">is</span>
                </h1>
                
                {/* Quick Demo Section - Keep this for the home view */}
                <div className="flex flex-col space-y-4">
                  {/* Destination Input (for demo purposes) */}
                  <div>
                    <label htmlFor="demo-destination" className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                    <input
                      type="text"
                      id="demo-destination"
                      value={destinationInput}
                      onChange={(e) => setDestinationInput(e.target.value)}
                      placeholder="Enter a city or place"
                      className="w-full px-4 py-3 bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl text-lg font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
                    />
                  </div>

                  {/* Budget Display (for demo purposes) */}
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                       <label className="block text-sm font-medium text-gray-700 mb-1">
                        Budget
                      </label>
                      <input
                        type="range"
                        min={selectedDestination.avgCost * 0.5}
                        max={selectedDestination.avgCost * 2}
                        step={100}
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>${Math.round(selectedDestination.avgCost * 0.5)}</span>
                        <span>${Math.round(selectedDestination.avgCost * 2)}</span>
                      </div>
                    </div>
                     <div className="text-right flex-shrink-0">
                      <div className="text-sm text-gray-600">Your Budget</div>
                      <div className="text-xl font-bold text-gray-800">${budget}</div>
                    </div>
                  </div>

                  {/* Number of Days Counter - New Component */}
                  <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-lg">
                    <label className="block text-sm font-medium text-gray-700 flex-shrink-0">Number of Days</label>
                    <div className="flex items-center space-x-2 flex-grow justify-end">
                      <button
                        onClick={() => setNumberOfDays(Math.max(1, numberOfDays - 1))}
                        className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={numberOfDays}
                        onChange={(e) => setNumberOfDays(Number(e.target.value))}
                        className="w-16 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        onClick={() => setNumberOfDays(numberOfDays + 1)}
                        className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                   </div>

                  {/* Explore Button - existing code */}
                   <div className="relative text-center pt-4">
                     <button
                       onClick={handleQuickDemo}
                       disabled={loading}
                       className="relative px-6 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
                     >
                       {loading ? 'CREATING...' : 'EXPLORE'}
                     </button>
                   </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800">AI</div>
                  <div className="text-sm text-gray-600">Powered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800">150+</div>
                  <div className="text-sm text-gray-600">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800">Real</div>
                  <div className="text-sm text-gray-600">Gemini AI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800">24/7</div>
                  <div className="text-sm text-gray-600">Planning</div>
                </div>
              </div>
            </div>

            {/* Right Illustration - same as before */}
            <div className="relative">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-500 rounded-3xl overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-500"></div>
                  
                  {/* Stylized Japanese Temple */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                    <div className="w-32 h-20 bg-gradient-to-b from-red-600 to-red-700 relative">
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-40 h-12 bg-gradient-to-b from-red-500 to-red-600" 
                           style={{clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)'}}></div>
                      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-36 h-10 bg-gradient-to-b from-red-400 to-red-500"
                           style={{clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)'}}></div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-8 left-8 w-12 h-12 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full opacity-80"></div>
                  <div className="absolute top-16 right-12 w-8 h-8 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full opacity-70"></div>
                  <div className="absolute bottom-24 left-12 w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full opacity-75"></div>
                </div>

                {/* Floating UI Elements */}
                <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/40">
                  <div className="flex items-center space-x-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="text-xs">
                      <div className="font-semibold text-gray-800">AI Generated</div>
                      <div className="text-gray-600">Real-time</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Booking Card */}
                <div className="absolute -bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/40">
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Destination</div>
                      <div className="font-semibold text-gray-800 flex items-center justify-center">
                        <MapPin className="w-3 h-3 mr-1 text-orange-500" />
                        <span id="selected-destination">{destinationInput || selectedDestination.name.split(',')[0]}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">AI Plan</div>
                      <div className="font-semibold text-gray-800 flex items-center justify-center">
                        <Sparkles className="w-3 h-3 mr-1 text-purple-500" />
                        Gemini
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Budget</div>
                      <div className="font-semibold text-gray-800 flex items-center justify-center">
                        <DollarSign className="w-3 h-3 mr-1 text-green-500" />
                        ${budget}
                      </div>
                    </div>
                    <div>
                      <button 
                        onClick={() => setCurrentView('form')}
                        className="w-full py-2 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                      >
                        PLAN
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Ready for AI-powered travel planning?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentView('form')}
                className="px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
              >
                <Compass className="w-5 h-5 mr-2" />
                Start Planning Now
              </button>
              <button
                onClick={handleQuickDemo}
                disabled={loading}
                className="px-8 py-4 bg-white/70 backdrop-blur-md text-gray-800 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-white/40 flex items-center justify-center disabled:opacity-50"
              >
                <Sparkles className="w-5 h-5 mr-2 text-orange-500" />
                {loading ? 'Generating...' : 'Try Demo'}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Powered by Google Gemini AI • Real travel planning in seconds
            </p>
          </div>
        </div>
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