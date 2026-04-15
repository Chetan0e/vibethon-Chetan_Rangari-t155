"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { motion } from "framer-motion";
import { recordProgress } from "@/lib/progress";

const scripts = {
  linearRegression: `# Linear Regression Demo
import random

X = [1, 2, 3, 4, 5]
y = [3, 5, 7, 9, 11]

def predict(x):
    return 2 * x + 1

for x in X:
    print(f"x={x}, prediction={predict(x)}")
`,
  classification: `# Classification Demo
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
    print(f'{row["text"]} -> {pred}')
`,
};

export default function PlaygroundPage() {
  const [template, setTemplate] = useState<keyof typeof scripts>("linearRegression");
  const [code, setCode] = useState(scripts.linearRegression);
  const [output, setOutput] = useState("Run code to see output...");
  const [running, setRunning] = useState(false);

  const runCode = async () => {
    setRunning(true);
    setOutput("Executing Python simulation...");
    setTimeout(async () => {
      const lines = code
        .split("\n")
        .filter((line) => line.trim() && !line.trim().startsWith("#"))
        .slice(0, 7);
      setOutput(`$ python main.py\n${lines.join("\n")}\n\nExecution complete. (Simulated runtime)`);
      setRunning(false);
      await recordProgress({ type: "playground", refId: template, xp: 18 });
    }, 900);
  };

  const changeTemplate = (next: keyof typeof scripts) => {
    setTemplate(next);
    setCode(scripts[next]);
    setOutput("Template loaded. Run code to see output...");
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl p-6 md:p-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">Interactive Python Playground</h1>
          <p className="text-gray-600">Edit ML scripts, run simulated execution, and learn by experimentation.</p>
        </motion.div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => changeTemplate("linearRegression")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${template === "linearRegression" ? "bg-purple-600 text-white" : "bg-white"}`}
          >
            Linear Regression Script
          </button>
          <button
            onClick={() => changeTemplate("classification")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${template === "classification" ? "bg-purple-600 text-white" : "bg-white"}`}
          >
            Classification Script
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border border-purple-100">
            <h2 className="mb-3 text-xl font-semibold">Code Editor</h2>
            <textarea
              className="h-[420px] w-full resize-none rounded-xl border border-gray-200 bg-[#0f172a] p-4 font-mono text-sm text-green-300"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
          </Card>

          <Card className="border border-indigo-100">
            <h2 className="mb-3 text-xl font-semibold">Console Output</h2>
            <div className="mb-4 h-[340px] overflow-auto rounded-xl bg-black p-4 font-mono text-sm text-green-400">
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
            <button
              disabled={running}
              onClick={() => void runCode()}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-semibold text-white disabled:opacity-60"
            >
              {running ? "Running..." : "Run Python Code"}
            </button>
          </Card>
        </div>
      </div>
    </>
  );
}
