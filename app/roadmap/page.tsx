"use client";

import Navbar from "@/components/Navbar";
import Card from "@/components/Card";

const roadmap = [
  {
    phase: "Phase 1",
    title: "🧠 AI Basics",
    topics: [
      "Introduction to AI",
      "Types of AI (Narrow, General, Super)",
      "AI vs ML vs DL",
      "History of AI",
    ],
    status: "completed",
  },
  {
    phase: "Phase 2",
    title: "📊 Machine Learning",
    topics: [
      "Supervised Learning",
      "Unsupervised Learning",
      "Linear Regression",
      "Logistic Regression",
      "Decision Trees",
    ],
    status: "in-progress",
  },
  {
    phase: "Phase 3",
    title: "🔥 Deep Learning",
    topics: [
      "Neural Networks",
      "CNN (Convolutional Neural Networks)",
      "RNN (Recurrent Neural Networks)",
      "Backpropagation",
      "Activation Functions",
    ],
    status: "locked",
  },
  {
    phase: "Phase 4",
    title: "🗣️ Natural Language Processing",
    topics: [
      "Text Preprocessing",
      "Tokenization",
      "Word Embeddings",
      "Transformers",
      "BERT & GPT",
    ],
    status: "locked",
  },
  {
    phase: "Phase 5",
    title: "👁️ Computer Vision",
    topics: [
      "Image Processing",
      "Object Detection",
      "Image Segmentation",
      "Transfer Learning",
      "GANs",
    ],
    status: "locked",
  },
  {
    phase: "Phase 6",
    title: "🤖 Reinforcement Learning",
    topics: [
      "MDP (Markov Decision Process)",
      "Q-Learning",
      "Deep Q-Networks",
      "Policy Gradients",
      "Actor-Critic Methods",
    ],
    status: "locked",
  },
];

export default function Roadmap() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-400 bg-green-50";
      case "in-progress":
        return "border-purple-400 bg-purple-50";
      case "locked":
        return "border-gray-300 bg-gray-50 opacity-60";
      default:
        return "border-gray-200";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "✅ Completed";
      case "in-progress":
        return "🔄 In Progress";
      case "locked":
        return "🔒 Locked";
      default:
        return "";
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            🌌 AIML Roadmap
          </h1>
          <p className="text-gray-600">Your journey from beginner to AI expert</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {roadmap.map((phase, index) => (
            <div
              key={phase.phase}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-fade-in"
            >
              <Card className={`h-full border-2 ${getStatusColor(phase.status)} card-hover`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-sm text-gray-500">{phase.phase}</span>
                    <h3 className="text-xl font-bold mt-1">{phase.title}</h3>
                  </div>
                  <span className="text-2xl">
                    {phase.status === "completed" && "✅"}
                    {phase.status === "in-progress" && "🔄"}
                    {phase.status === "locked" && "🔒"}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-white border">
                    {getStatusBadge(phase.status)}
                  </span>
                </div>

                <ul className="space-y-2">
                  {phase.topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-purple-500">•</span>
                      <span className={phase.status === "locked" ? "text-gray-400" : "text-gray-700"}>
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>

                {phase.status !== "locked" && (
                  <button className="w-full mt-4 btn-primary py-2 rounded-lg text-sm font-semibold">
                    {phase.status === "completed" ? "Review" : "Continue"}
                  </button>
                )}
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Card className="neon-glow">
            <h3 className="font-bold text-xl mb-4">🎯 Learning Path Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-2">📚</div>
                <h4 className="font-semibold">Study Theory</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Understand the concepts before jumping to code
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl mb-2">💻</div>
                <h4 className="font-semibold">Practice Code</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Implement what you learn in the coding playground
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-2">🎮</div>
                <h4 className="font-semibold">Play Games</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Reinforce concepts through interactive games
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
