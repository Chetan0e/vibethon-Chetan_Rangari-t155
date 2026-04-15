"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Difficulty } from "@/types";

type LevelCardProps = {
  level: Difficulty;
  title: string;
  icon: string;
  description: string;
  moduleCount: number;
  difficultyLabel: string;
  highlight: string;
};

export default function LevelCard({
  level,
  title,
  icon,
  description,
  moduleCount,
  difficultyLabel,
  highlight,
}: LevelCardProps) {
  return (
    <motion.div whileHover={{ y: -5, scale: 1.01 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
      <Link
        href={`/module/${level}`}
        className="group relative block overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl"
      >
        <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${highlight}`} />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-3xl">{icon}</p>
            <h3 className="mt-3 text-2xl font-bold text-gray-900">{title}</h3>
          </div>
          <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
            {difficultyLabel}
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">{description}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">{moduleCount} modules</span>
          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 transition group-hover:bg-purple-100">
            Explore path
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
