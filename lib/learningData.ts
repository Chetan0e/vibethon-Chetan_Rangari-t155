import { LearningModule, QuizQuestion } from "@/types";

export const learningModules: LearningModule[] = [
  {
    id: "ml-basics",
    level: "beginner",
    title: "ML Foundations",
    concept:
      "Machine learning teaches systems to find patterns from data so they can make predictions without explicit rules.",
    realWorldExample:
      "A food delivery app predicts delivery time from distance, weather, and traffic history.",
    visualLabel: "Data -> Features -> Model -> Prediction",
    xpReward: 25,
    videos: [
      { id: "0Lt9w-BxKFQ", title: "Machine Learning In 100 Seconds", url: "https://www.youtube.com/embed/0Lt9w-BxKFQ" },
      { id: "ukzFI9rgwfU", title: "What Is Machine Learning?", url: "https://www.youtube.com/embed/ukzFI9rgwfU" },
    ],
  },
  {
    id: "classification-core",
    level: "intermediate",
    title: "Classification Essentials",
    concept:
      "Classification predicts labels (spam/not spam, disease/no disease) by learning decision boundaries.",
    realWorldExample:
      "Email providers classify incoming messages into primary, promotions, or spam buckets.",
    visualLabel: "Inputs -> Decision Boundary -> Class Label",
    xpReward: 40,
    videos: [
      { id: "JcI5E2Ng6r4", title: "Logistic Regression Explained", url: "https://www.youtube.com/embed/JcI5E2Ng6r4" },
      { id: "4qJaSmvhxi8", title: "Classification Metrics", url: "https://www.youtube.com/embed/4qJaSmvhxi8" },
    ],
  },
  {
    id: "neural-systems",
    level: "advanced",
    title: "Neural Network Systems",
    concept:
      "Neural networks stack layers of weighted transformations to represent complex, non-linear patterns.",
    realWorldExample:
      "Vision models in autonomous systems detect lanes, vehicles, and pedestrians in real time.",
    visualLabel: "Input Layer -> Hidden Layers -> Output Probabilities",
    xpReward: 60,
    videos: [
      { id: "aircAruvnKk", title: "Neural Networks Visualized", url: "https://www.youtube.com/embed/aircAruvnKk" },
      { id: "IHZwWFHWa-w", title: "Backpropagation Intuition", url: "https://www.youtube.com/embed/IHZwWFHWa-w" },
    ],
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    moduleId: "ml-basics",
    prompt: "Which statement best describes supervised learning?",
    options: ["No labels are required", "Labels guide model training", "It only works for images", "It cannot predict values"],
    correct: 1,
    difficulty: "beginner",
    explanation: "Supervised learning uses labeled examples to map inputs to target outputs.",
    xp: 10,
  },
  {
    id: "q2",
    moduleId: "ml-basics",
    prompt: "You want to predict house prices. Which type of problem is this?",
    options: ["Classification", "Regression", "Clustering", "Recommendation"],
    correct: 1,
    difficulty: "beginner",
    explanation: "Price prediction uses continuous numeric output, which is regression.",
    xp: 10,
  },
  {
    id: "q3",
    moduleId: "classification-core",
    prompt: "Which metric is most useful when classes are imbalanced?",
    options: ["Accuracy only", "Precision/Recall", "Epoch count", "Learning rate"],
    correct: 1,
    difficulty: "intermediate",
    explanation: "Precision and recall reveal minority-class performance better than raw accuracy.",
    xp: 15,
  },
  {
    id: "q4",
    moduleId: "classification-core",
    prompt: "A model predicts spam for every email. What issue is likely present?",
    options: ["High bias toward one class", "Perfect normalization", "Strong generalization", "High recall and precision"],
    correct: 0,
    difficulty: "intermediate",
    explanation: "Predicting one class always indicates class bias or poor thresholding.",
    xp: 15,
  },
  {
    id: "q5",
    moduleId: "neural-systems",
    prompt: "What does backpropagation primarily compute?",
    options: ["Random predictions", "Gradients for weights", "Dataset labels", "Feature scaling"],
    correct: 1,
    difficulty: "advanced",
    explanation: "Backpropagation computes gradients to update network weights.",
    xp: 20,
  },
  {
    id: "q6",
    moduleId: "neural-systems",
    prompt: "Increasing hidden layers usually increases:",
    options: ["Model expressiveness", "Disk speed", "Data collection cost", "Browser FPS"],
    correct: 0,
    difficulty: "advanced",
    explanation: "More layers increase non-linear representational power.",
    xp: 20,
  },
];
