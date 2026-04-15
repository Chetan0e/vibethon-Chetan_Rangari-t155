"use client";

import { useState, useEffect } from "react";
import { login, register, signInWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";
import AnimatedLogo from "@/components/AnimatedLogo";

type Feature = {
  icon: string;
  title: string;
  desc: string;
  cardClass: string;
  iconClass: string;
};

const stats = [
  { value: "10K+", label: "Active Learners" },
  { value: "50+", label: "AI Modules" },
  { value: "100+", label: "Interactive Challenges" },
];

const features: Feature[] = [
  {
    icon: "🎮",
    title: "Play-to-Learn Experiences",
    desc: "Master tough AI ideas with mini games, quizzes, and simulations.",
    cardClass: "border-purple-100 hover:border-purple-200 hover:bg-purple-50/70",
    iconClass: "bg-purple-100 text-purple-700",
  },
  {
    icon: "🧠",
    title: "AI Mentor Feedback",
    desc: "Get instant hints, personalized study plans, and adaptive guidance.",
    cardClass: "border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50/70",
    iconClass: "bg-indigo-100 text-indigo-700",
  },
  {
    icon: "🚀",
    title: "Project-First Learning",
    desc: "Build real apps from day one and turn theory into portfolio-ready work.",
    cardClass: "border-pink-100 hover:border-pink-200 hover:bg-pink-50/70",
    iconClass: "bg-pink-100 text-pink-700",
  },
  {
    icon: "🏆",
    title: "Progress, XP & Leaderboards",
    desc: "Track streaks, unlock milestones, and compete with a global community.",
    cardClass: "border-blue-100 hover:border-blue-200 hover:bg-blue-50/70",
    iconClass: "bg-blue-100 text-blue-700",
  },
];

const learningPath = [
  { title: "AI Foundations", time: "Week 1-2", level: "Beginner" },
  { title: "Prompt Engineering", time: "Week 3-4", level: "Beginner" },
  { title: "Model Building", time: "Week 5-8", level: "Intermediate" },
  { title: "Agentic Systems", time: "Week 9-12", level: "Advanced" },
];

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activePathIndex, setActivePathIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFormKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      await handleSubmit();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-purple-50 to-indigo-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-24 h-56 w-56 animate-pulse rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute right-[10%] top-36 h-72 w-72 animate-pulse rounded-full bg-blue-200/30 blur-3xl [animation-delay:400ms]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 animate-pulse rounded-full bg-pink-200/20 blur-3xl [animation-delay:800ms]" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-purple-100/80 bg-white/75 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between transition-all duration-300">
            <div className="group flex cursor-pointer items-center gap-3">
              <div className="rounded-xl bg-white p-1 shadow-sm ring-1 ring-purple-100 transition duration-300 group-hover:scale-105 group-hover:shadow-md">
                <AnimatedLogo size={38} />
              </div>
              <span className="bg-gradient-to-r from-gray-900 to-purple-700 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent transition-transform duration-300 group-hover:scale-105">
                Bloom
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-8rem)] grid-cols-1 items-start gap-10 xl:grid-cols-[1.1fr,0.9fr]">
          <section
            className={`transition-all duration-700 ease-out ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/80 px-4 py-1 text-sm font-medium text-purple-700 shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-purple-500" />
              AI Learning Platform
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl xl:text-6xl">
              Master AI Through
              <span className="mt-1 block bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Interactive Learning
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              Learn faster with guided modules, hands-on projects, and game-like challenges designed for
              creators, students, and future AI builders.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group cursor-pointer rounded-2xl border border-purple-100 bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-2xl font-bold text-gray-900 transition group-hover:text-purple-700">{stat.value}</div>
                  <div className="mt-1 text-xs text-gray-600 sm:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">Why Bloom Works</h2>
              {features.map((feature, index) => (
                <article
                  key={index}
                  className={`group flex cursor-pointer items-start gap-4 rounded-2xl border bg-white/75 p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md ${feature.cardClass}`}
                >
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-2xl transition duration-300 group-hover:scale-110 ${feature.iconClass}`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-purple-700">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </article>
              ))}
            </div>

            <section className="mt-10 rounded-3xl border border-purple-100 bg-white/70 p-6 shadow-lg backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Structured Learning Path</h3>
                <span className="text-xs font-medium text-purple-600">Updated weekly</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {learningPath.map((item, index) => (
                  <button
                    type="button"
                    key={item.title}
                    onClick={() => setActivePathIndex(index)}
                    className={`rounded-xl border p-4 text-left transition duration-300 ${
                      activePathIndex === index
                        ? "border-purple-300 bg-purple-50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-purple-200"
                    }`}
                  >
                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                    <span className="mt-2 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700">
                      {item.level}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </section>

          <aside
            className={`transition-all duration-700 ease-out ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-purple-100 bg-white/95 p-7 shadow-2xl">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-200/40 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-indigo-200/40 blur-2xl" />

              <div className="relative mb-8 text-center">
                <h2 className="mb-2 text-3xl font-bold text-gray-900">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-gray-600">
                  {isLogin ? "Sign in to continue your journey" : "Start your AI learning journey"}
                </p>
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="group mb-6 flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-200 bg-white py-4 font-semibold text-gray-900 transition-all duration-300 hover:border-purple-200 hover:bg-purple-50 disabled:opacity-50"
              >
                <svg className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign in with Google
              </button>

              <div className="mb-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-sm font-medium text-gray-400">or continue with email</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <input
                    className="w-full rounded-xl border-2 border-gray-200 p-4 pr-4 text-gray-900 placeholder-gray-400 transition-all duration-300 group-hover:border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleFormKeyDown}
                  />
                </div>

                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-xl border-2 border-gray-200 p-4 pr-20 text-gray-900 placeholder-gray-400 transition-all duration-300 group-hover:border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleFormKeyDown}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-purple-600 transition hover:bg-purple-50"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-6 w-full transform rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>

              <p
                className="mt-6 cursor-pointer text-center font-medium text-purple-600 transition-colors duration-300 hover:text-purple-700"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </p>

            </div>

            <div className="mt-5 rounded-2xl border border-purple-100 bg-white/70 p-4 backdrop-blur-sm">
              <p className="mb-3 text-center text-sm text-gray-500">Trusted by learners worldwide</p>
              <div className="flex justify-center gap-6 text-gray-500">
                <span className="cursor-pointer text-2xl transition-transform duration-300 hover:scale-110">🔒</span>
                <span className="cursor-pointer text-2xl transition-transform duration-300 hover:scale-110">🛡️</span>
                <span className="cursor-pointer text-2xl transition-transform duration-300 hover:scale-110">✅</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mt-10 border-t border-gray-200 bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <AnimatedLogo size={32} />
                <span className="text-gray-900 font-bold text-xl">Bloom</span>
              </div>
              <p className="text-sm text-gray-600">
                Bloom helps you learn AI through interactive experiences, guided projects, and community support.
              </p>
            </div>
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="cursor-pointer transition-colors hover:text-purple-600">Features</li>
                <li className="cursor-pointer transition-colors hover:text-purple-600">Learning Paths</li>
                <li className="cursor-pointer transition-colors hover:text-purple-600">Roadmap</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="cursor-pointer transition-colors hover:text-purple-600">About</li>
                <li className="cursor-pointer transition-colors hover:text-purple-600">Community</li>
                <li className="cursor-pointer transition-colors hover:text-purple-600">Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="cursor-pointer transition-colors hover:text-purple-600">Privacy</li>
                <li className="cursor-pointer transition-colors hover:text-purple-600">Terms</li>
                <li className="cursor-pointer transition-colors hover:text-purple-600">Security</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
            © 2026 Bloom. Learn deeply. Build boldly.
          </div>
        </div>
      </footer>
    </div>
  );
}
