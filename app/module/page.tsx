"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import LevelCard from "@/components/module/LevelCard";
import { levelMeta, modulesByLevel } from "@/lib/modulePathwayData";

export default function Module() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl p-6 md:p-10">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl shadow-purple-100/60 backdrop-blur-xl md:p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-500">AIML Learning Pathway</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">Choose Your Learning Level</h1>
          <p className="mt-3 max-w-3xl text-sm text-gray-600 md:text-base">
            Start with a track that matches your experience. Each level contains a curated sequence of modules so your growth feels structured and clear.
          </p>
        </motion.section>

        <section className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {levelMeta.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <LevelCard
                level={item.id}
                title={item.title}
                icon={item.icon}
                description={item.description}
                moduleCount={modulesByLevel[item.id].length}
                difficultyLabel={item.difficultyLabel}
                highlight={item.highlight}
              />
            </motion.div>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-purple-100 bg-white/75 p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-gray-900">Pathway Design Principles</h2>
          <div className="mt-4 grid gap-3 text-sm text-gray-600 md:grid-cols-3">
            <p className="rounded-xl bg-purple-50 p-3">Concept-first modules for strong intuition before equations.</p>
            <p className="rounded-xl bg-indigo-50 p-3">Hands-on examples and visual aids to make abstract topics concrete.</p>
            <p className="rounded-xl bg-blue-50 p-3">Short, focused lessons to keep momentum during hackathon pace.</p>
          </div>
        </section>
      </main>
    </>
  );
}
