'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { TravelPreferences } from '@/types'
import { MapPin, Calendar, DollarSign, Users, Compass, Zap } from 'lucide-react'

const travelSchema = z.object({
  origin: z.string().min(1, 'Starting location is required'),
  destination: z.string().min(1, 'Destination is required'),
  startDate: z.date(),
  endDate: z.date(),
  budget: z.number().min(100, 'Minimum budget is $100'),
  travelers: z.number().min(1).max(10),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
  travelMode: z.enum(['driving', 'walking', 'transit', 'bicycling']),
  tripStyle: z.enum(['relaxed', 'packed', 'adventure', 'cultural']),
})

interface Props {
  onSubmit: (data: TravelPreferences) => void
  loading?: boolean
}

const interestOptions = [
  { id: 'culture', label: 'Museums & Culture', icon: '🏛️' },
  { id: 'nature', label: 'Nature & Outdoors', icon: '🌲' },
  { id: 'food', label: 'Food & Dining', icon: '🍽️' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'nightlife', label: 'Nightlife', icon: '🌃' },
  { id: 'architecture', label: 'Architecture', icon: '🏰' },
  { id: 'adventure', label: 'Adventure Sports', icon: '🏄' },
  { id: 'beaches', label: 'Beaches', icon: '🏖️' },
  { id: 'history', label: 'Historical Sites', icon: '📿' },
  { id: 'art', label: 'Art Galleries', icon: '🎨' }
]

const tripStyles = [
  { id: 'relaxed', label: 'Relaxed Explorer', desc: 'Take it easy, enjoy each moment', icon: '🧘' },
  { id: 'packed', label: 'Maximum Adventure', desc: 'See everything, do everything', icon: '⚡' },
  { id: 'adventure', label: 'Thrill Seeker', desc: 'Action-packed experiences', icon: '🎢' },
  { id: 'cultural', label: 'Culture Enthusiast', desc: 'Deep dive into local culture', icon: '🎭' }
]

export function WanderWiseForm({ onSubmit, loading }: Props) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<TravelPreferences>({
    resolver: zodResolver(travelSchema),
    defaultValues: {
      travelers: 2,
      travelMode: 'driving',
      budget: 1500,
      tripStyle: 'relaxed',
    }
  })

  const toggleInterest = (interest: string) => {
    const updated = selectedInterests.includes(interest)
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest]
    
    setSelectedInterests(updated)
    setValue('interests', updated)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Compass className="w-8 h-8 text-wanderwise-500" />
          <h2 className="text-3xl font-bold text-gray-900">Plan Your Perfect Trip</h2>
        </div>
        <p className="text-gray-600">Tell us your preferences and let our AI create your dream itinerary</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Destination Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-wanderwise-500" />
            Where are you going?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <input
                {...register('origin')}
                placeholder="New York, NY"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wanderwise-500 focus:border-transparent"
              />
              {errors.origin && <p className="text-red-500 text-sm mt-1">{errors.origin.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <input
                {...register('destination')}
                placeholder="Paris, France"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wanderwise-500 focus:border-transparent"
              />
              {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>}
            </div>
          </div>
        </div>

        {/* Travel Details Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-wanderwise-500" />
            Travel Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                {...register('startDate', { valueAsDate: true })}
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wanderwise-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                {...register('endDate', { valueAsDate: true })}
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wanderwise-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget ($)</label>
              <input
                {...register('budget', { valueAsNumber: true })}
                type="number"
                min="100"
                step="50"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wanderwise-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Travelers</label>
              <select
                {...register('travelers', { valueAsNumber: true })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wanderwise-500"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Trip Style Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-wanderwise-500" />
            What's your travel style?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tripStyles.map(style => (
              <label
                key={style.id}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  watch('tripStyle') === style.id
                    ? 'border-wanderwise-500 bg-wanderwise-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  {...register('tripStyle')}
                  type="radio"
                  value={style.id}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-3xl mb-2">{style.icon}</div>
                  <div className="font-medium text-gray-900">{style.label}</div>
                  <div className="text-sm text-gray-600 mt-1">{style.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">What interests you?</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {interestOptions.map(interest => (
              <label
                key={interest.id}
                className={`cursor-pointer p-3 rounded-lg border transition-all ${
                  selectedInterests.includes(interest.id)
                    ? 'border-wanderwise-500 bg-wanderwise-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleInterest(interest.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedInterests.includes(interest.id)}
                  readOnly
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-2xl mb-1">{interest.icon}</div>
                  <div className="text-xs font-medium text-gray-700">{interest.label}</div>
                </div>
              </label>
            ))}
          </div>
          {errors.interests && <p className="text-red-500 text-sm mt-3">{errors.interests.message}</p>}
        </div>

        {/* Travel Mode */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">How do you prefer to get around?</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {([
              { value: 'driving', label: 'Driving', icon: '🚗' },
              { value: 'walking', label: 'Walking', icon: '🚶' },
              { value: 'transit', label: 'Public Transit', icon: '🚇' },
              { value: 'bicycling', label: 'Bicycling', icon: '🚴' }
            ] as const).map(mode => (
              <label
                key={mode.value}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  watch('travelMode') === mode.value
                    ? 'border-wanderwise-500 bg-wanderwise-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  {...register('travelMode')}
                  type="radio"
                  value={mode.value}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-2xl mb-2">{mode.icon}</div>
                  <div className="font-medium text-gray-700">{mode.label}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            size="lg"
            className="px-12 py-4 text-lg font-semibold"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Creating Your Perfect Trip...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Compass className="w-5 h-5" />
                <span>Generate My WanderWise Itinerary</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}