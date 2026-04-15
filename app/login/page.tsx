"use client";

import { useState } from "react";
import { login, register } from "@/lib/auth";
import { useRouter } from "next/navigation";
import NeuralBackground from "@/components/NeuralBackground";
import AnimatedLogo from "@/components/AnimatedLogo";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <NeuralBackground intensity={0.3} />

      <div className="glass neon-glow p-10 w-full max-w-md animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <AnimatedLogo size={80} />
          <h1 className="text-4xl font-bold text-center gradient-text mt-4">
            Bloom
          </h1>
        </div>

        <p className="text-center text-gray-600 mb-8">
          {isLogin ? "Welcome back!" : "Start your AI journey"}
        </p>

        <input
          className="w-full p-3 rounded-lg border bg-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mt-4 p-3 rounded-lg border bg-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 py-3 rounded-lg btn-primary font-semibold disabled:opacity-50"
        >
          {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
        </button>

        <p
          className="text-center mt-4 text-purple-500 cursor-pointer hover:text-purple-700 transition"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </p>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Experience AI learning like never before</p>
        </div>
      </div>
    </div>
  );
}
