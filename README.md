<div align="center">
  <h1>🌸 Bloom AI</h1>
  <p><strong>The modern, interactive standard for AI/ML education.</strong></p>
  <p>Learn complex AI concepts through hands-on gameplay, guided learning pathways, adaptive quizzes, and an intelligent AI assistant.</p>
</div>

---

## ✨ Features

- **Interactive Learning Modules:** Move beyond videos. Actively configure, build, and deploy concepts natively.
- **SaaS-Grade UI & Animations:** Built with modern design principles (Glassmorphism, fluid micro-interactions, responsive grid layouts).
- **Gamified Engagement System:** Earn XP, maintain learning streaks, and track real-time visual progress on your dashboard.
- **AI-Powered Mentor:** A conversational AI assistant (via OpenRouter) providing contextual hints, explanations, and dynamic guidance.
- **Adaptive AI Quiz Generation:** Instantly generate new quizzes on any AI topic. The platform queries LLMs on the backend to customize assessments dynamically.
- **Full Backend Integration:** Seamless User Authentication and real-time database syncing across devices using Firebase.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI & Styling:** React 18, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend & Auth:** Firebase (Authentication, Firestore, Hosting via Web Frameworks)
- **AI Integrations:** OpenRouter API (Access to top LLM models like Llama 3)
- **Languages:** TypeScript, pure modern CSS for utilities.

## 📦 Local Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/) 18+ installed.
- A Firebase Account.
- An [OpenRouter](https://openrouter.ai/) API key.

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/bloom-ai.git
   cd bloom-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory based on `.env.local.example`:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-app.appspot.com"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"

   # OpenRouter AI Configuration (Required for Mentor and Quiz Engine)
   NEXT_PUBLIC_OPENROUTER_API_KEY="your-open-router-api-key"
   ```

4. **Boot the platform:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to start exploring.


## 🔐 Database Security

For rapid development, you can use these base Cloud Firestore rules. Be sure to configure stricter rules before moving large-scale user logic into production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Users can only read and write their own documents
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🗺️ Project Structure

- `/app` — Central Next.js routing (Dashboard, Modules, Quizzes, Playgrounds)
- `/components` — Atomic React UI elements (Navbar, Cards, Mentor interface)
- `/lib` — Backend utilities (Firebase client, progression logic, custom math)
- `/types` — Shared global TypeScript definitions
- `/public` — Static assets

## 📖 Usage Guide

- **Dashboard:** Access your learning overview, recent quiz performance, daily streak, and real-time XP accumulation.
- **Learning Modules:** Navigate sequential pathways to unlock concepts. 
- **AI Quiz Tool:** Challenge the AI to quiz you on any tech subject dynamically.
- **Playground (Games):** Get hands-on with abstract AI simulation environments natively.

---
<div align="center">
  <p>Built completely for Next-Generation AI Learners.</p>
</div>
