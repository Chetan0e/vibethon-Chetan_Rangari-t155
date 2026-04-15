"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { motion } from "framer-motion";
import { recordProgress } from "@/lib/progress";
import ModeTabs from "@/components/playground/ModeTabs";
import ControlSlider from "@/components/playground/ControlSlider";
import VisualizationPanel from "@/components/playground/VisualizationPanel";

type PlaygroundMode = "linearRegression" | "classification" | "clustering" | "neuralNetwork";
type OutputTab = "console" | "graph" | "explanation";

type PlaygroundScript = {
  id: PlaygroundMode;
  label: string;
  conceptTitle: string;
  explanation: string;
  trySuggestion: string;
  code: string;
  explainSteps: string[];
};

const scripts: Record<PlaygroundMode, PlaygroundScript> = {
  linearRegression: {
    id: "linearRegression",
    label: "Linear Regression",
    conceptTitle: "Predict Continuous Values",
    explanation: "Linear Regression learns a straight-line relationship between input and output.",
    trySuggestion: "Try this: Increase epochs and watch trend confidence improve.",
    code: `# Linear Regression Demo
import numpy as np

x = np.array([1, 2, 3, 4, 5])
y = np.array([3, 5, 7, 9, 11])
w, b = 2.0, 1.0

for epoch in range(5):
    pred = w * x + b
    loss = ((pred - y) ** 2).mean()
    print(f"epoch={epoch+1}, loss={loss:.4f}")

print("prediction for x=6:", w * 6 + b)`,
    explainSteps: [
      "Load simple input-output pairs where y changes linearly with x.",
      "Initialize model parameters (weight and bias).",
      "Predict values and compute mean squared error loss.",
      "Observe loss over epochs to understand training behavior.",
      "Use learned formula to predict a new point.",
    ],
  },
  classification: {
    id: "classification",
    label: "Classification",
    conceptTitle: "Predict Discrete Classes",
    explanation: "Classification assigns labels (e.g. spam/ham) based on learned patterns.",
    trySuggestion: "Try this: Raise data size and see accuracy stabilize.",
    code: `# Classification Demo
samples = [
    {"text": "free prize", "label": "spam"},
    {"text": "meeting notes", "label": "ham"},
]

def classify(text):
    spam_words = ["free", "win", "prize", "offer"]
    if any(word in text.lower() for word in spam_words):
        return "spam"
    return "ham"

for row in samples:
    pred = classify(row["text"])
    print(f'{row["text"]} -> {pred}')`,
    explainSteps: [
      "Define a small labeled dataset with spam and ham examples.",
      "Create rule-based features (presence of spam keywords).",
      "Map each message to a predicted class.",
      "Compare predicted vs expected labels for quick validation.",
    ],
  },
  clustering: {
    id: "clustering",
    label: "Clustering",
    conceptTitle: "Find Hidden Groups",
    explanation: "Clustering groups similar points when labels are unavailable.",
    trySuggestion: "Try this: Increase data size to produce clearer cluster boundaries.",
    code: `# K-means Style Clustering Demo
points = [(1,2), (1,3), (2,2), (8,8), (9,8), (8,9)]
centroids = [(1,2), (8,8)]

for epoch in range(4):
    print(f"epoch={epoch+1}: assigning points to nearest centroid")

print("final centroids:", centroids)`,
    explainSteps: [
      "Start with unlabeled points in 2D space.",
      "Initialize centroids as potential cluster centers.",
      "Assign each point to nearest centroid.",
      "Repeat assignments to stabilize groups.",
      "Interpret resulting groups as user/data segments.",
    ],
  },
  neuralNetwork: {
    id: "neuralNetwork",
    label: "Neural Network",
    conceptTitle: "Learn Non-linear Patterns",
    explanation: "Neural networks combine layers to model complex relationships in data.",
    trySuggestion: "Try this: Change learning rate to see training stability effects.",
    code: `# Tiny Neural Network Style Loop
weights = [0.2, -0.4, 0.7]
bias = 0.1
learning_rate = 0.05

for epoch in range(6):
    loss = 1.0 / (epoch + 1)
    print(f"epoch={epoch+1}, loss={loss:.4f}")

print("training complete")`,
    explainSteps: [
      "Initialize model weights and a bias term.",
      "Run forward-like passes and compute a synthetic loss.",
      "Observe loss decreasing over epochs as learning progresses.",
      "Learning rate controls update size and convergence speed.",
    ],
  },
};

