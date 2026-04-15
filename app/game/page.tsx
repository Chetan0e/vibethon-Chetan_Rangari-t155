"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { addXP } from "@/lib/auth";

export default function Game() {
  const [lr, setLr] = useState(0.1);
  const [epochs, setEpochs] = useState(10);
  const [acc, setAcc] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const train = () => {
    setLoading(true);
    setLogs([]);
    let epoch = 0;

    const interval = setInterval(() => {
      epoch++;
      const loss = (Math.random() * 0.5).toFixed(3);
      const currentAcc = (Math.random() * 100).toFixed(2);
      
      setLogs((prev) => [
        ...prev,
        `Epoch ${epoch}: Loss ${loss} | Accuracy ${currentAcc}%`
      ]);

      if (epoch === epochs) {
        clearInterval(interval);
        const finalAcc = Math.min(95, lr * epochs * 10 + Math.random() * 15);
        setAcc(Number(finalAcc.toFixed(2)));
        setLoading(false);
        addXP(20);
      }
    }, 300);
  };

  return (
    <>
      <Navbar />

      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Train Your Model 🎮
          </h1>
          <p className="text-gray-600">Experience machine learning training in real-time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="neon-glow">
              <h2 className="text-2xl font-bold mb-6">Model Parameters</h2>

              <div className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2">
                    Learning Rate: {lr}
                  </label>
                  <input
                    type="range"
                    min="0.01"
                    max="1"
                    step="0.01"
                    value={lr}
                    onChange={(e) => setLr(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Controls how much the model changes in response to errors
                  </p>
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    Epochs: {epochs}
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={epochs}
                    onChange={(e) => setEpochs(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Number of times the model sees the entire dataset
                  </p>
                </div>

                <button
                  onClick={train}
                  disabled={loading}
                  className="w-full btn-primary py-4 rounded-xl font-semibold text-lg disabled:opacity-50"
                >
                  {loading ? "Training..." : "🚀 Train Model"}
                </button>
              </div>
            </Card>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Card className="neon-glow-green">
              <h2 className="text-2xl font-bold mb-4">Training Progress</h2>

              {acc > 0 && !loading && (
                <div className="p-6 bg-gradient-to-r from-green-50 to-purple-50 rounded-lg mb-6">
                  <p className="text-sm text-gray-600 mb-2">Final Accuracy:</p>
                  <p className="text-5xl font-bold gradient-text">
                    {acc}%
                  </p>
                </div>
              )}

              <div className="h-64 overflow-auto bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                {logs.length === 0 ? (
                  <p className="text-gray-500">Click "Train Model" to see training logs...</p>
                ) : (
                  logs.map((log, i) => (
                    <p key={i}>{log}</p>
                  ))
                )}
                {loading && <p className="animate-pulse">Training in progress...</p>}
              </div>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold mb-2">💡 Tips:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Higher learning rate = faster but less stable</li>
                  <li>More epochs = better accuracy (usually)</li>
                  <li>Too high learning rate may cause divergence</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
