"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import AIAssistant from "@/components/AIAssistant";
import AnimatedLogo from "@/components/AnimatedLogo";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { modulesByLevel } from "@/lib/modulePathwayData";
import { User } from "@/types";

const levelRanges: Record<User["level"], { min: number; max: number; next: User["level"] | "Peak" }> = {
  Seed: { min: 0, max: 600, next: "Sprout" },
  Sprout: { min: 600, max: 1500, next: "Bloom" },
  Bloom: { min: 1500, max: 2200, next: "Peak" },
};

const allPathwayModuleIds = new Set(
  Object.values(modulesByLevel)
    .flat()
    .map((module) => module.id),
);

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
      if (snap.exists()) {
        const data = snap.data();
        setUserData(data);
      } else {
        setUserData({
          xp: 0,
          level: "Seed",
          streak: 0,
          modulesCompleted: [],
          quizScores: {},
          gameStats: {},
          badges: ["Beginner"],
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const moduleCompletion = useMemo(() => {
    const completed = userData?.modulesCompleted || [];
    const normalizedCompleted = new Set(completed.filter((moduleId) => allPathwayModuleIds.has(moduleId)));

    if (!allPathwayModuleIds.size) return 0;
    return Math.round((normalizedCompleted.size / allPathwayModuleIds.size) * 100);
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
    const modulesCompletedSet = new Set(
      (userData?.modulesCompleted || []).filter((moduleId) => allPathwayModuleIds.has(moduleId)),
    );
    const modulesCompleted = modulesCompletedSet.size;
    const quizScores = Object.values(userData?.quizScores || {}) as number[];
    const gameScores = Object.values(userData?.gameStats || {}) as number[];

    const levelProgress = Math.min(100, Math.max(0, Math.round(((xp - range.min) / (range.max - range.min)) * 100)));
    const xpToNext = Math.max(0, range.max - xp);
    const totalModules = allPathwayModuleIds.size;
    const modulesRemaining = Math.max(0, totalModules - modulesCompleted);
    const quizAttempts = quizScores.length;
    const gamesPlayed = gameScores.length;
    const gameAvg = gameScores.length ? Math.round(gameScores.reduce((sum, score) => sum + score, 0) / gameScores.length) : 0;
    const activeDays = Math.min(7, Math.max(0, Number(userData?.streak || 0)));
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
      totalModules,
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
    <div className="min-h-screen bg-gray-50/50 pb-12">
      <Navbar />
      <div className="w-full px-6 lg:px-12 pt-8 space-y-6 max-w-[1600px] mx-auto">
        {/* Top Section */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-gray-200/60 bg-white/80 p-6 md:p-8 shadow-sm backdrop-blur-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-gray-100 flex items-center justify-center">
              <AnimatedLogo size={42} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Learning Dashboard</h1>
              <p className="mt-1 text-gray-500 text-sm md:text-base">
                Welcome back. Track your progress, continue your modules, and stay consistent.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
             <Link href="/module" className="rounded-xl bg-gray-900 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 hover:-translate-y-0.5">
               Continue Learning
             </Link>
             <Link href="/quiz" className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-center text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-0.5">
               Practice Quiz
             </Link>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-2xl p-6 shadow-sm border border-gray-100/80 bg-white hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-purple-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Total XP</p>
              <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">⚡</div>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">{insights.xp}</p>
            <p className="mt-1.5 text-xs font-medium text-gray-500">Current Level: <span className="text-purple-600">{insights.level}</span></p>
          </Card>
          
          <Card className="rounded-2xl p-6 shadow-sm border border-gray-100/80 bg-white hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Module Completion</p>
              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">📚</div>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">{moduleCompletion}%</p>
            <p className="mt-1.5 text-xs font-medium text-gray-500">
              {insights.modulesCompleted} / {insights.totalModules} modules
            </p>
          </Card>

          <Card className="rounded-2xl p-6 shadow-sm border border-gray-100/80 bg-white hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Learning Consistency</p>
              <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">📈</div>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">{insights.consistency}%</p>
            <p className="mt-1.5 text-xs font-medium text-gray-500">{insights.activeDays} days this week</p>
          </Card>

          <Card className="rounded-2xl p-6 shadow-sm border border-gray-100/80 bg-white hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Current Streak</p>
              <div className="h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">🔥</div>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">{userData?.streak || 0} <span className="text-lg text-gray-400 font-medium tracking-normal">days</span></p>
            <p className="mt-1.5 text-xs font-medium text-gray-500">Engagement: <span className="text-orange-600">{insights.engagementScore}%</span></p>
          </Card>
        </div>

        {/* Main Grid: 70/30 Split */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[7fr_3fr]">
          
          {/* LEFT 70% */}
          <div className="space-y-6">
            <Card className="rounded-2xl p-6 shadow-sm bg-white border border-gray-200/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <h2 className="text-lg font-semibold text-gray-900">Growth Insights</h2>
                <span className="inline-flex w-fit items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 border border-purple-100/50">
                  {insights.nextLevel === "Peak" ? "Top Tier Reached 🎉" : `${insights.xpToNext} XP to ${insights.nextLevel}`}
                </span>
              </div>
              <div className="mb-8">
                <div className="flex items-center justify-between text-sm mb-2 text-gray-600">
                  <span className="font-medium">Overall Progress</span>
                  <span className="font-semibold text-gray-900">{insights.levelProgress}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-1000" style={{ width: `${insights.levelProgress}%` }} />
                </div>
              </div>

              <div className="space-y-5">
                {progressData.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-600">{item.label}</span>
                      <span className="font-semibold text-gray-900">{item.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000`} style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-2xl p-6 shadow-sm bg-white border border-gray-200/60">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">Recent Quiz Performance</h2>
              {quizPerformance.length ? (
                <div className="border border-gray-100/80 rounded-xl overflow-hidden divide-y divide-gray-50/50">
                  {quizPerformance.map(([quizId, score]) => (
                    <div key={quizId} className="flex items-center justify-between bg-white px-5 py-4 hover:bg-gray-50/50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{quizId.replace(/-/g, " ")}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Adaptive Assessment</p>
                      </div>
                      <span className="rounded-full bg-gray-50/80 px-3 py-1 text-xs font-semibold text-gray-700 border border-gray-100">{Math.round(score)}%</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-6 text-center text-sm text-gray-500">
                  <p>No quiz score snapshots yet.</p>
                  <p className="mt-1">Complete a few quizzes to unlock detailed performance trends.</p>
                </div>
              )}
            </Card>
          </div>

          {/* RIGHT 30% */}
          <div className="space-y-6">
            <Card className="rounded-2xl p-6 shadow-sm bg-white border border-gray-200/60">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">Activity Snapshot</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-xl border border-gray-100/80 bg-gray-50/30 p-4 transition-colors hover:border-gray-200/80">
                  <p className="text-xs font-medium text-gray-500">Quizzes Attempted</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{insights.quizAttempts}</p>
                </div>
                <div className="rounded-xl border border-gray-100/80 bg-gray-50/30 p-4 transition-colors hover:border-gray-200/80">
                  <p className="text-xs font-medium text-gray-500">Games Played</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{insights.gamesPlayed}</p>
                </div>
                <div className="rounded-xl border border-gray-100/80 bg-gray-50/30 p-4 transition-colors hover:border-gray-200/80">
                  <p className="text-xs font-medium text-gray-500">Quiz Mastery</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{quizAvg}%</p>
                </div>
                <div className="rounded-xl border border-gray-100/80 bg-gray-50/30 p-4 transition-colors hover:border-gray-200/80">
                  <p className="text-xs font-medium text-gray-500">Modules Remaining</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{insights.modulesRemaining}</p>
                </div>
              </div>
              <div className="mt-5 rounded-xl border border-purple-100 bg-purple-50/50 p-4 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-1 bg-purple-400"></div>
                <p className="text-xs font-semibold text-purple-700">Recommended Focus</p>
                <p className="mt-1.5 text-sm text-gray-700 leading-relaxed">{insights.recommendedFocus}</p>
              </div>
            </Card>

            <Card className="rounded-2xl p-6 shadow-sm bg-white border border-gray-200/60">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Badges & Actions</h2>
              <div className="mb-6 flex flex-wrap gap-2">
                {(userData?.badges || ["Beginner"]).map((badge: string) => (
                  <span key={badge} className="rounded-full border border-orange-200/60 bg-orange-50/50 px-3 py-1 text-xs font-medium text-orange-700 shadow-sm">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="space-y-3 mt-6">
                <Link href="/module" className="flex items-center justify-between rounded-xl bg-gray-50/80 border border-gray-100/80 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-gray-900 shadow-sm">
                  <span>Continue Modules</span>
                  <span className="text-gray-400">→</span>
                </Link>
                <Link href="/quiz" className="flex items-center justify-between rounded-xl bg-gray-50/80 border border-gray-100/80 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-gray-900 shadow-sm">
                  <span>Take a Quiz</span>
                  <span className="text-gray-400">→</span>
                </Link>
                <Link href="/game" className="flex items-center justify-between rounded-xl bg-gray-50/80 border border-gray-100/80 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-gray-900 shadow-sm">
                  <span>Play Games</span>
                  <span className="text-gray-400">→</span>
                </Link>
              </div>
            </Card>
          </div>
        </div>

        <AIAssistant />
      </div>
    </div>
  );
}
