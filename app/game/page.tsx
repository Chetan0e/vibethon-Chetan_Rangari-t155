"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { motion } from "framer-motion";
import { recordProgress } from "@/lib/progress";
import GameCard from "@/components/game/GameCard";
import LearningInfoBox from "@/components/game/LearningInfoBox";
import EpochChart from "@/components/game/EpochChart";

type GameType = "classification" | "neural" | "clustering";
type Category = "spam" | "ham";

type ClassificationQuestion = {
  id: string;
  message: string;
  category: Category;
  reason: string;
};

type ClassificationLevel = {
  level: number;
  title: string;
  questions: ClassificationQuestion[];
};

const TIMER_SECONDS = 18;

const classificationLevels: ClassificationLevel[] = [
  {
    level: 1,
    title: "Easy Signals",
    questions: [
      { id: "l1-1", message: "Win a free iPhone now! Click this link!", category: "spam", reason: "Promotional urgency words like 'free' and 'win' are common spam signals." },
      { id: "l1-2", message: "Your Bloom class receipt is attached.", category: "ham", reason: "Transactional language with clear context usually indicates legitimate mail." },
      { id: "l1-3", message: "Limited crypto offer expires in 2 hours.", category: "spam", reason: "Pressure + offer language is a strong spam pattern." },
    ],
  },
  {
    level: 2,
    title: "Tricky Mixed Context",
    questions: [
      { id: "l2-1", message: "Reminder: verify your account to avoid suspension.", category: "spam", reason: "Threat-based urgency with account verification is a phishing-style signal." },
      { id: "l2-2", message: "Can we move tomorrow's project sync to 3 PM?", category: "ham", reason: "Natural conversational scheduling context points to non-spam." },
      { id: "l2-3", message: "Exclusive discount only for selected users this minute.", category: "spam", reason: "Overly exclusive promotional claims with urgency usually indicate spam." },
    ],
  },
  {
    level: 3,
    title: "Real-World Production Samples",
    questions: [
      { id: "l3-1", message: "Invoice #89421 generated. Download PDF from portal.", category: "ham", reason: "Structured billing references with portal context are likely legitimate." },
      { id: "l3-2", message: "Security alert: unusual login. Confirm password immediately here.", category: "spam", reason: "Credential harvesting language and suspicious call-to-action are key spam indicators." },
      { id: "l3-3", message: "Weekly team report draft ready for your comments.", category: "ham", reason: "Internal workflow language and collaboration context suggest non-spam communication." },
    ],
  },
];

const gameMeta = [
  {
    id: "classification" as const,
    icon: "🧠",
    title: "Spam vs Not Spam Arena",
    description: "Train your classification intuition with level-based message challenges.",
    difficulty: "Easy" as const,
    xp: 30,
  },
  {
    id: "neural" as const,
    icon: "🤖",
    title: "Neural Training Simulator",
    description: "Tune architecture controls and optimize model accuracy over epochs.",
    difficulty: "Medium" as const,
    xp: 35,
  },
  {
    id: "clustering" as const,
    icon: "📊",
    title: "Cluster Match Challenge",
    description: "Group data points into meaningful clusters to build segmentation intuition.",
    difficulty: "Easy" as const,
    xp: 20,
  },
];

