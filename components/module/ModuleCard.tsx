"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Difficulty } from "@/types";

type ModuleCardProps = {
  level: Difficulty;
  moduleId: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  progress: number;
  topic: string;
};

export default function ModuleCard({
  level,
  moduleId,
  title,
  description,
  duration,
  difficulty,
  progress,
  topic,
}: ModuleCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <article className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur-xl transition hover:shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          </div>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{difficulty}</span>
        </div>

        <div className="mt-4 flex items-center gap-3 text-xs font-medium text-gray-500">
          <span className="rounded-full border border-gray-200 px-3 py-1">{duration}</span>
          <span>Progress: {progress}%</span>
        </div>

        <div className="mt-3 h-2.5 rounded-full bg-gray-100">
          <div className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" style={{ width: `${progress}%` }} />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/module/${level}/${moduleId}`}
            className="inline-flex rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:from-purple-700 hover:to-indigo-700"
          >
            Start Learning
          </Link>
          <Link
            href={`/quiz?mode=topic&topic=${encodeURIComponent(topic)}&autostart=1`}
            className="inline-flex rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
          >
            Quiz this Topic
          </Link>
        </div>
      </article>
    </motion.div>
  );
}
