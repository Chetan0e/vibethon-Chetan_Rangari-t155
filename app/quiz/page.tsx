"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { quizQuestions } from "@/lib/learningData";
import { Difficulty } from "@/types";
import { recordProgress } from "@/lib/progress";

interface AIQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export default function Quiz() {
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
  const questions = useMemo(() => quizQuestions.filter((item) => item.difficulty === difficulty), [difficulty]);

  const handleAnswer = async (index: number) => {
    if (answered) return;

    const currentQuestions = mode === "topic" ? aiQuestions : questions;
    const current = currentQuestions[currentQuestion];
    const correct = index === current.correct;
    setSelectedAnswer(index);
    setAnswered(true);
    
    if (mode === "difficulty") {
      const quizQuestion = current as any;
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

    setTimeout(() => {
      if (currentQuestion < currentQuestions.length - 1) {
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

  const generateAIQuiz = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    try {
      console.log("Generating quiz for topic:", topic);
      console.log("API Key available:", !!process.env.NEXT_PUBLIC_OPENROUTER_API_KEY);
      
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
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
              content: `Generate 5 multiple-choice questions about ${topic}`,
            },
          ],
        }),
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      
      const content = data.choices[0]?.message?.content || "[]";
      console.log("Content:", content);
      
      const parsedQuestions: AIQuestion[] = JSON.parse(content);
      console.log("Parsed questions:", parsedQuestions);
      
      setAiQuestions(parsedQuestions);
      setCurrentQuestion(0);
      setScore(0);
      setShowResult(false);
      setSelectedAnswer(null);
      setAnswered(false);
      setFeedback("");
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert(`Failed to generate quiz: ${error instanceof Error ? error.message : 'Unknown error'}. Check console for details.`);
    } finally {
      setLoading(false);
    }
  };

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
                onKeyPress={(e) => e.key === "Enter" && generateAIQuiz()}
              />
              <button
                onClick={generateAIQuiz}
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
