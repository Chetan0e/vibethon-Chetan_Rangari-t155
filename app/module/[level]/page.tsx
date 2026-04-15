"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import ModuleCard from "@/components/module/ModuleCard";
import { auth, db } from "@/lib/firebase";
import { levelMeta, modulesByLevel } from "@/lib/modulePathwayData";
import { Difficulty, User } from "@/types";

const levels: Difficulty[] = ["beginner", "intermediate", "advanced"];

type LevelPageProps = {
  params: {
    level: string;
  };
};

export default function LevelModulesPage({ params }: LevelPageProps) {
  const level = params.level as Difficulty;
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const isValidLevel = levels.includes(level);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.exists() ? (snap.data() as Partial<User>) : null;
      setCompletedModules(data?.modulesCompleted || []);
    });

    return () => unsub();
  }, []);

  if (!isValidLevel) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-4xl p-6 md:p-10">
          <section className="rounded-3xl border border-white/70 bg-white/85 p-8 text-center shadow-md backdrop-blur-xl">
            <h1 className="text-2xl font-bold text-gray-900">Invalid pathway level</h1>
            <p className="mt-2 text-sm text-gray-600">Please pick Beginner, Intermediate, or Advanced to continue.</p>
            <Link href="/module" className="mt-5 inline-flex rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white">
              Go to levels
            </Link>
          </section>
        </main>
      </>
    );
  }

  const levelInfo = levelMeta.find((item) => item.id === level);
  const modules = modulesByLevel[level];

  const completionStats = useMemo(() => {
    const done = modules.filter((module) => completedModules.includes(module.id)).length;
    const progress = modules.length ? Math.round((done / modules.length) * 100) : 0;
    return { done, progress };
  }, [completedModules, modules]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl p-6 md:p-10">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/60 bg-white/85 p-6 shadow-xl shadow-purple-100/60 backdrop-blur-xl md:p-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Link href="/module" className="text-sm font-medium text-purple-600 hover:text-purple-700">
                ← Back to Levels
              </Link>
              <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
                {levelInfo?.icon} {levelInfo?.title} Pathway
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-gray-600 md:text-base">{levelInfo?.description}</p>
            </div>
            <div className="rounded-2xl border border-purple-100 bg-purple-50 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-purple-600">Path Progress</p>
              <p className="text-lg font-semibold text-purple-800">
                {completionStats.done}/{modules.length} modules complete
              </p>
            </div>
          </div>
          <div className="mt-5 h-2.5 rounded-full bg-gray-100">
            <div
              className={`h-2.5 rounded-full bg-gradient-to-r ${levelInfo?.highlight || "from-purple-500 to-indigo-500"}`}
              style={{ width: `${completionStats.progress}%` }}
            />
          </div>
        </motion.section>

        <section className="mt-7 grid grid-cols-1 gap-5">
          {modules.map((module, index) => {
            const completed = completedModules.includes(module.id);
            const progress = completed ? 100 : 0;

            return (
              <ModuleCard
                key={module.id}
                level={level}
                moduleId={module.id}
                title={module.title}
                description={module.description}
                duration={module.duration}
                difficulty={module.difficulty}
                progress={progress}
                topic={module.title}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}
