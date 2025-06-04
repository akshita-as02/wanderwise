'use client'

import { useState } from 'react'
import { Itinerary } from '@/types'
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Compass, 
  Sparkles, 
  Star,
  Coffee,
  Camera,
  Heart,
  Navigation
} from 'lucide-react'

interface Props {
  itinerary: Itinerary
  onReset: () => void
}

export function ItineraryDisplay({ itinerary, onReset }: Props) {
  const [selectedDay, setSelectedDay] = useState(0)

  const getCategoryIcon = (category: string) => {
    const icons = {
      sightseeing: <MapPin className="w-4 h-4" />,
      food: <Coffee className="w-4 h-4" />,
      culture: <Camera className="w-4 h-4" />,
      entertainment: <Heart className="w-4 h-4" />,
      nature: <Navigation className="w-4 h-4" />,
      adventure: <Navigation className="w-4 h-4" />
    }
    return icons[category as keyof typeof icons] || <MapPin className="w-4 h-4" />
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
            
            <button
              onClick={onReset}
              className="px-6 py-2.5 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Plan New Trip
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Trip Overview Card */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/40 shadow-xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
                {itinerary.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <span className="flex items-center bg-orange-100 px-3 py-1.5 rounded-full">
                  <MapPin className="w-4 h-4 mr-2 text-orange-600" /> 
                  {itinerary.destination}
                </span>
                <span className="flex items-center bg-blue-100 px-3 py-1.5 rounded-full">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" /> 
                  {itinerary.duration} days
                </span>
                <span className="flex items-center bg-green-100 px-3 py-1.5 rounded-full">
                  <DollarSign className="w-4 h-4 mr-2 text-green-600" /> 
                  ${itinerary.totalBudget}
                </span>
                <span className="flex items-center bg-purple-100 px-3 py-1.5 rounded-full">
                  <Users className="w-4 h-4 mr-2 text-purple-600" /> 
                  {itinerary.preferences.travelers} travelers
                </span>
              </div>
            </div>
            
            <div className="text-6xl">
              {itinerary.destination.includes('Tokyo') || itinerary.destination.includes('Japan') ? '🏯' :
               itinerary.destination.includes('Paris') || itinerary.destination.includes('France') ? '🗼' :
               itinerary.destination.includes('Bali') || itinerary.destination.includes('Indonesia') ? '🏝️' :
               itinerary.destination.includes('New York') ? '🏙️' :
               itinerary.destination.includes('London') ? '🏰' : '✈️'}
            </div>
          </div>

          {/* AI Insights & Packing */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                AI Travel Insights
              </h3>
              <ul className="space-y-3">
                {itinerary.aiInsights.map((insight, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🎒</span>
                Smart Packing List
              </h3>
              <ul className="space-y-3">
                {itinerary.packingList.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Day Navigation */}
        <div className="flex space-x-3 mb-8 overflow-x-auto pb-2 hide-scrollbar">
          {itinerary.days.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDay(idx)}
              className={`flex-shrink-0 px-6 py-4 rounded-2xl font-medium transition-all duration-200 ${
                selectedDay === idx
                  ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-lg transform scale-105'
                  : 'bg-white/70 text-gray-700 hover:bg-white/90 border border-white/40'
              }`}
            >
              <div className="text-center">
                <div className="font-bold">Day {day.day}</div>
                <div className="text-xs opacity-80 mt-1">{day.theme}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Day Details */}
        {itinerary.days[selectedDay] && (
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Day {itinerary.days[selectedDay].day}: {itinerary.days[selectedDay].theme}
                </h2>
                <p className="text-gray-600 mt-2">{itinerary.days[selectedDay].date}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">
                  ${itinerary.days[selectedDay].dailyBudget}
                </div>
                <div className="text-sm text-gray-600">daily budget</div>
              </div>
            </div>

            {/* Weather Tip */}
            {itinerary.days[selectedDay].weatherTip && (
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-4 mb-8">
                <div className="flex items-center">
                  <span className="text-3xl mr-4">
                    {itinerary.destination.includes('Tokyo') || itinerary.destination.includes('Japan') ? '🌸' :
                     itinerary.destination.includes('Paris') ? '☀️' :
                     itinerary.destination.includes('Bali') ? '🌺' : '🌤️'}
                  </span>
                  <div>
                    <h4 className="font-semibold text-blue-900">Weather & Season Tip</h4>
                    <p className="text-blue-700 text-sm mt-1">{itinerary.days[selectedDay].weatherTip}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Activities Timeline */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Today's Adventures</h3>
              {itinerary.days[selectedDay].activities.map((activity, idx) => (
                <div key={activity.id} className="bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-2xl flex items-center justify-center text-sm font-bold shadow-lg">
                        {idx + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-lg">{activity.name}</h4>
                          <p className="text-gray-600 mt-2 leading-relaxed">{activity.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-3 mt-4">
                            <span className="flex items-center bg-purple-100 px-3 py-1.5 rounded-full text-xs text-purple-700">
                              <Clock className="w-3 h-3 mr-1" />
                              {activity.timeSlot.start} - {activity.timeSlot.end}
                            </span>
                            <span className="flex items-center bg-blue-100 px-3 py-1.5 rounded-full text-xs text-blue-700">
                              {getCategoryIcon(activity.category)}
                              <span className="ml-1 capitalize">{activity.category}</span>
                            </span>
                            {activity.estimatedCost && activity.estimatedCost > 0 && (
                              <span className="flex items-center bg-green-100 px-3 py-1.5 rounded-full text-xs text-green-700">
                                <DollarSign className="w-3 h-3 mr-1" />
                                ${activity.estimatedCost}
                              </span>
                            )}
                          </div>

                          {/* Tips */}
                          {activity.tips && activity.tips.length > 0 && (
                            <div className="mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4">
                              <h5 className="text-sm font-semibold text-orange-800 mb-2 flex items-center">
                                💡 Local Tips
                              </h5>
                              <ul className="text-sm text-orange-700 space-y-1">
                                {activity.tips.map((tip, tipIdx) => (
                                  <li key={tipIdx} className="flex items-start">
                                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hotel Recommendations */}
            {itinerary.days[selectedDay].recommendedHotels && itinerary.days[selectedDay].recommendedHotels.length > 0 && (
              <div className="mt-12 pt-8 border-t border-white/30">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Where to Stay Tonight (Dummy Data)</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {itinerary.days[selectedDay].recommendedHotels.map(hotel => (
                    <div key={hotel.id} className="bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-lg transition-all duration-200">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-bold text-gray-800">{hotel.name}</h4>
                        <div className="text-right">
                          <div className="font-bold text-2xl text-gray-800">${hotel.price}</div>
                          <div className="text-xs text-gray-600">per night</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{hotel.address}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">{hotel.rating}</span>
                        </div>
                        <button 
                          onClick={() => hotel.bookingUrl && window.open(hotel.bookingUrl, '_blank')}
                          className="px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}