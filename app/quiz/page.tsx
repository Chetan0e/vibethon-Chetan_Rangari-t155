"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { addXP } from "@/lib/auth";

const questions = [
  {
    id: 1,
    question: "What is overfitting in machine learning?",
    options: [
      "Model learns noise in training data",
      "Model is too simple",
      "Model has no data",
      "Model is perfect",
    ],
    correct: 0,
  },
  {
    id: 2,
    question: "What does a learning rate control?",
    options: [
      "Dataset size",
      "How much model changes per update",
      "Number of epochs",
      "Model architecture",
    ],
    correct: 1,
  },
  {
    id: 3,
    question: "What is the purpose of a validation set?",
    options: [
      "To train the model",
      "To test final performance",
      "To tune hyperparameters",
      "To store data",
    ],
    correct: 2,
  },
  {
    id: 4,
    question: "Which algorithm is used for classification?",
    options: [
      "Linear Regression",
      "Logistic Regression",
      "K-Means",
      "PCA",
    ],
    correct: 1,
  },
  {
    id: 5,
    question: "What is a neural network inspired by?",
    options: [
      "Computer circuits",
      "Human brain",
      "Database tables",
      "File systems",
    ],
    correct: 1,
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (index: number) => {
    if (answered) return;
    
    setSelectedAnswer(index);
    setAnswered(true);

    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
      addXP(10);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        setShowResult(true);
        addXP(50);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  return (
    <>
      <Navbar />

      <div className="p-6 md:p-10 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            AI/ML Quiz 🧠
          </h1>
          <p className="text-gray-600">Test your knowledge</p>
        </div>

        {!showResult ? (
          <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="neon-glow">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-500">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm font-semibold gradient-text">
                  Score: {score}/{questions.length}
                </span>
              </div>

              <h2 className="text-xl font-semibold mb-6">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    className={`w-full p-4 text-left rounded-lg border-2 transition ${
                      selectedAnswer === index
                        ? index === questions[currentQuestion].correct
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : answered && index === questions[currentQuestion].correct
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-purple-400 bg-white hover:scale-[1.02] active:scale-[0.98]"
                    } ${answered ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <span className="font-semibold mr-3">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </button>
                ))}
              </div>

              {answered && (
                <div className="mt-4 p-3 bg-purple-50 rounded-lg animate-fade-in">
                  {selectedAnswer === questions[currentQuestion].correct ? (
                    <p className="text-green-600 font-semibold">✓ Correct! +10 XP</p>
                  ) : (
                    <p className="text-red-600 font-semibold">✗ Incorrect. The correct answer is {String.fromCharCode(65 + questions[currentQuestion].correct)}</p>
                  )}
                </div>
              )}
            </Card>
          </div>
        ) : (
          <div className="mt-8 animate-fade-in">
            <Card className="neon-glow-green text-center p-10">
              <div className="text-6xl mb-6">🏆</div>
              <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
              
              <div className="p-6 bg-gradient-to-r from-purple-50 to-green-50 rounded-lg mb-6">
                <p className="text-5xl font-bold gradient-text mb-2">
                  {score}/{questions.length}
                </p>
                <p className="text-gray-600">
                  {score === questions.length
                    ? "Perfect score! You're an AI expert! 🎉"
                    : score >= questions.length / 2
                    ? "Great job! Keep learning! 📚"
                    : "Keep practicing! You'll get there! 💪"}
                </p>
              </div>

              <p className="text-lg text-gray-600 mb-6">
                You earned {score * 10 + 50} XP!
              </p>

              <button
                onClick={resetQuiz}
                className="btn-primary px-8 py-3 rounded-xl font-semibold"
              >
                Try Again 🔄
              </button>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
