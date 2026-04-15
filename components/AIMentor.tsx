"use client";

import { useState } from "react";

export default function AIMentor() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    
    // Simulate AI response (replace with real API call)
    setTimeout(() => {
      const responses: Record<string, string> = {
        "overfitting": "Overfitting happens when a model learns the training data too well, including noise and outliers. This causes poor performance on new, unseen data.",
        "regression": "Linear regression is a supervised learning algorithm used to predict a continuous target variable based on one or more input features by fitting a linear equation.",
        "neural": "Neural networks are computing systems inspired by biological neural networks. They consist of layers of interconnected nodes (neurons) that process information.",
        "classification": "Classification is a type of supervised learning where the goal is to predict categorical labels for input data.",
        "default": "This is a fundamental concept in AI/ML. Let me explain: it involves understanding patterns in data and making predictions based on those patterns.",
      };

      const lowerQ = question.toLowerCase();
      let response = responses.default;
      
      for (const [key, value] of Object.entries(responses)) {
        if (lowerQ.includes(key) && key !== "default") {
          response = value;
          break;
        }
      }

      setAnswer(response);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="glass p-6 mt-6 neon-glow">
      <h2 className="font-bold text-xl mb-4">🤖 AI Mentor</h2>

      <input
        className="w-full p-3 rounded-lg border bg-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
        placeholder="Ask anything about AI/ML..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && askAI()}
      />

      <button
        onClick={askAI}
        disabled={loading}
        className="btn-primary w-full px-4 py-3 mt-3 rounded-lg font-semibold"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <div className="mt-4 p-4 bg-purple-50 rounded-lg text-gray-700 animate-fade-in">
          {answer}
        </div>
      )}
    </div>
  );
}
