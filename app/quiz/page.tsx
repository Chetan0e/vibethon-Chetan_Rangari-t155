"use client";

import { useCallback, useEffect, useMemo, useState, Suspense } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { quizQuestions } from "@/lib/learningData";
import { Difficulty } from "@/types";
import { recordProgress } from "@/lib/progress";
import { useSearchParams } from "next/navigation";

interface AIQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

function QuizContent() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"difficulty" | "topic">("difficulty");
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const [topic, setTopic] = useState("");
  const [aiQuestions, setAiQuestions] = useState<AIQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [topicBootstrapped, setTopicBootstrapped] = useState(false);
  const questions = useMemo(() => quizQuestions.filter((item) => item.difficulty === difficulty), [difficulty]);

  const buildFallbackQuestions = useCallback((topicName: string): AIQuestion[] => {
    const cleanTopic = topicName.trim() || "AI and ML";
    return [
      {
        id: 1,
        question: `Which statement best describes ${cleanTopic}?`,
        options: [
          `${cleanTopic} is only a frontend UI concept`,
          `${cleanTopic} combines core concepts with practical model/application behavior`,
          `${cleanTopic} is unrelated to data`,
          `${cleanTopic} can only be learned through math proofs`,
        ],
        correct: 1,
      },
      {
        id: 2,
        question: `When learning ${cleanTopic}, what should you focus on first?`,
        options: [
          "Perfect optimization from day one",
          "Memorizing every formula without context",
          "Understanding the problem, data flow, and expected outcome",
          "Skipping evaluation entirely",
        ],
        correct: 2,
      },
      {
        id: 3,
        question: `A strong project habit in ${cleanTopic} is to:`,
        options: [
          "Avoid experiments and iteration",
          "Use random metrics",
          "Track progress with clear metrics and test assumptions",
          "Deploy without validation",
        ],
        correct: 2,
      },
      {
        id: 4,
        question: `Why do real-world teams evaluate ${cleanTopic} solutions continuously?`,
        options: [
          "To reduce reliability and trust",
          "To catch drift, regressions, and changing user behavior",
          "Because testing is optional",
          "To make systems slower",
        ],
        correct: 1,
      },
      {
        id: 5,
        question: `What is the best next step after finishing a ${cleanTopic} lesson?`,
        options: [
          "Build a mini use case and validate understanding with a quiz",
          "Never practice",
          "Ignore implementation details",
          "Skip all feedback loops",
        ],
        correct: 0,
      },
    ];
  }, []);

  const parseQuestionsFromModel = (rawContent: string): AIQuestion[] => {
    const normalized = rawContent.replace(/```json|```/gi, "").trim();
    const parsed = JSON.parse(normalized);
    if (!Array.isArray(parsed)) throw new Error("Invalid quiz format from model.");

    return parsed
      .map((item, index) => ({
        id: Number(item.id ?? index + 1),
        question: String(item.question ?? ""),
        options: Array.isArray(item.options) ? item.options.map((option: unknown) => String(option)) : [],
        correct: Number(item.correct),
      }))
      .filter((item) => item.question && item.options.length === 4 && item.correct >= 0 && item.correct < 4);
  };

  const handleAnswer = async (index: number) => {
    if (answered) return;

    const currentQuestions = mode === "topic" ? aiQuestions : questions;
    const current = currentQuestions[currentQuestion] as any;
    const correct = index === current.correct;
    const isLastQuestion = currentQuestion === currentQuestions.length - 1;
    const nextScore = correct ? score + 1 : score;
    setSelectedAnswer(index);
    setAnswered(true);
    
    if (mode === "difficulty") {
      const quizQuestion = current;
      setFeedback(correct ? `Correct! +${quizQuestion.xp} XP` : quizQuestion.explanation);
      if (correct) {
        setScore((prev) => prev + 1);
        await recordProgress({ type: "quiz", refId: `${difficulty}-quiz`, xp: quizQuestion.xp });
      } else {
        await recordProgress({ type: "quiz", refId: `${difficulty}-quiz`, xp: 3 });
      }
    } else {
      setFeedback(correct ? "Correct! +10 XP" : "Incorrect. Try again!");
      if (correct) {
        setScore((prev) => prev + 1);
        await recordProgress({ type: "quiz", refId: `topic-${topic}`, xp: 10 });
      }
    }

    if (isLastQuestion) {
      const totalQuestions = currentQuestions.length || 1;
      const percentageScore = Math.round((nextScore / totalQuestions) * 100);
      const scoreRef = mode === "topic" ? `topic-${topic}` : `${difficulty}-quiz`;
      await recordProgress({ type: "quiz", refId: scoreRef, xp: 0, score: percentageScore });
    }

    setTimeout(() => {
      if (!isLastQuestion) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setAnswered(false);
        setFeedback("");
      } else {
        setShowResult(true);
      }
    }, 1400);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswered(false);
    setFeedback("");
    if (mode === "topic") {
      setAiQuestions([]);
      setTopic("");
    }
  };

  const handleDifficultyChange = (value: Difficulty) => {
    setDifficulty(value);
    resetQuiz();
  };

  const generateAIQuiz = useCallback(async (forcedTopic?: string) => {
    const topicToUse = (forcedTopic ?? topic).trim();
    if (!topicToUse) return;

    setLoading(true);
    setTopic(topicToUse);
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
      if (!apiKey) {
        throw new Error("Missing OpenRouter API key.");
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.2-3b-instruct:free",
          messages: [
            {
              role: "system",
              content: "You are a quiz generator. Generate 5 multiple-choice questions about the given topic. Return the response as a valid JSON array with objects containing: id (number), question (string), options (array of 4 strings), and correct (number, index of correct answer). Only return the JSON, no other text.",
            },
            {
              role: "user",
              content: `Generate 5 multiple-choice questions about ${topicToUse}`,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}.`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || "[]";
      const parsedQuestions = parseQuestionsFromModel(content);

      if (parsedQuestions.length < 3) {
        throw new Error("Model returned too few valid questions.");
      }

      setAiQuestions(parsedQuestions);
      setCurrentQuestion(0);
      setScore(0);
      setShowResult(false);
      setSelectedAnswer(null);
      setAnswered(false);
      setFeedback("");
    } catch (error) {
      const fallbackQuestions = buildFallbackQuestions(topicToUse);
      setAiQuestions(fallbackQuestions);
      setCurrentQuestion(0);
      setScore(0);
      setShowResult(false);
      setSelectedAnswer(null);
      setAnswered(false);
      setFeedback("");
    } finally {
      setLoading(false);
    }
  }, [buildFallbackQuestions, topic]);

  useEffect(() => {
    if (topicBootstrapped) return;

    const modeParam = searchParams.get("mode");
    const topicParam = searchParams.get("topic");
    const autoStart = searchParams.get("autostart") === "1";

    if (modeParam === "topic") {
      setMode("topic");
      if (topicParam) {
        setTopic(topicParam);
        if (autoStart) {
          void generateAIQuiz(topicParam);
        }
      }
    }

    setTopicBootstrapped(true);
  }, [generateAIQuiz, searchParams, topicBootstrapped]);

  const finalXP = score * (difficulty === "beginner" ? 10 : difficulty === "intermediate" ? 15 : 20);

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-4xl p-6 md:p-10">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">AI/ML Quiz</h1>
          <p className="text-gray-600">Module-based assessments with adaptive difficulty and instant feedback.</p>
        </motion.div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => { setMode("difficulty"); resetQuiz(); }}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              mode === "difficulty" ? "bg-purple-600 text-white" : "bg-white text-gray-700 hover:bg-purple-50"
            }`}
          >
            Difficulty Mode
          </button>
          <button
            onClick={() => { setMode("topic"); resetQuiz(); }}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              mode === "topic" ? "bg-purple-600 text-white" : "bg-white text-gray-700 hover:bg-purple-50"
            }`}
          >
            Topic Mode (AI)
          </button>
        </div>

        {mode === "difficulty" && (
          <div className="mt-4 flex gap-3">
            {(["beginner", "intermediate", "advanced"] as Difficulty[]).map((item) => (
              <button
                key={item}
                onClick={() => handleDifficultyChange(item)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  item === difficulty ? "bg-purple-600 text-white" : "bg-white text-gray-700 hover:bg-purple-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {mode === "topic" && aiQuestions.length === 0 ? (
          <div className="mt-8">
            <Card className="neon-glow">
              <h2 className="mb-4 text-xl font-semibold">Enter a Topic</h2>
              <input
                className="w-full rounded-lg border bg-white/70 p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
                placeholder="e.g., Neural Networks, Machine Learning, Deep Learning..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && void generateAIQuiz()}
              />
              <button
                onClick={() => void generateAIQuiz()}
                disabled={loading}
                className="btn-primary w-full rounded-lg px-4 py-3 font-semibold"
              >
                {loading ? "Generating Quiz..." : "Generate Quiz"}
              </button>
            </Card>
          </div>
        ) : !showResult ? (
          <div className="mt-8">
            <Card className="neon-glow">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Question {currentQuestion + 1} of {mode === "topic" ? aiQuestions.length : questions.length}
                </span>
                <span className="text-sm font-semibold gradient-text">
                  Score: {score}/{mode === "topic" ? aiQuestions.length : questions.length}
                </span>
              </div>

              <h2 className="mb-6 text-xl font-semibold">
                {mode === "topic" ? aiQuestions[currentQuestion]?.question : questions[currentQuestion].prompt}
              </h2>

              <div className="space-y-3">
                {(mode === "topic" ? aiQuestions[currentQuestion]?.options : questions[currentQuestion].options)?.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => void handleAnswer(index)}
                    disabled={answered}
                    className={`w-full rounded-lg border-2 p-4 text-left transition ${
                      selectedAnswer === index
                        ? index === (mode === "topic" ? aiQuestions[currentQuestion]?.correct : questions[currentQuestion].correct)
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : answered && index === (mode === "topic" ? aiQuestions[currentQuestion]?.correct : questions[currentQuestion].correct)
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-white hover:scale-[1.02] hover:border-purple-400 active:scale-[0.98]"
                    } ${answered ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <span className="mr-3 font-semibold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {answered && (
                <div className="mt-4 animate-fade-in rounded-lg bg-purple-50 p-3">
                  {selectedAnswer === (mode === "topic" ? aiQuestions[currentQuestion]?.correct : questions[currentQuestion].correct) ? (
                    <p className="font-semibold text-green-600">✓ {feedback}</p>
                  ) : (
                    <p className="font-semibold text-red-600">✗ {feedback}</p>
                  )}
                </div>
              )}
            </Card>
          </div>
        ) : (
          <div className="mt-8 animate-fade-in">
            <Card className="neon-glow-green p-10 text-center">
              <div className="mb-6 text-6xl">🏆</div>
              <h2 className="mb-4 text-3xl font-bold">Quiz Complete!</h2>
              <div className="mb-6 rounded-lg bg-gradient-to-r from-purple-50 to-green-50 p-6">
                <p className="mb-2 text-5xl font-bold gradient-text">
                  {score}/{mode === "topic" ? aiQuestions.length : questions.length}
                </p>
                <p className="text-gray-600">
                  {score === (mode === "topic" ? aiQuestions.length : questions.length)
                    ? "Perfect score! You're an AI expert."
                    : score >= (mode === "topic" ? aiQuestions.length : questions.length) / 2
                      ? "Great job! Keep leveling up."
                      : "Keep practicing. You'll improve quickly."}
                </p>
              </div>
              <p className="mb-6 text-lg text-gray-600">
                You earned {mode === "difficulty" ? finalXP : score * 10} XP in {mode === "difficulty" ? difficulty : "topic"} mode.
              </p>
              <button onClick={resetQuiz} className="btn-primary rounded-xl px-8 py-3 font-semibold">
                Try Again
              </button>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}

export default function Quiz() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading quiz data...</div>}>
      <QuizContent />
    </Suspense>
  );
}
