// 'use client'

// import { useState } from 'react'
// import { TravelPreferences, Itinerary } from '@/types'
// import { ItineraryDisplay } from '@/components/itinerary/ItineraryDisplay'
// import { 
//   MapPin, 
//   Calendar, 
//   DollarSign, 
//   Users, 
//   Compass, 
//   Sparkles, 
//   Clock, 
//   Star,
//   Plane,
//   ArrowRight,
//   Coffee,
//   Camera,
//   Heart
// } from 'lucide-react'

// const destinations = [
//   { name: 'Tokyo, Japan', flag: '🇯🇵', popular: true },
//   { name: 'Paris, France', flag: '🇫🇷', popular: true },
//   { name: 'Bali, Indonesia', flag: '🇮🇩', popular: true },
//   { name: 'New York, USA', flag: '🇺🇸', popular: false },
//   { name: 'London, UK', flag: '🇬🇧', popular: false },
//   { name: 'Rome, Italy', flag: '🇮🇹', popular: true },
//   { name: 'Barcelona, Spain', flag: '🇪🇸', popular: false },
//   { name: 'Amsterdam, Netherlands', flag: '🇳🇱', popular: false },
// ]

// const interestOptions = [
//   { id: 'culture', label: 'Culture', icon: '🏛️' },
//   { id: 'nature', label: 'Nature', icon: '🌲' },
//   { id: 'food', label: 'Food', icon: '🍽️' },
//   { id: 'adventure', label: 'Adventure', icon: '🏄' },
//   { id: 'shopping', label: 'Shopping', icon: '🛍️' },
//   { id: 'nightlife', label: 'Nightlife', icon: '🌃' },
//   { id: 'art', label: 'Art', icon: '🎨' },
//   { id: 'history', label: 'History', icon: '📿' },
// ]

// const tripStyles = [
//   { id: 'cultural', label: 'Cultural', icon: '🎭', desc: 'Deep cultural immersion' },
//   { id: 'relaxed', label: 'Relaxed', icon: '🧘', desc: 'Slow-paced exploration' },
//   { id: 'adventure', label: 'Adventure', icon: '🎢', desc: 'Thrill-seeking activities' },
//   { id: 'packed', label: 'Packed', icon: '⚡', desc: 'Maximum experiences' }
// ]

// export default function WanderWisePage() {
//   const [currentView, setCurrentView] = useState<'home' | 'form' | 'itinerary'>('home')
//   const [formData, setFormData] = useState({
//     origin: '',
//     destination: '',
//     startDate: '',
//     endDate: '',
//     budget: 2000,
//     travelers: 2,
//     interests: [] as string[],
//     tripStyle: 'cultural' as const,
//     travelMode: 'walking' as const
//   })
//   const [itinerary, setItinerary] = useState<Itinerary | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [loadingStep, setLoadingStep] = useState('')

//   const toggleInterest = (interest: string) => {
//     setFormData(prev => ({
//       ...prev,
//       interests: prev.interests.includes(interest)
//         ? prev.interests.filter(i => i !== interest)
//         : [...prev.interests, interest]
//     }))
//   }

//   const handleGenerateItinerary = async () => {
//     // Validation
//     if (!formData.origin.trim()) {
//       setError('Please enter your origin city')
//       return
//     }
//     if (!formData.destination.trim()) {
//       setError('Please select a destination')
//       return
//     }
//     if (!formData.startDate || !formData.endDate) {
//       setError('Please select travel dates')
//       return
//     }
//     if (formData.interests.length === 0) {
//       setError('Please select at least one interest')
//       return
//     }

//     setLoading(true)
//     setError(null)
//     setLoadingStep('Analyzing your preferences...')
    
//     try {
//       // Convert form data to TravelPreferences
//       const preferences: TravelPreferences = {
//         ...formData,
//         startDate: new Date(formData.startDate),
//         endDate: new Date(formData.endDate)
//       }

//       // Simulate loading steps
//       setTimeout(() => setLoadingStep('Consulting Gemini AI...'), 1000)
//       setTimeout(() => setLoadingStep('Finding hidden gems...'), 2000)
//       setTimeout(() => setLoadingStep('Optimizing your route...'), 3000)

//       // Call the real API
//       const response = await fetch('/api/generate-itinerary', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(preferences),
//       })
      
//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.details || 'Failed to generate itinerary')
//       }
      
//       const data = await response.json()
//       setItinerary(data)
//       setCurrentView('itinerary')
      