export default function PlaygroundPage() {
  const [mode, setMode] = useState<PlaygroundMode>("linearRegression");
  const [code, setCode] = useState(scripts.linearRegression.code);
  const [outputTab, setOutputTab] = useState<OutputTab>("console");
  const [output, setOutput] = useState("Ready. Click Run Experiment to train your model.");
  const [running, setRunning] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [learningRate, setLearningRate] = useState(5);
  const [epochs, setEpochs] = useState(12);
  const [dataSize, setDataSize] = useState(60);
  const [accuracy, setAccuracy] = useState(76);
  const [loss, setLoss] = useState(0.46);

  const activeScript = scripts[mode];
  const modeList = Object.values(scripts).map((script) => ({ id: script.id, label: script.label }));

  const experimentLogs = useMemo(() => {
    const lines: string[] = [];
    const baseLoss = 1.2 - learningRate * 0.02;
    const accuracyBoost = Math.round(learningRate * 1.8 + dataSize * 0.12);

    for (let epoch = 1; epoch <= Math.min(epochs, 30); epoch += 1) {
      const epochLoss = Math.max(0.03, baseLoss / (1 + epoch * 0.34));
      const epochAcc = Math.min(99, 52 + accuracyBoost + epoch * 1.1);
      lines.push(`epoch=${epoch.toString().padStart(2, "0")} | loss=${epochLoss.toFixed(4)} | acc=${epochAcc.toFixed(1)}%`);
    }
    return lines;
  }, [dataSize, epochs, learningRate]);

  const linePoints = useMemo(() => {
    const slope = 1.4 + learningRate * 0.11;
    return new Array(8).fill(0).map((_, idx) => {
      const x = 1 + idx;
      const y = Math.min(10, 1.2 + (x * slope) / 2);
      return { x, y };
    });
  }, [learningRate]);

  const scatterPoints = useMemo(() => {
    return new Array(24).fill(0).map((_, idx) => {
      const group = (idx % 3 === 0 ? "a" : idx % 3 === 1 ? "b" : "c") as "a" | "b" | "c";
      const bias = group === "a" ? 1.2 : group === "b" ? 4.6 : 7.3;
      const variance = Math.max(0.5, 3.2 - learningRate * 0.15);
      const x = Math.max(0.6, Math.min(9.4, bias + ((idx * 1.17) % variance)));
      const y = Math.max(0.6, Math.min(9.4, (group === "a" ? 2 : group === "b" ? 6 : 3.6) + ((idx * 0.93) % variance)));
      return { x, y, group };
    });
  }, [learningRate]);

  const runPythonCode = async () => {
    setRunning(true);
    setOutput("Running script in Python runtime...\n");
    try {
      const response = await fetch("/api/playground/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      if (!response.ok) {
        setOutput(`Execution failed:\n${data.error || "Unknown error"}`);
        return;
      }

      const stdout = data.stdout ? `${data.stdout}\n` : "";
      const stderr = data.stderr ? `\n[stderr]\n${data.stderr}\n` : "";
      setOutput(`$ ${data.command}\n${stdout}${stderr}\nExit code: ${data.exitCode}`);
      await recordProgress({ type: "playground", refId: mode, xp: 12 });
    } catch (error) {
      setOutput(`Execution failed:\n${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setRunning(false);
    }
  };

  const runExperiment = async () => {
    setRunning(true);
    setOutputTab("console");
    setOutput("Training model...\n");

    for (let i = 0; i < experimentLogs.length; i += 1) {
      const delay = 85;
      await new Promise((resolve) => setTimeout(resolve, delay));
      setOutput((prev) => `${prev}${experimentLogs[i]}\n`);
    }

    const computedAccuracy = Math.min(99, Math.max(58, Math.round(56 + learningRate * 2 + epochs * 0.7 + dataSize * 0.12)));
    const computedLoss = Number(Math.max(0.03, 1.3 - learningRate * 0.06 - epochs * 0.02 - dataSize * 0.003).toFixed(4));
    setAccuracy(computedAccuracy);
    setLoss(computedLoss);
    setOutput((prev) => `${prev}\nTraining complete.\nFinal loss=${computedLoss} | Accuracy=${computedAccuracy}%`);
    setRunning(false);
    await recordProgress({ type: "playground", refId: `${mode}-experiment`, xp: 20, score: computedAccuracy });
  };

  const changeTemplate = (next: PlaygroundMode) => {
    setMode(next);
    setCode(scripts[next].code);
    setShowExplain(false);
    setOutputTab("console");
    setOutput("Template loaded. Adjust controls and run experiment.");
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setOutput("Code copied to clipboard.");
  };

  const resetCode = () => {
    setCode(activeScript.code);
    setOutput("Code reset to default script.");
  };

  const saveExperiment = () => {
    const payload = {
      mode,
      code,
      learningRate,
      epochs,
      dataSize,
      accuracy,
      loss,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem("bloom-playground-last-experiment", JSON.stringify(payload));
    setOutput("Experiment snapshot saved locally.");
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl shadow-purple-100/50 backdrop-blur-xl"
        >
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">Interactive Python Playground</h1>
          <p className="text-gray-600">A mini AI lab to run experiments, understand concepts, and visualize ML behavior in real time.</p>

          <div className="mt-4">
            <ModeTabs modes={modeList} activeMode={mode} onChange={changeTemplate} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr,0.85fr]">
          <Card className="space-y-4 border border-purple-100 bg-white/90">
            <div className="rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">{activeScript.label}</p>
              <h2 className="mt-1 text-xl font-bold text-gray-900">{activeScript.conceptTitle}</h2>
              <p className="mt-1 text-sm text-gray-700">{activeScript.explanation}</p>
              <p className="mt-2 text-sm font-medium text-indigo-700">{activeScript.trySuggestion}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button onClick={() => void runPythonCode()} disabled={running} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60">
                Run Python
              </button>
              <button onClick={() => void runExperiment()} disabled={running} className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60">
                {running ? "Training model..." : "Run Experiment"}
              </button>
              <button onClick={() => setShowExplain((prev) => !prev)} className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100">
                Explain This Code
              </button>
              <button onClick={() => void copyCode()} className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
                Copy Code
              </button>
              <button onClick={resetCode} className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
                Reset Code
              </button>
              <button onClick={saveExperiment} className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100">
                Save Experiment
              </button>
            </div>

            <h2 className="text-lg font-semibold text-gray-900">Code Editor</h2>
            <textarea
              className="h-[420px] w-full resize-none rounded-2xl border border-gray-800 bg-[#0b1025] p-4 font-mono text-sm text-emerald-200 shadow-inner shadow-purple-900/20"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />

            {showExplain && (
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <h3 className="text-sm font-semibold text-blue-800">Code Explanation (Step-by-step)</h3>
                <ul className="mt-2 space-y-1.5 text-sm text-blue-900">
                  {activeScript.explainSteps.map((step) => (
                    <li key={step}>• {step}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          <Card className="space-y-4 border border-indigo-100 bg-white/90">
            <div className="grid grid-cols-3 gap-2 rounded-xl bg-gray-100 p-1">
              {(["console", "graph", "explanation"] as OutputTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setOutputTab(tab)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    outputTab === tab ? "bg-white text-purple-700 shadow-sm" : "text-gray-600 hover:bg-white/60"
                  }`}
                >
                  {tab === "console" ? "Console" : tab === "graph" ? "Graph" : "Explanation"}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <ControlSlider label="Learning Rate" min={1} max={20} value={learningRate} unit="%" onChange={setLearningRate} />
              <ControlSlider label="Epochs" min={5} max={30} value={epochs} onChange={setEpochs} />
              <ControlSlider label="Data Size" min={20} max={200} value={dataSize} onChange={setDataSize} />
            </div>

            {outputTab === "console" && (
              <div className="rounded-2xl border border-gray-800 bg-black p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                  {running ? "Training model..." : "Model output"}
                </p>
                <div className="h-[300px] overflow-auto font-mono text-sm text-emerald-300">
                  <pre className="whitespace-pre-wrap">{output}</pre>
                </div>
              </div>
            )}

            {outputTab === "graph" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <VisualizationPanel mode={mode} linePoints={linePoints} scatterPoints={scatterPoints} accuracy={accuracy} />
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-purple-50 p-3">
                    <p className="text-xs uppercase tracking-wide text-purple-500">Model Accuracy</p>
                    <p className="text-2xl font-bold text-purple-700">{accuracy}%</p>
                  </div>
                  <div className="rounded-xl bg-indigo-50 p-3">
                    <p className="text-xs uppercase tracking-wide text-indigo-500">Final Loss</p>
                    <p className="text-2xl font-bold text-indigo-700">{loss}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {outputTab === "explanation" && (
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
                <h3 className="text-sm font-semibold text-indigo-800">Why this experiment matters</h3>
                <p className="mt-2 text-sm text-indigo-900">
                  This simulation lets you tune learning controls and observe how optimization signals change. It mirrors how ML engineers iterate: run, inspect loss/accuracy, and refine.
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-indigo-900">
                  <li>• Higher epochs usually reduce loss (until overfitting in real models).</li>
                  <li>• Learning rate controls update speed and stability.</li>
                  <li>• More data tends to improve generalization quality.</li>
                </ul>
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
