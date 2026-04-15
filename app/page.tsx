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
    <div className="relative min-h-screen bg-[#fafafa] font-sans selection:bg-purple-200">
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/50 blur-[120px]" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] rounded-full bg-blue-200/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-200/40 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <AnimatedLogo size={32} />
            <span className="font-bold text-xl tracking-tight text-gray-900">Bloom</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => { document.getElementById('login-section')?.scrollIntoView({ behavior: 'smooth' }); setIsLogin(true); }}
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition"
            >
              Log in
            </button>
            <button
              onClick={() => { document.getElementById('login-section')?.scrollIntoView({ behavior: 'smooth' }); setIsLogin(false); }}
              className="hidden md:block h-9 px-4 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
            >
              Sign up
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 w-full">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100/80 text-xs font-semibold text-purple-700 tracking-wide uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                The Standard for AI Education
              </div>
              <h1 className="text-5xl lg:text-[4rem] font-extrabold tracking-tight text-gray-900 leading-[1.1] sm:leading-[1.15]">
                Learn AI by <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Playing & Building</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Master tough AI concepts with guided mini-games, adaptive quizzes, and real-world simulations. Build actual apps from day one.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                <button
                  onClick={() => document.getElementById('login-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="h-12 px-8 rounded-xl bg-gray-900 text-white font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 hover:-translate-y-0.5 transition-all shadow-md active:scale-95"
                >
                  Start Learning Free <span className="text-lg">→</span>
                </button>
              </div>
            </div>

            {/* RIGHT (Illustration/Mockup) */}
            <div className={`relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/80 to-white/30 border border-white/60 shadow-2xl shadow-blue-900/5 backdrop-blur-3xl overflow-hidden flex flex-col transform md:rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
                {/* Fake Header */}
                <div className="h-12 border-b border-gray-100/50 bg-white/60 flex items-center px-4 gap-2 backdrop-blur-md">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                {/* Fake Dashboard Content */}
                <div className="p-6 flex-1 bg-gray-50/50 space-y-5">
                  <div className="flex justify-between items-end">
                    <div className="space-y-2">
                       <div className="w-16 h-4 bg-gray-200 rounded-md"></div>
                       <div className="w-32 h-6 bg-gray-300 rounded-md"></div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-purple-100"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-28 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col justify-between">
                      <div className="w-12 h-4 bg-purple-100 rounded"></div>
                      <div className="w-20 h-8 bg-purple-600 rounded"></div>
                    </div>
                    <div className="h-28 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col justify-between">
                      <div className="w-12 h-4 bg-blue-100 rounded"></div>
                      <div className="w-20 h-8 bg-blue-600 rounded"></div>
                    </div>
                  </div>
                  <div className="h-32 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3 relative overflow-hidden">
                    <div className="w-1/4 h-4 bg-gray-100 rounded mb-4"></div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full">
                       <div className="w-2/3 h-2.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                    </div>
                    <div className="w-full h-12 bg-gray-50 rounded-xl border border-gray-100 mt-4"></div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -left-6 bottom-12 rounded-2xl bg-white p-4 shadow-xl shadow-purple-900/5 border border-gray-100/80 animate-bounce" style={{ animationDuration: '3.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <p className="text-[10px] font-bold tracking-wider uppercase text-gray-400">Unlocked</p>
                    <p className="text-sm font-semibold text-gray-900">AI Architect</p>
                  </div>
                </div>
              </div>
              
              {/* Floating avatar */}
              <div className="absolute -right-4 top-16 rounded-full bg-white p-2 shadow-lg shadow-blue-900/5 border border-gray-100/80 animate-pulse" style={{ animationDuration: '4s' }}>
                 <div className="w-12 h-12 rounded-full bg-[#EBF5FF] flex items-center justify-center text-xl">🤖</div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="bg-white py-24 mb-12 border-y border-gray-100/80 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Why Bloom works better</h2>
              <p className="text-lg text-gray-500 leading-relaxed">Traditional learning is boring. We combine game design with world-class curriculum to make AI concepts stick.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Interactive Learning", icon: "🎮", desc: "No more long videos. Learn by interacting with models directly." },
                { title: "AI Mentor", icon: "🧠", desc: "Get stuck? Your personalized mentor helps you understand the 'why'." },
                { title: "Gamified Experience", icon: "🏆", desc: "Earn XP, unlock badges, and build streaks to stay motivated." },
                { title: "Real-world Simulations", icon: "🚀", desc: "Deploy real AI agents and see them act in local environments." }
              ].map((f, i) => (
                <div key={i} className="group p-6 rounded-[2rem] border border-gray-200/50 bg-gray-50/40 hover:bg-white hover:border-gray-200 hover:shadow-xl shadow-gray-200/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOGIN / SIGNUP SECTION */}
        <section id="login-section" className="py-16 md:py-24 max-w-md md:max-w-lg mx-auto px-6">
          <div className="rounded-[2rem] border border-gray-200/60 bg-white/80 p-8 md:p-12 shadow-2xl shadow-purple-900/5 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 left-0"></div>

            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{isLogin ? "Welcome Back" : "Start Your Journey"}</h2>
              <p className="text-gray-500 mt-2">{isLogin ? "Sign in to continue learning" : "Create an account to access free modules"}</p>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 h-12 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-4 my-8">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Or email</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleFormKeyDown} className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm" placeholder="you@domain.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} onKeyDown={handleFormKeyDown} className="w-full h-12 rounded-xl border border-gray-300 bg-white pl-4 pr-16 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-gray-900 transition bg-white px-1">
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-8 w-full h-12 rounded-xl bg-gray-900 text-white font-semibold flex items-center justify-center hover:bg-gray-800 transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : isLogin ? "Sign In" : "Create Account"}
            </button>

            <div className="mt-8 text-center">
              <button onClick={() => setIsLogin(!isLogin)} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200/80 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <AnimatedLogo size={28} />
              <span className="font-bold text-lg text-gray-900">Bloom</span>
            </div>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">The new standard for interactive AI education. Built for builders, dreamers, and future tech leaders.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><button className="hover:text-gray-900 transition">Features</button></li>
              <li><button className="hover:text-gray-900 transition">Learning Paths</button></li>
              <li><button className="hover:text-gray-900 transition">Pricing</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><button className="hover:text-gray-900 transition">About</button></li>
              <li><button className="hover:text-gray-900 transition">Community</button></li>
              <li><button className="hover:text-gray-900 transition">Legal & Privacy</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 md:mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 gap-4">
          <p>© 2026 Bloom Platforms Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
             <span className="cursor-pointer hover:text-gray-900 transition">Twitter</span>
             <span className="cursor-pointer hover:text-gray-900 transition">GitHub</span>
             <span className="cursor-pointer hover:text-gray-900 transition">Discord</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