//     } catch (err) {
//       console.error('Itinerary generation error:', err)
//       setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
//     } finally {
//       setLoading(false)
//       setLoadingStep('')
//     }
//   }

//   const resetForm = () => {
//     setCurrentView('home')
//     setItinerary(null)
//     setError(null)
//   }

//   // Quick demo with real API call
//   const handleQuickDemo = async () => {
//     const demoPreferences = {
//       origin: 'Los Angeles, CA',
//       destination: 'Tokyo, Japan',
//       startDate: '2024-04-15',
//       endDate: '2024-04-20',
//       budget: 2500,
//       travelers: 2,
//       interests: ['culture', 'food', 'adventure'],
//       tripStyle: 'cultural' as const,
//       travelMode: 'walking' as const
//     }
    
//     setFormData(demoPreferences)
//     await handleGenerateItinerary()
//   }

//   if (currentView === 'itinerary' && itinerary) {
//     return <ItineraryDisplay itinerary={itinerary} onReset={resetForm} />
//   }

//   if (currentView === 'form') {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
//         {/* Header */}
//         <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
//           <div className="max-w-6xl mx-auto px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <div className="bg-gradient-to-r from-orange-400 to-pink-400 p-2.5 rounded-2xl">
//                   <Compass className="w-7 h-7 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                     WanderWise
//                   </h1>
//                   <p className="text-sm text-gray-500">Smart trips, wise plans</p>
//                 </div>
//               </div>
              
//               <button
//                 onClick={() => setCurrentView('home')}
//                 className="text-gray-600 hover:text-gray-800 transition-colors"
//               >
//                 ← Back to Home
//               </button>
//             </div>
//           </div>
//         </header>

//         {loading ? (
//           <div className="max-w-2xl mx-auto px-6 py-20">
//             <div className="bg-white/70 backdrop-blur-md rounded-3xl p-12 text-center border border-white/40 shadow-xl">
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full mb-6">
//                 <div className="w-8 h-8 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">Creating Your Perfect Journey...</h3>
//               <p className="text-gray-600 mb-8">Our AI is crafting a personalized itinerary just for you</p>
              
//               <div className="space-y-3 text-sm text-gray-500">
//                 <div className="flex items-center justify-center space-x-3">
//                   <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-pulse"></div>
//                   <span>{loadingStep || 'Initializing...'}</span>
//                 </div>
//               </div>

//               <div className="mt-8 text-xs text-gray-400">
//                 This may take 10-30 seconds as we consult our AI travel expert...
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="max-w-4xl mx-auto px-6 py-12">
//             <div className="text-center mb-12">
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
//                 Plan Your Dream Trip
//               </h2>
//               <p className="text-xl text-gray-600">Tell us your preferences and we'll create the perfect itinerary</p>
//             </div>

