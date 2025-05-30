import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export interface ItineraryPrompt {
  destination: string
  days: number
  budget: number
  interests: string[]
  travelers: number
  tripStyle: string
  travelMode: string
}

export async function generateItinerary(prompt: ItineraryPrompt) {
  const systemPrompt = `
    You are WanderWise, an expert AI travel planner that creates amazing, personalized travel experiences. 
    You understand local culture, hidden gems, optimal timing, and budget considerations.
    
    Create a detailed JSON itinerary with this EXACT structure:
    {
      "title": "Catchy trip title",
      "aiInsights": ["3-4 key insights about the destination", "Local tips", "Best time to visit certain places"],
      "packingList": ["Essential items based on activities and weather"],
      "days": [
        {
          "day": 1,
          "theme": "Day theme (e.g., Cultural Immersion)",
          "activities": [
            {
              "name": "Specific place/activity name",
              "description": "Engaging 2-3 sentence description with local context",
              "location": "Full address with city and country",
              "timeSlot": { "start": "09:00", "end": "11:30" },
              "category": "sightseeing|food|entertainment|culture|nature|shopping|adventure",
              "estimatedCost": 25,
              "tips": ["Local insider tip", "Best photo spots", "What to avoid"]
            }
          ],
          "dailyBudget": 120,
          "weatherTip": "Weather-appropriate advice"
        }
      ]
    }
    
    IMPORTANT GUIDELINES:
    - Include 4-6 activities per day based on trip style
    - Provide REAL, specific addresses
    - Consider realistic travel times between locations
    - Include diverse activity types
    - Add local insights and cultural context
    - Balance indoor/outdoor activities
    - Consider meal times and local dining customs
    - Stay within budget while maximizing experience
    - Include hidden gems alongside popular attractions
  `

  const userPrompt = `
    Plan an incredible ${prompt.days}-day trip to ${prompt.destination} for ${prompt.travelers} travelers.
    
    Trip Details:
    - Budget: $${prompt.budget} total
    - Trip style: ${prompt.tripStyle}
    - Interests: ${prompt.interests.join(', ')}
    - Travel mode: ${prompt.travelMode}
    
    Create a ${prompt.tripStyle} itinerary that maximizes their interests while staying within budget. 
    Include local experiences, authentic dining, and optimal timing for each activity.
    Make it feel like a local planned their trip!
  `

  try {
    const result = await model.generateContent([
      { text: systemPrompt },
      { text: userPrompt }
    ])
    
    const response = result.response.text()
    
    // Clean the response to ensure it's valid JSON
    const cleanedResponse = response
      .replace(/```json\n?/, '')
      .replace(/```\n?$/, '')
      .trim()
    
    return JSON.parse(cleanedResponse)
  } catch (error) {
    console.error('Gemini API Error:', error)
    throw new Error('Failed to generate itinerary with Gemini AI')
  }
}

export async function enhanceItinerary(itinerary: any, userFeedback: string) {
  const prompt = `
    Enhance this travel itinerary based on user feedback: "${userFeedback}"
    
    Current itinerary: ${JSON.stringify(itinerary, null, 2)}
    
    Provide the enhanced itinerary in the same JSON format, incorporating the feedback while maintaining budget and time constraints.
  `

  try {
    const result = await model.generateContent(prompt)
    const response = result.response.text()
    
    const cleanedResponse = response
      .replace(/```json\n?/, '')
      .replace(/```\n?$/, '')
      .trim()
    
    return JSON.parse(cleanedResponse)
  } catch (error) {
    console.error('Gemini Enhancement Error:', error)
    throw new Error('Failed to enhance itinerary')
  }
}