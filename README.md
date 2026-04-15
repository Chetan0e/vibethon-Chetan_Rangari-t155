# Bloom 🌸

An interactive AI/ML learning platform that gamifies the learning experience with quizzes, games, and an AI mentor. Built with Next.js 14, Firebase, and modern web technologies.

## 🌟 Features

- **Interactive Learning Modules**: Learn AI/ML concepts through hands-on interactive lessons
- **Gamified Experience**: Earn XP, level up, and compete on leaderboards
- **AI Mentor**: Get personalized guidance with an AI-powered chat interface
- **Training Games**: Simulate ML model training with interactive parameters
- **Quiz System**: Test your knowledge with multiple-choice quizzes
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

### Icons
- **Lucide React**: Beautiful, consistent icon set

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
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
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

   Use `.env.local.example` as a template:
   ```bash
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
│   ├── layout.tsx         # Root layout
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

### Getting Started

1. **Create an Account**: Click "Get Started" on the landing page and sign up
2. **Explore the Dashboard**: View your XP, level, and quick actions
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
}
```

### Logo

The animated logo is defined in `components/AnimatedLogo.tsx`. Modify the petal colors and animation timing to match your branding.


Made with ❤️ by the Bloom team