//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8 max-w-2xl mx-auto">
//                 <div className="flex items-center space-x-3">
//                   <span className="text-red-500 text-xl">⚠️</span>
//                   <div>
//                     <h3 className="font-medium text-red-900">Oops!</h3>
//                     <p className="text-red-700 text-sm">{error}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="space-y-8">
//               {/* Destination Section */}
//               <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-xl">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
//                   <MapPin className="w-6 h-6 mr-3 text-orange-500" />
//                   Where would you like to go?
//                 </h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-3">From</label>
//                     <input
//                       type="text"
//                       value={formData.origin}
//                       onChange={(e) => setFormData({...formData, origin: e.target.value})}
//                       placeholder="New York, NY"
//                       className="w-full px-4 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-3">To</label>
//                     <select
//                       value={formData.destination}
//                       onChange={(e) => setFormData({...formData, destination: e.target.value})}
//                       className="w-full px-4 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
//                     >
//                       <option value="">Select destination...</option>
//                       {destinations.map(dest => (
//                         <option key={dest.name} value={dest.name}>
//                           {dest.flag} {dest.name} {dest.popular && '⭐'}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Travel Details */}
//               <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-xl">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
//                   <Calendar className="w-6 h-6 mr-3 text-blue-500" />
//                   Travel Details
//                 </h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-3">Start Date</label>
//                     <input
//                       type="date"
//                       value={formData.startDate}
//                       onChange={(e) => setFormData({...formData, startDate: e.target.value})}
//                       min={new Date().toISOString().split('T')[0]}
//                       className="w-full px-4 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-3">End Date</label>
//                     <input
//                       type="date"
//                       value={formData.endDate}
//                       onChange={(e) => setFormData({...formData, endDate: e.target.value})}
//                       min={formData.startDate || new Date().toISOString().split('T')[0]}
//                       className="w-full px-4 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-3">Budget ($)</label>
//                     <input
//                       type="number"
//                       value={formData.budget}
//                       onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value) || 0})}
//                       min="500"
//                       step="100"
//                       className="w-full px-4 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-3">Travelers</label>
//                     <select
//                       value={formData.travelers}
//                       onChange={(e) => setFormData({...formData, travelers: parseInt(e.target.value)})}
//                       className="w-full px-4 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
//                     >
//                       {[1,2,3,4,5,6].map(num => (
//                         <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Trip Style */}
//               <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-xl">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
//                   <Sparkles className="w-6 h-6 mr-3 text-purple-500" />
//                   What's your travel style?
//                 </h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                   {tripStyles.map(style => (
//                     <label
//                       key={style.id}
//                       className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-200 ${
//                         formData.tripStyle === style.id
//                           ? 'border-orange-400 bg-gradient-to-br from-orange-50 to-pink-50 shadow-lg transform scale-105'
//                           : 'border-white/40 bg-white/40 hover:border-white/60 hover:bg-white/50'
//                       }`}
//                     >
//                       <input
//                         type="radio"
//                         name="tripStyle"
//                         value={style.id}
//                         checked={formData.tripStyle === style.id}
//                         onChange={(e) => setFormData({...formData, tripStyle: e.target.value as any})}
//                         className="sr-only"
//                       />
//                       <div className="text-center">
//                         <div className="text-4xl mb-3">{style.icon}</div>
//                         <div className="font-bold text-gray-800">{style.label}</div>
//                         <div className="text-sm text-gray-600 mt-2">{style.desc}</div>
//                       </div>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Interests */}
//               <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-xl">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-6">What interests you most?</h3>
                
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {interestOptions.map(interest => (
//                     <label
//                       key={interest.id}
//                       className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-200 ${
//                         formData.interests.includes(interest.id)
//                           ? 'border-orange-400 bg-gradient-to-br from-orange-50 to-pink-50 shadow-lg transform scale-105'
//                           : 'border-white/40 bg-white/40 hover:border-white/60 hover:bg-white/50'
//                       }`}
//                       onClick={() => toggleInterest(interest.id)}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={formData.interests.includes(interest.id)}
//                         readOnly
//                         className="sr-only"
//                       />
//                       <div className="text-center">
//                         <div className="text-3xl mb-2">{interest.icon}</div>
//                         <div className="font-semibold text-gray-800 text-sm">{interest.label}</div>
//                       </div>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="text-center">
//                 <button
//                   onClick={handleGenerateItinerary}
//                   disabled={loading}
//                   className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white text-lg font-bold rounded-full hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <Sparkles className="w-6 h-6 mr-3" />
//                   Generate My AI Trip Plan
//                   <ArrowRight className="w-6 h-6 ml-3" />
//                 </button>
//                 <p className="text-xs text-gray-500 mt-3">
//                   Powered by Google Gemini AI • Usually takes 10-30 seconds
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   }

//   // Home View
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
//       {/* Decorative Elements */}
//       <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full opacity-60 animate-pulse"></div>
//       <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full opacity-50 animate-bounce"></div>
//       <div className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-r from-pink-200 to-red-200 rounded-full opacity-40"></div>

//       {/* Header */}
//       <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 relative z-10">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="bg-gradient-to-r from-orange-400 to-pink-400 p-2.5 rounded-2xl shadow-lg">
//                 <Compass className="w-7 h-7 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                   WanderWise
//                 </h1>
//                 <p className="text-sm text-gray-500">Smart trips, wise plans</p>
//               </div>
//             </div>
            
//             <nav className="hidden md:flex items-center space-x-8">
//               <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors border-b-2 border-orange-400 pb-1">Home</a>
//               <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Popular places</a>
//               <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Current deals</a>
//               <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Contact</a>
//             </nav>

//             <div className="flex items-center space-x-4">
//               <button className="text-gray-600 hover:text-gray-800 font-medium transition-colors">
//                 LOGIN
//               </button>
//               <button className="px-6 py-2.5 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105">
//                 REGISTER
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="relative z-10">
//         {/* Hero Section */}
//         <div className="max-w-7xl mx-auto px-6 py-20">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Content */}
//             <div className="space-y-8">
//               <div className="space-y-6">
//                 <h1 className="text-6xl md:text-7xl font-bold leading-tight">
//                   <span className="text-gray-800">Your next </span>
//                   <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">travel</span>
//                   <br />
//                   <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Destination </span>
//                   <span className="text-gray-800">is</span>
//                 </h1>
                
//                 <div className="flex items-center space-x-4">
//                   <select className="px-6 py-4 bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl text-lg font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 min-w-[200px]">
//                     <option value="tokyo">🇯🇵 Tokyo</option>
//                     <option value="paris">🇫🇷 Paris</option>
//                     <option value="bali">🇮🇩 Bali</option>
//                     <option value="newyork">🇺🇸 New York</option>
//                   </select>
//                   <div className="relative">
//                     <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
//                     <button
//                       onClick={handleQuickDemo}
//                       disabled={loading}
//                       className="relative px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
//                     >
//                       {loading ? 'CREATING...' : 'EXPLORE'}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-4 gap-6 pt-8">
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-800">AI</div>
//                   <div className="text-sm text-gray-600">Powered</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-800">150+</div>
//                   <div className="text-sm text-gray-600">Destinations</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-800">Real</div>
//                   <div className="text-sm text-gray-600">Gemini AI</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-800">24/7</div>
//                   <div className="text-sm text-gray-600">Planning</div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Illustration - Same as before */}
//             <div className="relative">
//               <div className="relative">
//                 <div className="w-full h-96 bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-500 rounded-3xl overflow-hidden shadow-2xl relative">
//                   <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-500"></div>
                  
//                   {/* Temple illustration */}
//                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
//                     <div className="w-32 h-20 bg-gradient-to-b from-red-600 to-red-700 relative">
//                       <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-40 h-12 bg-gradient-to-b from-red-500 to-red-600" 
//                            style={{clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)'}}></div>
//                     </div>
//                   </div>

//                   {/* Decorative elements */}
//                   <div className="absolute top-8 left-8 w-12 h-12 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full opacity-80"></div>
//                   <div className="absolute top-16 right-12 w-8 h-8 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full opacity-70"></div>
//                   <div className="absolute bottom-24 left-12 w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full opacity-75"></div>
//                 </div>

//                 {/* Floating UI Elements */}
//                 <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/40">
//                   <div className="flex items-center space-x-3">
//                     <div className="flex -space-x-2">
//                       <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full border-2 border-white"></div>
//                       <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full border-2 border-white"></div>
//                     </div>
//                     <div className="text-xs">
//                       <div className="font-semibold text-gray-800">AI Generated</div>
//                       <div className="text-gray-600">Real-time</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Bottom Booking Card */}
//                 <div className="absolute -bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/40">
//                   <div className="grid grid-cols-4 gap-4 text-center">
//                     <div>
//                       <div className="text-xs text-gray-600 mb-1">Destination</div>
//                       <div className="font-semibold text-gray-800 flex items-center justify-center">
//                         <MapPin className="w-3 h-3 mr-1 text-orange-500" />
//                         Tokyo
//                       </div>
//                     </div>
//                     <div>
//                       <div className="text-xs text-gray-600 mb-1">AI Plan</div>
//                       <div className="font-semibold text-gray-800 flex items-center justify-center">
//                         <Sparkles className="w-3 h-3 mr-1 text-purple-500" />
//                         Gemini
//                       </div>
//                     </div>
//                     <div>
//                       <div className="text-xs text-gray-600 mb-1">Budget</div>
//                       <div className="font-semibold text-gray-800 flex items-center justify-center">
//                         <DollarSign className="w-3 h-3 mr-1 text-green-500" />
//                         $2,500
//                       </div>
//                     </div>
//                     <div>
//                       <button 
//                         onClick={() => setCurrentView('form')}
//                         className="w-full py-2 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
//                       >
//                         PLAN
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* CTA Section */}
//           <div className="text-center mt-20">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6">
//               Ready for AI-powered travel planning?
//             </h2>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button
//                 onClick={() => setCurrentView('form')}
//                 className="px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
//               >
//                 <Compass className="w-5 h-5 mr-2" />
//                 Start Planning Now
//               </button>
//               <button
//                 onClick={handleQuickDemo}
//                 disabled={loading}
//                 className="px-8 py-4 bg-white/70 backdrop-blur-md text-gray-800 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-white/40 flex items-center justify-center disabled:opacity-50"
//               >
//                 <Sparkles className="w-5 h-5 mr-2 text-orange-500" />
//                 {loading ? 'Generating...' : 'Try Tokyo Demo'}
//               </button>
//             </div>
//             <p className="text-sm text-gray-500 mt-4">
//               Powered by Google Gemini AI • Real travel planning in seconds
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { TravelPreferences, Itinerary } from '@/types'
import { ItineraryDisplay } from '@/components/itinerary/ItineraryDisplay'
import { AuthModal } from '@/components/auth/AuthModal'
import { useAuth } from '@/contexts/AuthContext'
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Compass, 
  Sparkles, 
  Clock, 
  Star,
  Plane,
  ArrowRight,
  Coffee,
  Camera,
  Heart,
  LogOut
} from 'lucide-react'

