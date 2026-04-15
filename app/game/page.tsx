"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { motion } from "framer-motion";
import { recordProgress } from "@/lib/progress";

const draggableItems = [
  { id: "1", label: "Win a free iPhone now!", category: "spam" },
  { id: "2", label: "Your receipt from Bloom Pro", category: "ham" },
  { id: "3", label: "Limited crypto offer inside", category: "spam" },
  { id: "4", label: "Team meeting notes attached", category: "ham" },
];

export default function Game() {
  const [classificationScore, setClassificationScore] = useState(0);
  const [answered, setAnswered] = useState<string[]>([]);
  const [layers, setLayers] = useState(2);
  const [learningRate, setLearningRate] = useState(0.08);
  const [neurons, setNeurons] = useState(32);
  const accuracy = Math.min(98, Math.round(42 + layers * 8 + neurons * 0.45 - learningRate * 100));

  const classify = async (id: string, guess: "spam" | "ham", actual: string) => {
    if (answered.includes(id)) return;
    const correct = guess === actual;
    if (correct) setClassificationScore((prev) => prev + 1);
    setAnswered((prev) => [...prev, id]);
    await recordProgress({
      type: "game",
      refId: "classification-game",
      xp: correct ? 8 : 2,
      score: correct ? 1 : 0,
    });
  };

  const saveNeuralScore = async () => {
    await recordProgress({
      type: "game",
      refId: "neural-sim",
      xp: 20,
      score: accuracy,
      extras: { neuralAccuracy: accuracy },
    });
  };

  return (
    <>
      <Navbar />

      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Mini-Games Lab
          </h1>
          <p className="text-gray-600">Play focused games to learn core ML ideas with instant feedback.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card className="border border-purple-100">
            <h2 className="mb-2 text-2xl font-bold">Game 1: Classification Sort</h2>
            <p className="mb-4 text-sm text-gray-600">Classify each message as Spam or Not Spam.</p>
            <p className="mb-4 rounded-lg bg-purple-50 px-3 py-2 text-sm font-semibold text-purple-700">
              Score: {classificationScore}/{draggableItems.length}
            </p>
            <div className="space-y-3">
              {draggableItems.map((item) => (
                <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-4">
                  <p className="mb-3 text-sm text-gray-800">{item.label}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => classify(item.id, "spam", item.category)}
                      className="rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-200"
                    >
                      Spam
                    </button>
                    <button
                      onClick={() => classify(item.id, "ham", item.category)}
                      className="rounded-lg bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 transition hover:bg-green-200"
                    >
                      Not Spam
                    </button>
                    {answered.includes(item.id) && (
                      <span className="ml-auto rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                        Correct: {item.category === "spam" ? "Spam" : "Not Spam"}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border border-indigo-100">
            <h2 className="mb-2 text-2xl font-bold">Game 2: Neural Network Simulator</h2>
            <p className="mb-4 text-sm text-gray-600">Tune model architecture and view simulated accuracy.</p>
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Hidden Layers: {layers}</label>
                <input type="range" min="1" max="6" value={layers} onChange={(e) => setLayers(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Neurons per Layer: {neurons}</label>
                <input type="range" min="8" max="128" step="8" value={neurons} onChange={(e) => setNeurons(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Learning Rate: {learningRate.toFixed(2)}</label>
                <input
                  type="range"
                  min="0.01"
                  max="0.3"
                  step="0.01"
                  value={learningRate}
                  onChange={(e) => setLearningRate(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <motion.div
                key={`${layers}-${neurons}-${learningRate}`}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-5"
              >
                <p className="text-sm text-gray-600">Estimated accuracy</p>
                <p className="text-5xl font-bold gradient-text">{accuracy}%</p>
                <div className="mt-3 h-3 rounded-full bg-white">
                  <div className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" style={{ width: `${accuracy}%` }} />
                </div>
              </motion.div>

              <button onClick={saveNeuralScore} className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-semibold text-white">
                Save Neural Score (+20 XP)
              </button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
