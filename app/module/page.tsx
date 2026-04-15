"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { learningModules } from "@/lib/learningData";
import { recordProgress } from "@/lib/progress";
import { Difficulty } from "@/types";
import { motion } from "framer-motion";

export default function Module() {
  const [level, setLevel] = useState<Difficulty>("beginner");
  const [slider, setSlider] = useState(45);
  const [showDiagram, setShowDiagram] = useState(true);
  const modules = useMemo(() => learningModules.filter((item) => item.level === level), [level]);

  const completeModule = async (moduleId: string, xpReward: number) => {
    await recordProgress({ type: "module", refId: moduleId, xp: xpReward });
  };

  return (
    <>
      <Navbar />

      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Structured Learning Modules
          </h1>
          <p className="text-gray-600">Beginner to advanced AI/ML concepts with visuals, examples, and videos.</p>
        </motion.div>

        <div className="mt-6 flex flex-wrap gap-3">
          {(["beginner", "intermediate", "advanced"] as Difficulty[]).map((item) => (
            <button
              key={item}
              onClick={() => setLevel(item)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                item === level ? "bg-purple-600 text-white shadow-md" : "bg-white text-gray-700 hover:bg-purple-50"
              }`}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-5">
            {modules.map((module, index) => (
              <motion.div key={module.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}>
                <Card className="border border-purple-100">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{module.title}</h2>
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                      +{module.xpReward} XP
                    </span>
                  </div>
                  <p className="leading-relaxed text-gray-700">{module.concept}</p>

                  <div className="mt-4 rounded-xl bg-indigo-50 p-4">
                    <p className="text-sm font-semibold text-indigo-800">Real-world example</p>
                    <p className="mt-1 text-sm text-indigo-700">{module.realWorldExample}</p>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {module.videos.map((video) => (
                      <div key={video.id} className="overflow-hidden rounded-xl border border-gray-200">
                        <iframe
                          className="h-44 w-full"
                          src={video.url}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <p className="border-t bg-white px-3 py-2 text-sm font-medium text-gray-700">{video.title}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => completeModule(module.id, module.xpReward)}
                    className="mt-5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 font-semibold text-white transition hover:scale-[1.01]"
                  >
                    Mark Complete
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="border border-blue-100">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold">Interactive Visual Aid</h3>
                <button
                  onClick={() => setShowDiagram((prev) => !prev)}
                  className="rounded-lg border px-3 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  {showDiagram ? "Hide Diagram" : "Show Diagram"}
                </button>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-semibold text-gray-700">Model confidence slider: {slider}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={slider}
                  onChange={(event) => setSlider(Number(event.target.value))}
                  className="w-full"
                />
              </div>

              {showDiagram && (
                <div className="space-y-3 rounded-xl bg-blue-50 p-4">
                  <p className="text-sm font-semibold text-blue-700">Pipeline Diagram</p>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    {["Data", "Features", "Model", "Prediction"].map((step, i) => (
                      <div key={step} className="rounded-lg bg-white p-2 shadow-sm">
                        <p className="font-medium text-gray-800">{step}</p>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                          <motion.div
                            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                            initial={{ width: "0%" }}
                            animate={{ width: `${Math.min(100, slider - i * 10)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900">Quick Concept Recap</h3>
              <p className="mt-2 text-sm text-gray-600">{modules[0]?.visualLabel}</p>
              <div className="mt-4 space-y-3">
                {[18, 35, 52, 67, 81].map((v, index) => (
                  <div key={index}>
                    <div className="mb-1 flex justify-between text-xs text-gray-500">
                      <span>Epoch {index + 1}</span>
                      <span>{v}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600" style={{ width: `${v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