const destinations = [
  { name: 'Tokyo, Japan', flag: '🇯🇵', popular: true },
  { name: 'Paris, France', flag: '🇫🇷', popular: true },
  { name: 'Bali, Indonesia', flag: '🇮🇩', popular: true },
  { name: 'New York, USA', flag: '🇺🇸', popular: false },
  { name: 'London, UK', flag: '🇬🇧', popular: false },
  { name: 'Rome, Italy', flag: '🇮🇹', popular: true },
  { name: 'Barcelona, Spain', flag: '🇪🇸', popular: false },
  { name: 'Amsterdam, Netherlands', flag: '🇳🇱', popular: false },
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
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
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

  const handleGenerateItinerary = async () => {
    // Check if user is logged in for full features
    if (!user) {
      setAuthModal({ isOpen: true, mode: 'login' })
      return
    }

    // Validation
    if (!formData.origin.trim()) {
      setError('Please enter your origin city')
      return
    }
    if (!formData.destination.trim()) {
      setError('Please select a destination')
      return
    }
    if (!formData.startDate || !formData.endDate) {
      setError('Please select travel dates')
      return
    }
    if (formData.interests.length === 0) {
      setError('Please select at least one interest')
      return
    }

    setLoading(true)
    setError(null)
    setLoadingStep('Analyzing your preferences...')
    
    try {
      // Convert form data to TravelPreferences
      const preferences: TravelPreferences = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate)
      }

      // Simulate loading steps
      setTimeout(() => setLoadingStep('Consulting Gemini AI...'), 1000)
      setTimeout(() => setLoadingStep('Finding hidden gems...'), 2000)
      setTimeout(() => setLoadingStep('Optimizing your route...'), 3000)

      // Call the real API
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || 'Failed to generate itinerary')
      }
      
      const data = await response.json()
      setItinerary(data)
      setCurrentView('itinerary')
      
    } catch (err) {
      console.error('Itinerary generation error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
      setLoadingStep('')
    }
  }

  const resetForm = () => {
    setCurrentView('home')
    setItinerary(null)
    setError(null)
  }

  // Quick demo with real API call
  const handleQuickDemo = async () => {
    const demoPreferences = {
      origin: 'Los Angeles, CA',
      destination: 'Tokyo, Japan',
      startDate: '2024-04-15',
      endDate: '2024-04-20',
      budget: 2500,
      travelers: 2,
      interests: ['culture', 'food', 'adventure'],
      tripStyle: 'cultural' as const,
      travelMode: 'walking' as const
    }
    
    setFormData(demoPreferences)
    await handleGenerateItinerary()
  }

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

            {/* Form sections would go here - same as before */}
            <div className="text-center">
              <p className="text-gray-600 mb-8">Form sections implementation...</p>
              <button
                onClick={handleGenerateItinerary}
                className="px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-2xl font-bold hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Generate My AI Trip Plan
              </button>
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
              <a href="/" className="text-gray-600 hover:text-gray-800 transition-colors border-b-2 border-orange-400 pb-1">Home</a>
              <a href="/popular-places" className="text-gray-600 hover:text-gray-800 transition-colors">Popular places</a>
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
                
                <div className="flex items-center space-x-4">
                  <select className="px-6 py-4 bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl text-lg font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 min-w-[200px]">
                    <option value="tokyo">🇯🇵 Tokyo</option>
                    <option value="paris">🇫🇷 Paris</option>
                    <option value="bali">🇮🇩 Bali</option>
                    <option value="newyork">🇺🇸 New York</option>
                  </select>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
                    <button
                      onClick={handleQuickDemo}
                      disabled={loading}
                      className="relative px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
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
                        Tokyo
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
                        $2,500
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
                {loading ? 'Generating...' : 'Try Tokyo Demo'}
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