export default function Game() {
  const [activeGame, setActiveGame] = useState<GameType>("classification");

  const [classificationLevel, setClassificationLevel] = useState(1);
  const [classificationIndex, setClassificationIndex] = useState(0);
  const [classificationScore, setClassificationScore] = useState(0);
  const [classificationXp, setClassificationXp] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [feedback, setFeedback] = useState("");
  const [feedbackTone, setFeedbackTone] = useState<"none" | "correct" | "wrong">("none");
  const [levelComplete, setLevelComplete] = useState(false);
  const [classificationDone, setClassificationDone] = useState(false);

  const [layers, setLayers] = useState(2);
  const [learningRate, setLearningRate] = useState(0.08);
  const [neurons, setNeurons] = useState(32);
  const [epochs, setEpochs] = useState(14);
  const [training, setTraining] = useState(false);
  const [epochLogs, setEpochLogs] = useState<string[]>([]);
  const [epochPoints, setEpochPoints] = useState<{ epoch: number; accuracy: number }[]>([]);
  const [neuralSaved, setNeuralSaved] = useState(false);

  const [clusterChoices, setClusterChoices] = useState<Record<string, "A" | "B" | "C" | undefined>>({});
  const [clusterResult, setClusterResult] = useState("");
  const [clusterDone, setClusterDone] = useState(false);

  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);

  const activeLevel = classificationLevels[classificationLevel - 1];
  const activeQuestion = activeLevel.questions[classificationIndex];

  const estimatedAccuracy = useMemo(
    () => Math.min(98, Math.round(44 + layers * 7.2 + neurons * 0.35 - learningRate * 115 + epochs * 0.25)),
    [epochs, layers, learningRate, neurons],
  );

  const performanceLabel = useMemo(() => {
    if (classificationScore >= 7 || estimatedAccuracy >= 92) return "Pro";
    if (classificationScore >= 4 || estimatedAccuracy >= 80) return "Improving";
    return "Beginner";
  }, [classificationScore, estimatedAccuracy]);

  const playTone = (kind: "click" | "success" | "error") => {
    if (typeof window === "undefined") return;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;

    const context = new AudioCtx();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.type = kind === "click" ? "triangle" : kind === "success" ? "sine" : "square";
    oscillator.frequency.value = kind === "click" ? 420 : kind === "success" ? 640 : 220;
    gain.gain.value = 0.05;
    oscillator.start();
    oscillator.stop(context.currentTime + 0.08);
  };

  useEffect(() => {
    if (classificationDone || levelComplete) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleClassificationAnswer("ham", true);
          return TIMER_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [classificationDone, levelComplete, classificationIndex, classificationLevel]);

  const handleClassificationAnswer = async (guess: Category, timeout = false) => {
    if (!activeQuestion || levelComplete || classificationDone) return;
    playTone("click");

    const correct = !timeout && guess === activeQuestion.category;
    const nextScore = correct ? classificationScore + 1 : classificationScore;
    const earnedXp = correct ? 10 : 3;

    if (correct) {
      setClassificationScore(nextScore);
      setClassificationXp((prev) => prev + earnedXp);
      setFeedbackTone("correct");
      playTone("success");
      setFeedback(`✔ Correct! ${activeQuestion.reason}`);
    } else {
      setClassificationXp((prev) => prev + 2);
      setFeedbackTone("wrong");
      playTone("error");
      setFeedback(
        timeout
          ? `⏰ Time up! Correct answer: ${activeQuestion.category === "spam" ? "Spam" : "Not Spam"}. ${activeQuestion.reason}`
          : `❌ Not quite. ${activeQuestion.reason}`,
      );
    }

    await recordProgress({
      type: "game",
      refId: `classification-level-${classificationLevel}`,
      xp: earnedXp,
      score: correct ? 100 : 0,
    });

    setTimeout(async () => {
      if (classificationIndex < activeLevel.questions.length - 1) {
        setClassificationIndex((prev) => prev + 1);
        setTimeLeft(TIMER_SECONDS);
        setFeedback("");
        setFeedbackTone("none");
        return;
      }

      const levelPassed = nextScore >= classificationLevel * 2;
      setLevelComplete(true);
      setFeedbackTone("none");

      if (levelPassed && classificationLevel < 3) {
        setFeedback("Level Complete 🎉 You unlocked the next challenge!");
      } else if (levelPassed && classificationLevel === 3) {
        setClassificationDone(true);
        setUnlockedBadges((prev) => (prev.includes("Spam Slayer") ? prev : [...prev, "Spam Slayer"]));
        await recordProgress({
          type: "game",
          refId: "classification-game",
          xp: 30,
          score: Math.round((nextScore / 9) * 100),
        });
        setFeedback("All levels complete! You earned the Spam Slayer badge.");
      } else {
        setFeedback("Level ended. Retry to improve your classification confidence.");
      }
    }, 900);
  };

  const unlockNextClassificationLevel = () => {
    if (classificationLevel >= 3) return;
    setClassificationLevel((prev) => prev + 1);
    setClassificationIndex(0);
    setLevelComplete(false);
    setTimeLeft(TIMER_SECONDS);
    setFeedback("");
  };

  const retryClassificationLevel = () => {
    setClassificationIndex(0);
    setLevelComplete(false);
    setTimeLeft(TIMER_SECONDS);
    setFeedback("");
    setFeedbackTone("none");
  };

  const runNeuralTraining = async () => {
    setTraining(true);
    setEpochLogs(["Training model..."]);
    setEpochPoints([]);
    playTone("click");

    const logs: string[] = [];
    const points: { epoch: number; accuracy: number }[] = [];
    const base = Math.max(45, 52 + layers * 4 + neurons * 0.15 - learningRate * 80);

    for (let epoch = 1; epoch <= epochs; epoch += 1) {
      await new Promise((resolve) => setTimeout(resolve, 120));
      const currentAcc = Math.min(99, Math.round(base + epoch * 1.6));
      const loss = Math.max(0.03, 1.8 / (1 + epoch * 0.35) + learningRate * 0.2);
      logs.push(`Epoch ${epoch}/${epochs} | loss=${loss.toFixed(4)} | acc=${currentAcc}%`);
      points.push({ epoch, accuracy: currentAcc });
      setEpochLogs([...logs]);
      setEpochPoints([...points]);
    }

    setTraining(false);
    setEpochLogs((prev) => [...prev, "Training complete. Best configuration found!"]);
    await recordProgress({
      type: "game",
      refId: "neural-sim",
      xp: 15,
      score: points[points.length - 1]?.accuracy || estimatedAccuracy,
      extras: { neuralAccuracy: points[points.length - 1]?.accuracy || estimatedAccuracy },
    });
  };

  const saveNeuralScore = async () => {
    const finalAccuracy = epochPoints[epochPoints.length - 1]?.accuracy || estimatedAccuracy;
    await recordProgress({
      type: "game",
      refId: "neural-sim",
      xp: 20,
      score: finalAccuracy,
      extras: { neuralAccuracy: finalAccuracy },
    });
    setNeuralSaved(true);
    if (finalAccuracy >= 90) {
      setUnlockedBadges((prev) => (prev.includes("Neural Master") ? prev : [...prev, "Neural Master"]));
    }
  };

  const submitClusterChallenge = async () => {
    const expected: Record<string, "A" | "B" | "C"> = {
      "user-1": "A",
      "user-2": "A",
      "user-3": "B",
      "user-4": "B",
      "user-5": "C",
      "user-6": "C",
    };
    const matches = Object.entries(expected).filter(([id, group]) => clusterChoices[id] === group).length;
    const score = Math.round((matches / Object.keys(expected).length) * 100);
    setClusterResult(`You grouped ${matches}/6 correctly (${score}%).`);
    setClusterDone(true);
    await recordProgress({ type: "game", refId: "clustering-game", xp: 8 + Math.round(score / 10), score });
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl space-y-7 p-6 md:p-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl shadow-purple-100/60 backdrop-blur-xl">
          <h1 className="text-3xl font-bold md:text-4xl">Mini-Games Lab</h1>
          <p className="mt-2 text-gray-600">Learn AI by playing: classify signals, tune neural models, and master data grouping through interactive challenges.</p>
          <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
            <div className="rounded-xl bg-purple-50 p-3">Total XP earned in lab: <span className="font-semibold text-purple-700">{classificationXp + (neuralSaved ? 20 : 0)}</span></div>
            <div className="rounded-xl bg-indigo-50 p-3">Performance tier: <span className="font-semibold text-indigo-700">{performanceLabel}</span></div>
            <div className="rounded-xl bg-emerald-50 p-3">Badges: <span className="font-semibold text-emerald-700">{unlockedBadges.length ? unlockedBadges.join(", ") : "No badges yet"}</span></div>
          </div>
        </motion.div>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {gameMeta.map((game) => (
            <GameCard
              key={game.id}
              icon={game.icon}
              title={game.title}
              description={game.description}
              difficulty={game.difficulty}
              xpReward={game.xp}
              active={activeGame === game.id}
              onPlay={() => {
                playTone("click");
                setActiveGame(game.id);
              }}
            />
          ))}
        </section>

        {activeGame === "classification" && (
          <Card className="space-y-4 border border-purple-100">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-bold">Classification Arena</h2>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                Level {classificationLevel}: {activeLevel.title}
              </span>
            </div>

            <LearningInfoBox
              title="Binary Classification"
              description="This game teaches classification: how models separate messages into categories such as spam and not spam."
            />

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-3 text-sm">Score: <span className="font-semibold">{classificationScore}</span></div>
              <div className="rounded-xl bg-gray-50 p-3 text-sm">Timer: <span className="font-semibold">{timeLeft}s</span></div>
              <div className="rounded-xl bg-gray-50 p-3 text-sm">XP: <span className="font-semibold">{classificationXp}</span></div>
            </div>

            {!classificationDone && (
              <motion.div
                key={activeQuestion.id}
                initial={{ opacity: 0.4, y: 6 }}
                className={`rounded-2xl border bg-white p-5 transition ${
                  feedbackTone === "correct"
                    ? "border-green-300 shadow-lg shadow-green-200/70"
                    : feedbackTone === "wrong"
                      ? "border-red-300"
                      : "border-gray-200"
                }`}
                animate={
                  feedbackTone === "wrong"
                    ? { opacity: 1, y: 0, x: [0, -4, 4, -2, 2, 0] }
                    : { opacity: 1, y: 0, x: 0 }
                }
              >
                <p className="mb-4 text-gray-800">{activeQuestion.message}</p>
                {!levelComplete && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => void handleClassificationAnswer("spam")}
                      className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200"
                    >
                      Spam
                    </button>
                    <button
                      onClick={() => void handleClassificationAnswer("ham")}
                      className="rounded-lg bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-200"
                    >
                      Not Spam
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {feedback && <p className="rounded-xl bg-indigo-50 p-3 text-sm text-indigo-900">{feedback}</p>}

            {levelComplete && !classificationDone && (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={unlockNextClassificationLevel}
                  disabled={classificationLevel >= 3}
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                  Unlock Next Level
                </button>
                <button
                  onClick={retryClassificationLevel}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700"
                >
                  Retry Level
                </button>
              </div>
            )}

            {classificationDone && (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
                <p className="text-lg font-bold text-green-800">Game Complete 🎉</p>
                <p className="mt-1 text-sm text-green-700">Final score: {classificationScore}/9 • Badge earned: Spam Slayer</p>
              </div>
            )}
          </Card>
        )}

        {activeGame === "neural" && (
          <Card className="space-y-4 border border-indigo-100">
            <h2 className="text-2xl font-bold">Neural Network Simulator</h2>
            <LearningInfoBox
              title="Training Dynamics"
              description="Learn how architecture and hyperparameters influence model accuracy over training epochs."
            />

            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-xl border border-gray-100 bg-white p-3">
                <label className="text-xs font-semibold uppercase text-gray-500">Hidden Layers</label>
                <p className="text-lg font-bold">{layers}</p>
                <input type="range" min={1} max={6} value={layers} onChange={(e) => setLayers(Number(e.target.value))} className="w-full" />
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-3">
                <label className="text-xs font-semibold uppercase text-gray-500">Neurons</label>
                <p className="text-lg font-bold">{neurons}</p>
                <input type="range" min={8} max={128} step={8} value={neurons} onChange={(e) => setNeurons(Number(e.target.value))} className="w-full" />
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-3">
                <label className="text-xs font-semibold uppercase text-gray-500">Learning Rate</label>
                <p className="text-lg font-bold">{learningRate.toFixed(2)}</p>
                <input type="range" min={0.01} max={0.3} step={0.01} value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className="w-full" />
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-3">
                <label className="text-xs font-semibold uppercase text-gray-500">Epochs</label>
                <p className="text-lg font-bold">{epochs}</p>
                <input type="range" min={8} max={28} step={1} value={epochs} onChange={(e) => setEpochs(Number(e.target.value))} className="w-full" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
                <p className="text-sm text-gray-600">Estimated Accuracy</p>
                <p className="text-5xl font-bold gradient-text">{estimatedAccuracy}%</p>
                {estimatedAccuracy >= 92 && (
                  <p className="mt-2 rounded-lg bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                    Best configuration found!
                  </p>
                )}
              </div>
              <EpochChart points={epochPoints} />
            </div>

            <div className="rounded-2xl border border-gray-900 bg-black p-4 font-mono text-xs text-emerald-300">
              <p className="mb-2 text-emerald-400">{training ? "Training model..." : "Epoch logs"}</p>
              <div className="max-h-40 overflow-auto space-y-1">
                {epochLogs.length ? epochLogs.map((log) => <p key={log}>{log}</p>) : <p>No logs yet. Run training to generate logs.</p>}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => void runNeuralTraining()}
                disabled={training}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {training ? "Training..." : "Run Training"}
              </button>
              <button onClick={() => void saveNeuralScore()} className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                Save Neural Score (+20 XP)
              </button>
              {neuralSaved && <span className="rounded-xl bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700">Saved successfully</span>}
            </div>
          </Card>
        )}

        {activeGame === "clustering" && (
          <Card className="space-y-4 border border-blue-100">
            <h2 className="text-2xl font-bold">Cluster Match Challenge</h2>
            <LearningInfoBox
              title="Unsupervised Grouping"
              description="This game teaches clustering: grouping similar users/points without predefined labels."
            />
            <div className="grid gap-3 md:grid-cols-2">
              {[
                { id: "user-1", text: "Buys beginner AI courses, low spend" },
                { id: "user-2", text: "New learner, watches intro videos" },
                { id: "user-3", text: "Frequent quiz taker, medium spend" },
                { id: "user-4", text: "Regular practice, stable completion rate" },
                { id: "user-5", text: "Enterprise plan, advanced modules" },
                { id: "user-6", text: "High spend, power user behavior" },
              ].map((item) => (
                <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-3">
                  <p className="text-sm text-gray-700">{item.text}</p>
                  <select
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-white p-2 text-sm"
                    value={clusterChoices[item.id] || ""}
                    onChange={(e) =>
                      setClusterChoices((prev) => ({
                        ...prev,
                        [item.id]: (e.target.value || undefined) as "A" | "B" | "C" | undefined,
                      }))
                    }
                  >
                    <option value="">Select Cluster</option>
                    <option value="A">Cluster A</option>
                    <option value="B">Cluster B</option>
                    <option value="C">Cluster C</option>
                  </select>
                </div>
              ))}
            </div>
            <button onClick={() => void submitClusterChallenge()} className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white">
              Submit Grouping
            </button>
            {clusterResult && (
              <p className="rounded-xl bg-blue-50 p-3 text-sm text-blue-800">
                {clusterResult} {clusterDone ? "Great segmentation practice." : ""}
              </p>
            )}
          </Card>
        )}

        <Card>
          <h3 className="text-xl font-semibold">Game Feedback</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-purple-50 p-3 text-sm">Final Score: <span className="font-semibold">{classificationScore}</span></div>
            <div className="rounded-xl bg-indigo-50 p-3 text-sm">XP Earned: <span className="font-semibold">{classificationXp + (neuralSaved ? 20 : 0)}</span></div>
            <div className="rounded-xl bg-emerald-50 p-3 text-sm">Performance: <span className="font-semibold">{performanceLabel}</span></div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Spam Slayer", "Neural Master"].map((badge) => (
              <span
                key={badge}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  unlockedBadges.includes(badge)
                    ? "bg-amber-100 text-amber-700"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
        </Card>
        </div>
    </>
  );
}
