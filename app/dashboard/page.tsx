"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import AIAssistant from "@/components/AIAssistant";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { learningModules } from "@/lib/learningData";
import { User } from "@/types";

const levelRanges: Record<User["level"], { min: number; max: number; next: User["level"] | "Peak" }> = {
  Seed: { min: 0, max: 600, next: "Sprout" },
  Sprout: { min: 600, max: 1500, next: "Bloom" },
  Bloom: { min: 1500, max: 2200, next: "Peak" },
};

export default function Dashboard() {
  const [userData, setUserData] = useState<Partial<User> | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/");
        return;
      }
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setUserData(snap.data());
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const moduleCompletion = useMemo(() => {
    const done = (userData?.modulesCompleted || []).length;
    return Math.round((done / learningModules.length) * 100);
  }, [userData]);

  const quizAvg = useMemo(() => {
    const scores = Object.values(userData?.quizScores || {}) as number[];
    if (!scores.length) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [userData]);

  const insights = useMemo(() => {
    const level = userData?.level || "Seed";
    const xp = Number(userData?.xp || 0);
    const range = levelRanges[level];
    const modulesCompleted = (userData?.modulesCompleted || []).length;
    const quizScores = Object.values(userData?.quizScores || {}) as number[];
    const gameScores = Object.values(userData?.gameStats || {}) as number[];

    const levelProgress = Math.min(100, Math.max(0, Math.round(((xp - range.min) / (range.max - range.min)) * 100)));
    const xpToNext = Math.max(0, range.max - xp);
    const modulesRemaining = Math.max(0, learningModules.length - modulesCompleted);
    const quizAttempts = quizScores.length;
    const gamesPlayed = gameScores.length;
    const gameAvg = gameScores.length ? Math.round(gameScores.reduce((sum, score) => sum + score, 0) / gameScores.length) : 0;
    const activeDays = Math.min(7, Math.max(1, Number(userData?.streak || 1)));
    const consistency = Math.round((activeDays / 7) * 100);
    const engagementScore = Math.round((moduleCompletion * 0.4) + (quizAvg * 0.35) + (Math.min(100, gameAvg) * 0.25));

    const recommendedFocus =
      moduleCompletion < 60
        ? "Finish one more module this week to build stronger fundamentals."
        : quizAvg < 70
          ? "Revisit weak quiz areas and retake one adaptive quiz."
          : "Keep momentum with one module and one challenge game today.";

    return {
      level,
      xp,
      xpToNext,
      nextLevel: range.next,
      levelProgress,
      modulesCompleted,
      modulesRemaining,
      quizAttempts,
      gamesPlayed,
      gameAvg,
      activeDays,
      consistency,
      engagementScore,
      recommendedFocus,
    };
  }, [moduleCompletion, quizAvg, userData]);

  const progressData = [
    { label: "Learning Modules", value: moduleCompletion, color: "from-purple-500 to-fuchsia-500" },
    { label: "Quiz Mastery", value: quizAvg, color: "from-indigo-500 to-blue-500" },
    { label: "Game Performance", value: Math.min(100, insights.gameAvg), color: "from-emerald-500 to-green-500" },
    { label: "Weekly Consistency", value: insights.consistency, color: "from-amber-500 to-orange-500" },
  ];

  const quizPerformance = Object.entries(userData?.quizScores || {}).slice(-5).reverse();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="gradient-text text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl shadow-purple-100/60 backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-500">Performance Overview</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">Learning Dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm text-gray-600 md:text-base">
                Monitor learning outcomes, track growth signals, and follow focused next steps to level up faster.
              </p>
            </div>
            <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto">
              <Link href="/module" className="rounded-xl bg-purple-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-purple-300 transition hover:bg-purple-700">
                Continue Learning
              </Link>
              <Link href="/quiz" className="rounded-xl border border-purple-200 bg-white px-4 py-3 text-center text-sm font-semibold text-purple-700 transition hover:bg-purple-50">
                Practice Quiz
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border border-purple-100/70 bg-gradient-to-br from-white to-purple-50/80">
            <p className="text-sm text-gray-500">Total XP</p>
            <p className="mt-2 text-3xl font-bold gradient-text">{insights.xp}</p>
            <p className="mt-2 text-xs text-gray-500">Current Level: {insights.level}</p>
          </Card>
          <Card className="border border-indigo-100/80 bg-gradient-to-br from-white to-indigo-50/70">
            <p className="text-sm text-gray-500">Module Completion</p>
            <p className="mt-2 text-3xl font-bold text-indigo-700">{moduleCompletion}%</p>
            <p className="mt-2 text-xs text-gray-500">{insights.modulesCompleted}/{learningModules.length} modules completed</p>
          </Card>
          <Card className="border border-emerald-100/80 bg-gradient-to-br from-white to-emerald-50/80">
            <p className="text-sm text-gray-500">Learning Consistency</p>
            <p className="mt-2 text-3xl font-bold text-emerald-700">{insights.consistency}%</p>
            <p className="mt-2 text-xs text-gray-500">{insights.activeDays} active days in the last week</p>
          </Card>
          <Card className="border border-amber-100/80 bg-gradient-to-br from-white to-amber-50/80">
            <p className="text-sm text-gray-500">Current Streak</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">{userData?.streak || 1} days</p>
            <p className="mt-2 text-xs text-gray-500">Engagement score: {insights.engagementScore}%</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Growth Insights</h2>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                {insights.nextLevel === "Peak" ? "Top tier reached" : `${insights.xpToNext} XP to ${insights.nextLevel}`}
              </span>
            </div>
            <div className="mt-5 h-3 rounded-full bg-gray-100">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"
                style={{ width: `${insights.levelProgress}%` }}
              />
            </div>
            <div className="mt-6 space-y-4">
              {progressData.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
                    <span>{item.label}</span>
                    <span className="font-semibold text-gray-800">{item.value}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-100">
                    <div className={`h-2.5 rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Activity Snapshot</h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Quizzes Attempted</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{insights.quizAttempts}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Games Played</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{insights.gamesPlayed}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Quiz Mastery</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{quizAvg}%</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Modules Remaining</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{insights.modulesRemaining}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-purple-100 bg-purple-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">Recommended Focus</p>
              <p className="mt-2 text-sm text-purple-900">{insights.recommendedFocus}</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900">Recent Quiz Performance</h2>
            {quizPerformance.length ? (
              <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100">
                {quizPerformance.map(([quizId, score]) => (
                  <div key={quizId} className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 last:border-b-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{quizId.replace(/-/g, " ")}</p>
                      <p className="text-xs text-gray-500">Adaptive quiz track</p>
                    </div>
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">{Math.round(score)}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-5 text-sm text-gray-600">
                No quiz score snapshots yet. Complete a few quizzes to unlock detailed performance trends.
              </p>
            )}
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-gray-900">Badges & Actions</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {(userData?.badges || ["Beginner"]).map((badge: string) => (
                <span key={badge} className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                  {badge}
                </span>
              ))}
            </div>
            <div className="mt-6 space-y-2 text-sm">
              <Link href="/module" className="block rounded-xl bg-purple-50 px-4 py-2.5 font-medium text-purple-700 transition hover:bg-purple-100">
                Continue Modules
              </Link>
              <Link href="/quiz" className="block rounded-xl bg-indigo-50 px-4 py-2.5 font-medium text-indigo-700 transition hover:bg-indigo-100">
                Take a Quiz
              </Link>
              <Link href="/game" className="block rounded-xl bg-emerald-50 px-4 py-2.5 font-medium text-emerald-700 transition hover:bg-emerald-100">
                Play Games
              </Link>
              <Link href="/playground" className="block rounded-xl bg-blue-50 px-4 py-2.5 font-medium text-blue-700 transition hover:bg-blue-100">
                Open Playground
              </Link>
            </div>
          </Card>
        </div>

        <AIAssistant />
      </div>
    </>
  );
}
