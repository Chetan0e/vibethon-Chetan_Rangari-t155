"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import AIMentor from "@/components/AIMentor";
import ProgressBar from "@/components/ProgressBar";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          setUserData(snap.data());
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-xl gradient-text">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome to Bloom 🌸
          </h1>
          <p className="text-gray-600">Your AI learning journey continues</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="neon-glow-green">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Your Progress</h3>
                <span className="text-2xl">📊</span>
              </div>
              <p className="text-3xl font-bold gradient-text">
                {userData?.xp || 0} XP
              </p>
              <p className="text-sm text-gray-600 mt-1">Level: {userData?.level || "Seed"}</p>
              <ProgressBar value={userData?.progress || 0} />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Quick Actions</h3>
                <span className="text-2xl">⚡</span>
              </div>
              <div className="space-y-3">
                <a
                  href="/module"
                  className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
                >
                  📘 Continue Learning
                </a>
                <a
                  href="/game"
                  className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition"
                >
                  🎮 Play Game
                </a>
                <a
                  href="/quiz"
                  className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                >
                  🧠 Take Quiz
                </a>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Daily Streak</h3>
                <span className="text-2xl">🔥</span>
              </div>
              <p className="text-4xl font-bold text-orange-500">3 Days</p>
              <p className="text-sm text-gray-600 mt-2">Keep it up!</p>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <AIMentor />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <a href="/roadmap" className="glass-card p-6 text-center card-hover cursor-pointer">
            <div className="text-4xl mb-3">🗺️</div>
            <h3 className="font-semibold">Roadmap</h3>
            <p className="text-sm text-gray-600 mt-1">Your learning path</p>
          </a>

          <a href="/leaderboard" className="glass-card p-6 text-center card-hover cursor-pointer">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="font-semibold">Leaderboard</h3>
            <p className="text-sm text-gray-600 mt-1">Top learners</p>
          </a>

          <a href="/module" className="glass-card p-6 text-center card-hover cursor-pointer">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="font-semibold">Modules</h3>
            <p className="text-sm text-gray-600 mt-1">All topics</p>
          </a>

          <a href="/game" className="glass-card p-6 text-center card-hover cursor-pointer">
            <div className="text-4xl mb-3">🎮</div>
            <h3 className="font-semibold">Games</h3>
            <p className="text-sm text-gray-600 mt-1">Learn by playing</p>
          </a>
        </motion.div>
      </div>
    </>
  );
}
