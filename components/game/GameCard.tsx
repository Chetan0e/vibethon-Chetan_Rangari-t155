"use client";

import { motion } from "framer-motion";

type GameCardProps = {
  icon: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium";
  xpReward: number;
  active: boolean;
  onPlay: () => void;
};

export default function GameCard({
  icon,
  title,
  description,
  difficulty,
  xpReward,
  active,
  onPlay,
}: GameCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      className={`rounded-3xl border bg-white/80 p-5 shadow-lg backdrop-blur-xl transition ${
        active
          ? "border-purple-300 shadow-purple-200/60 ring-2 ring-purple-200/70"
          : "border-white/70 hover:border-purple-200 hover:shadow-purple-100/60"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-3xl">{icon}</p>
          <h3 className="mt-2 text-lg font-bold text-gray-900">{title}</h3>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            difficulty === "Easy" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
          }`}
        >
          {difficulty}
        </span>
      </div>
      <p className="mt-3 text-sm text-gray-600">{description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
          +{xpReward} XP
        </span>
        <button
          onClick={onPlay}
          className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:from-purple-700 hover:to-indigo-700"
        >
          {active ? "Playing" : "Play"}
        </button>
      </div>
    </motion.article>
  );
}
