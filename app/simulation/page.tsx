"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { recordProgress } from "@/lib/progress";

const spamKeywords = ["win", "free", "offer", "urgent", "bonus", "crypto", "prize", "click"];

export default function SimulationPage() {
  const [message, setMessage] = useState("");
  const [prediction, setPrediction] = useState<null | "Spam" | "Not Spam">(null);
  const [confidence, setConfidence] = useState(0);
  const [reasoning, setReasoning] = useState<string[]>([]);

  const keywordMatches = useMemo(
    () => spamKeywords.filter((word) => message.toLowerCase().includes(word)),
    [message],
  );

  const runSimulation = async () => {
    const score = Math.min(96, keywordMatches.length * 18 + (message.length > 120 ? 12 : 5));
    const isSpam = keywordMatches.length >= 2;
    setPrediction(isSpam ? "Spam" : "Not Spam");
    setConfidence(isSpam ? Math.max(55, score) : Math.max(52, 100 - score));
    setReasoning([
      `Detected suspicious keywords: ${keywordMatches.length > 0 ? keywordMatches.join(", ") : "none"}`,
      isSpam ? "High promotional intent and urgency markers increase spam likelihood." : "Message appears informational and low-risk.",
      `Decision threshold applied at confidence >= 55% for spam classification.`,
    ]);

    await recordProgress({
      type: "simulation",
      refId: "spam-detection",
      xp: 22,
      score: isSpam ? 1 : 0,
      extras: { lastSimulationConfidence: isSpam ? Math.max(55, score) : Math.max(52, 100 - score) },
    });
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-5xl p-6 md:p-10">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Real-World Simulation: Spam Detection</h1>
        <p className="text-gray-600">Try realistic text samples and inspect model-style reasoning.</p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border border-purple-100">
            <h2 className="mb-3 text-xl font-semibold">Input Message</h2>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Paste an email or chat message..."
              className="h-52 w-full rounded-xl border border-gray-200 p-4 text-sm"
            />
            <button
              onClick={() => void runSimulation()}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-semibold text-white"
            >
              Analyze Message
            </button>
          </Card>

          <Card className="border border-blue-100">
            <h2 className="mb-3 text-xl font-semibold">Prediction Output</h2>
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm text-gray-600">Predicted Label</p>
              <p className={`text-3xl font-bold ${prediction === "Spam" ? "text-red-600" : "text-green-600"}`}>
                {prediction ?? "No prediction yet"}
              </p>
              <p className="mt-2 text-sm text-gray-600">Confidence: {confidence}%</p>
              <div className="mt-2 h-3 rounded-full bg-white">
                <div className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" style={{ width: `${confidence}%` }} />
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-gray-50 p-4">
              <p className="mb-2 text-sm font-semibold text-gray-700">Reasoning</p>
              <ul className="space-y-2 text-sm text-gray-600">
                {reasoning.length > 0 ? reasoning.map((item, idx) => <li key={idx}>- {item}</li>) : <li>- Run analysis to see reasoning output.</li>}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
