# Bloom 🌸

An interactive AI/ML learning platform that gamifies the learning experience with quizzes, games, and an AI mentor. Built with Next.js 14, Firebase, and modern web technologies.

## 🌟 Features

- **Interactive Learning Modules**: Learn AI/ML concepts through hands-on interactive lessons
- **Gamified Experience**: Earn XP, level up, and compete on leaderboards
- **AI Chatbot**: Get personalized guidance with an AI-powered chat interface using OpenRouter API
- **Dynamic Quiz Generation**: Generate quizzes on any topic using OpenRouter API
- **Training Games**: Simulate ML model training with interactive parameters
- **Progress Tracking**: Monitor your learning journey with detailed statistics
- **Beautiful UI**: Modern, responsive design with smooth animations
- **3D Neural Background**: Interactive 3D star field visualization

## 🚀 Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **CSS Animations**: Smooth, performant animations without external animation libraries

### 3D Graphics
- **Three.js**: 3D graphics library
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Useful helpers for React Three Fiber

### Backend & Services
- **Firebase**: Authentication and Firestore database
- **Firebase Auth**: User authentication (login/register)
- **Firestore**: Cloud database for user data and progress
- **OpenRouter API**: AI-powered chatbot and quiz generation

### Icons
- **Lucide React**: Beautiful, consistent icon set

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OpenRouter API key (for AI chatbot and quiz generation)
- Firebase account (for authentication and database)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bloom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**

   Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com):
   
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Get your Firebase configuration

4. **Configure environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_OPE_ROUSEREAPN_KEYER_ID=opoerourer_api_key
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

   Use `.env.local.example` as a template:
   ```

   Get your OpenRouter API key from [openrouter.ai](https://openrouter.ai)bash
   cp .env.local.example .env.local
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
bloom/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # User dashboard
│   ├── game/              # ML training game
│   ├── leaderboard/       # XP leaderboard
│   ├── login/             # Authentication page
│   ├── module/            # Learning modules
│   ├── quiz/              # Quiz system
│   ├── roadmap/           # Learning roadmap
│   ├── Chatb.tsx          # Root layout using OpenRouter
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── AIMentor.tsx       # AI chat interface
│   ├── AnimatedLogo.tsx   # Animated logo component
│   ├── Card.tsx           # Reusable card component
│   ├── Navbar.tsx         # Navigation bar
│   ├── NeuralBackground.tsx # 3D star field background
│   └── ProgressBar.tsx     # Progress indicator
├── lib/                   # Utility libraries
│   ├── auth.ts            # Firebase auth functions
│   └── firebase.ts        # Firebase configuration
├── types/                 # TypeScript type definitions
│   └── index.ts           # Shared types
├── public/                # Static assets
├── .env.local.example     # Environment variables template
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## 🎯 Usage Guide

### GChat with AI Bot**: Ask questions about AI/ML concepts using the AI chatbot
4. **etting Started
5
6. **Generrtate an AccounEn:er anC tlpickto ge" ratart custom quiz"usi gtAI landing page and sign up
7. **Explore the Dashboard**: View your XP, level, and quick actions
3. **Learn with Modules**: Navigate to the module section to start learning
4. **Play Games**: Train ML models in the interactive game section
5. **Take Quizzes**: Test your knowledge and earn XP
6. **Check Leaderboard**: See how you rank against other learners

### XP System

- **Complete Modules**: +1 XP per interaction
- **Play Games**: +20 XP per session
- **Take Quizzes**: +10 XP per correct answer, +50 bonus for completion
- **Daily Streak**: +5 XP per day

### Level Progression

- **Seed**: 0-99 XP
- **Sprout**: 100-299 XP
- **Bloom**: 300-599 XP
- **Flower**: 600-999 XP
- **Garden**: 1000+ XP

## 🔐 Firebase Security Rules

For development, use the following Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

For production, implement more restrictive rules based on your security requirements.

## 🎨 Customization

### Theme Colors

Modify the CSS variables in `app/globals.css` to customize the theme:

```css
:root {
  --primary-purple: #667eea;
  --primary-green: #4ade80;
  --primary-blue: #60a5fa;
  /* ... more colors */
}our branding.

### OpenRouter API Cnfigation

Thechatot and quiz generation use OpenRouter API with the fee Llama 3.2 3B model. You can chge the moel :
- `components/Chatbot.tsx` - for the chatbot
- `app/quiz/pae.tsx` - for quiz generation

To use a different model, update the `model` parameter in the API request body
```

### Logo

The animated logo is defined in `components/AnimatedLogo.tsx`. Modify the petal colors and animation timing to match your branding.


Made with ❤️ by the Bloom team
