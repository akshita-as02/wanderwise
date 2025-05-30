# WanderWise 🧳✨
**Smart trips, wise plans**

> AI-powered travel planning application that creates personalized itineraries using Google Gemini AI, with beautiful modern UI and seamless user experience.

![WanderWise Hero](https://img.shields.io/badge/AI-Powered-orange?style=for-the-badge&logo=google&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-orange?style=for-the-badge&logo=firebase&logoColor=white)

## 🌟 Features

### 🤖 **AI-Powered Planning**
- **Google Gemini AI integration** for intelligent itinerary generation
- **Personalized recommendations** based on travel style and interests
- **Local insights and cultural tips** from AI analysis
- **Budget optimization** with cost-effective suggestions

### 🎨 **Beautiful Design**
- **Modern glassmorphism UI** with gradient backgrounds
- **Responsive design** that works on all devices
- **Smooth animations** and interactive elements
- **Intuitive user experience** with clean navigation

### 🔐 **User Authentication**
- **Firebase Authentication** with email/password and Google sign-in
- **Secure user accounts** for saving and managing trips
- **Personalized experience** with user preferences

### 🗺️ **Smart Travel Features**
- **Popular destinations** with real-time data and insights
- **Interactive itinerary display** with day-by-day breakdown
- **Hotel recommendations** with pricing and ratings
- **Activity categorization** and time optimization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Google Gemini API key
- Firebase project set up

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/akshita-as02/wanderwise.git
   cd wanderwise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Google Gemini AI
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### **Backend & AI**
- **Google Gemini AI** - Advanced AI for itinerary generation
- **Next.js API Routes** - Serverless backend functions
- **Firebase Authentication** - User management and security

### **Database & Storage**
- **Firebase Firestore** - NoSQL database (ready for future features)
- **Local Storage** - Client-side data persistence

## 📱 Screenshots

### Homepage
Beautiful gradient design with AI-powered travel planning interface.

### Itinerary Generation
Real-time AI generation with loading states and progress tracking.

### Popular Destinations
Curated list of trending travel destinations with real-time data.

### Authentication
Seamless login/register experience with Firebase integration.

## 🔧 Configuration

### **Getting API Keys**

1. **Gemini AI API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Free tier includes 60 requests/minute

2. **Firebase Setup**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication with Email/Password and Google
   - Copy configuration values to `.env.local`

### **Environment Variables**
All environment variables should be added to `.env.local`:

```env
# Required for AI functionality
GEMINI_API_KEY=your_gemini_api_key_here

# Required for user authentication
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🏗️ Project Structure

```
wanderwise/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate-itinerary/     # Gemini AI integration
│   │   │   └── popular-places/        # Destinations API
│   │   ├── popular-places/            # Popular destinations page
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Homepage
│   ├── components/
│   │   ├── auth/                     # Authentication components
│   │   ├── forms/                    # Form components
│   │   ├── itinerary/                # Itinerary display
│   │   └── ui/                       # Reusable UI components
│   ├── contexts/
│   │   └── AuthContext.tsx           # Authentication context
│   ├── lib/
│   │   ├── firebase.ts               # Firebase configuration
│   │   └── utils.ts                  # Utility functions
│   └── types/
│       └── index.ts                  # TypeScript type definitions
├── public/                           # Static assets
├── .env.local.example               # Environment variables template
└── README.md                        # Project documentation
```

## 🎯 Key Features Breakdown

### **AI Itinerary Generation**
- Real-time generation using Google Gemini AI
- Personalized based on user preferences
- Includes local insights and cultural tips
- Budget-conscious recommendations

### **Authentication System**
- Email/password registration and login
- Google OAuth integration
- Secure user session management
- Personalized user experience

### **Popular Places**
- Curated destination database
- Real-time weather and trending data
- Filter by continent and interests
- Direct integration with trip planning

### **Modern UI/UX**
- Glassmorphism design with backdrop blur
- Gradient backgrounds and smooth animations
- Responsive design for all screen sizes
- Intuitive navigation and user flow

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with zero configuration

### **Other Platforms**
- **Netlify**: Configure build settings for Next.js
- **Railway**: Use Next.js template
- **AWS/Digital Ocean**: Use Docker deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful language model capabilities
- **Firebase** for authentication and backend services
- **Next.js team** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for beautiful icons

## 📞 Contact

**Akshita** - [@akshita-as02](https://github.com/akshita-as02)

Project Link: [https://github.com/akshita-as02/wanderwise](https://github.com/akshita-as02/wanderwise)

---

**Built with ❤️ for travelers who love smart planning**