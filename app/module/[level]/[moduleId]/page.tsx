"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import VideoEmbedCard from "@/components/module/VideoEmbedCard";
import { findModule, levelMeta } from "@/lib/modulePathwayData";
import { recordProgress } from "@/lib/progress";
import { Difficulty } from "@/types";

const levels: Difficulty[] = ["beginner", "intermediate", "advanced"];

type ModuleDetailPageProps = {
  params: {
    level: string;
    moduleId: string;
  };
};

export default function ModuleDetailPage({ params }: ModuleDetailPageProps) {
  const level = params.level as Difficulty;
  const isValidLevel = levels.includes(level);
  const module = isValidLevel ? findModule(level, params.moduleId) : undefined;
  const [sliderValue, setSliderValue] = useState(55);
  const [completed, setCompleted] = useState(false);

  if (!module) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-4xl p-6 md:p-10">
          <section className="rounded-3xl border border-white/70 bg-white/85 p-8 text-center shadow-md backdrop-blur-xl">
            <h1 className="text-2xl font-bold text-gray-900">Module not found</h1>
            <p className="mt-2 text-sm text-gray-600">This module may not exist in the selected pathway.</p>
            <Link href={isValidLevel ? `/module/${level}` : "/module"} className="mt-5 inline-flex rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white">
              Back to pathway
            </Link>
          </section>
        </main>
      </>
    );
  }

  const levelInfo = levelMeta.find((item) => item.id === level);

  const dynamicVisualData = useMemo(() => {
    return module.visualDemoPoints.map((point, index) => ({
      ...point,
      value: Math.min(100, Math.max(5, point.value + Math.round((sliderValue - 50) * (0.25 + index * 0.08)))),
    }));
  }, [module.visualDemoPoints, sliderValue]);

  const onCompleteModule = async () => {
    await recordProgress({ type: "module", refId: module.id, xp: module.xpReward });
    setCompleted(true);
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl space-y-6 p-6 md:p-10">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl shadow-purple-100/70 backdrop-blur-xl md:p-8"
        >
          <Link href={`/module/${level}`} className="text-sm font-medium text-purple-600 hover:text-purple-700">
            ← Back to {levelInfo?.title} modules
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">{module.difficulty}</span>
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600">{module.duration}</span>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">+{module.xpReward} XP</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">{module.title}</h1>
          <p className="mt-3 max-w-3xl text-sm text-gray-600 md:text-base">{module.description}</p>
        </motion.section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <article className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur-xl xl:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-900">1) Concept</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700 md:text-base">
              {module.conceptParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-5 space-y-2">
              {module.conceptBullets.map((point) => (
                <li key={point} className="rounded-xl bg-gray-50 px-4 py-2 text-sm text-gray-700">
                  • {point}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-gray-900">Learning Progress</h2>
            <p className="mt-2 text-sm text-gray-600">Mark this module as complete once you finish concept, visual, and videos.</p>
            <button
              onClick={onCompleteModule}
              disabled={completed}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:from-purple-700 hover:to-indigo-700 disabled:opacity-70"
            >
              {completed ? "Completed ✓" : "Mark as Complete"}
            </button>
          </article>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-gray-900">2) Visual Aid</h2>
          <p className="mt-2 text-sm text-gray-600">{module.visualAidDescription}</p>
          <div className="mt-4">
            <label className="text-sm font-semibold text-gray-700">Interactive confidence slider: {sliderValue}%</label>
            <input
              type="range"
              min={0}
              max={100}
              value={sliderValue}
              onChange={(event) => setSliderValue(Number(event.target.value))}
              className="mt-2 w-full"
            />
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {dynamicVisualData.map((point) => (
              <div key={point.label} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{point.label}</p>
                <p className="mt-2 text-xl font-bold text-gray-900">{point.value}%</p>
                <div className="mt-2 h-2 rounded-full bg-gray-200">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${point.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-gray-900">3) YouTube Learning</h2>
          <p className="mt-2 text-sm text-gray-600">Curated explainers to deepen your understanding quickly.</p>
          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {module.youtubeLinks.map((video) => (
              <VideoEmbedCard
                key={video.id}
                title={video.title}
                description={video.description}
                embedUrl={video.embedUrl}
              />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <article className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-gray-900">4) Example</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">{module.realWorldUseCase}</p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-gray-900 p-4 text-xs text-gray-100">
              <code>{module.codeSnippet}</code>
            </pre>
          </article>

          <article className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-gray-900">5) Quick Summary</h2>
            <ul className="mt-4 space-y-2">
              {module.summary.map((point) => (
                <li key={point} className="rounded-xl bg-purple-50 px-4 py-2 text-sm text-purple-900">
                  • {point}
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
              <p className="text-sm font-medium text-indigo-800">Ready to test this module?</p>
              <p className="mt-1 text-xs text-indigo-700">Jump directly into a topic quiz generated for this exact module.</p>
              <Link
                href={`/quiz?mode=topic&topic=${encodeURIComponent(module.title)}&autostart=1`}
                className="mt-3 inline-flex rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Start Topic Quiz
              </Link>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
