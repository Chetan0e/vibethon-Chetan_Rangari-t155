import { Difficulty } from "@/types";

export type ModuleVideo = {
  id: string;
  title: string;
  description: string;
  embedUrl: string;
};

export type VisualDemoPoint = {
  label: string;
  value: number;
};

export type PathwayModule = {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: Difficulty;
  conceptParagraphs: string[];
  conceptBullets: string[];
  visualAidTitle: string;
  visualAidDescription: string;
  visualDemoPoints: VisualDemoPoint[];
  youtubeLinks: ModuleVideo[];
  realWorldUseCase: string;
  codeSnippet: string;
  summary: string[];
  xpReward: number;
};

export type LevelMeta = {
  id: Difficulty;
  title: string;
  icon: string;
  description: string;
  difficultyLabel: string;
  highlight: string;
};

export const levelMeta: LevelMeta[] = [
  {
    id: "beginner",
    title: "Beginner",
    icon: "🌱",
    description: "Build intuition with core AI and ML fundamentals, step by step.",
    difficultyLabel: "Easy to Start",
    highlight: "from-emerald-400 to-green-500",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    icon: "🚀",
    description: "Move from theory to practical model-building and evaluation.",
    difficultyLabel: "Hands-on Core",
    highlight: "from-indigo-500 to-violet-500",
  },
  {
    id: "advanced",
    title: "Advanced",
    icon: "🔥",
    description: "Master advanced systems, optimization, and production thinking.",
    difficultyLabel: "Expert Track",
    highlight: "from-orange-500 to-rose-500",
  },
];

export const modulesByLevel: Record<Difficulty, PathwayModule[]> = {
  beginner: [
    {
      id: "intro-to-ai",
      title: "Introduction to AI",
      description: "Understand what AI is, where it is used, and how modern systems make decisions.",
      duration: "10 min",
      difficulty: "beginner",
      conceptParagraphs: [
        "Artificial Intelligence is the field of building systems that can perform tasks usually requiring human intelligence. These tasks include understanding language, spotting patterns, and making predictions.",
        "Most practical AI products are not magical. They are pipelines that combine data, algorithms, and careful product design to solve specific user problems.",
        "As a learner, your goal is to think in systems: what data goes in, what output users need, and what quality bar makes the solution useful.",
      ],
      conceptBullets: [
        "AI is a broad umbrella; Machine Learning is one approach inside it.",
        "AI systems are useful when tied to clear product outcomes.",
        "Good AI products balance accuracy, speed, and trust.",
      ],
      visualAidTitle: "Confidence Meter Demo",
      visualAidDescription: "Use the slider to see how model confidence changes decision thresholds.",
      visualDemoPoints: [
        { label: "Raw Signal", value: 35 },
        { label: "Feature Strength", value: 48 },
        { label: "Model Confidence", value: 62 },
        { label: "Final Decision", value: 74 },
      ],
      youtubeLinks: [
        {
          id: "ad79nYk2keg",
          title: "What Is Artificial Intelligence?",
          description: "A beginner-friendly overview of AI concepts and real applications.",
          embedUrl: "https://www.youtube.com/embed/ad79nYk2keg",
        },
        {
          id: "2ePf9rue1Ao",
          title: "AI Explained in Simple Terms",
          description: "Clear explanation of AI building blocks and terminology.",
          embedUrl: "https://www.youtube.com/embed/2ePf9rue1Ao",
        },
      ],
      realWorldUseCase:
        "Customer support assistants route incoming messages by intent (billing, shipping, bug report) so teams can respond faster.",
      codeSnippet: `const confidence = 0.78;
const threshold = 0.65;
const decision = confidence >= threshold ? "Auto-route ticket" : "Send to human review";

console.log(decision);`,
      summary: [
        "AI is about solving targeted problems with data-driven systems.",
        "Every AI flow can be modeled as input -> processing -> output.",
        "Confidence and thresholds are core to product behavior.",
      ],
      xpReward: 20,
    },
    {
      id: "what-is-ml",
      title: "What is Machine Learning",
      description: "Learn how models learn patterns from data and improve predictions over time.",
      duration: "12 min",
      difficulty: "beginner",
      conceptParagraphs: [
        "Machine Learning enables software to learn from examples instead of hardcoded rules. The model observes patterns in historical data and applies them to new inputs.",
        "In product contexts, ML powers ranking, recommendation, fraud detection, and personalization. It is useful when rules are too complex to write manually.",
        "The quality of an ML model depends heavily on data quality, feature design, and evaluation strategy.",
      ],
      conceptBullets: [
        "Training data teaches the model what patterns matter.",
        "Inference is the process of making predictions on new data.",
        "Evaluation ensures the model is useful in real-world conditions.",
      ],
      visualAidTitle: "Learning Curve Snapshot",
      visualAidDescription: "Move the slider to simulate how accuracy improves with more training data.",
      visualDemoPoints: [
        { label: "Dataset Coverage", value: 40 },
        { label: "Feature Quality", value: 52 },
        { label: "Validation Accuracy", value: 67 },
        { label: "Generalization", value: 71 },
      ],
      youtubeLinks: [
        {
          id: "ukzFI9rgwfU",
          title: "Machine Learning Basics",
          description: "Simple explanation of supervised and unsupervised learning.",
          embedUrl: "https://www.youtube.com/embed/ukzFI9rgwfU",
        },
        {
          id: "Gj0iyo265bc",
          title: "How ML Works",
          description: "Practical mental model for ML in apps and products.",
          embedUrl: "https://www.youtube.com/embed/Gj0iyo265bc",
        },
      ],
      realWorldUseCase:
        "A streaming app predicts which video each user is most likely to watch next, improving retention and watch time.",
      codeSnippet: `type UserSignal = { clicks: number; minutesWatched: number };

const scoreUserIntent = ({ clicks, minutesWatched }: UserSignal) => {
  return clicks * 0.4 + minutesWatched * 0.6;
};`,
      summary: [
        "ML replaces static rules with pattern learning from examples.",
        "Data and evaluation are just as important as algorithms.",
        "Good ML systems are measured by product impact, not only accuracy.",
      ],
      xpReward: 25,
    },
    {
      id: "types-of-ml",
      title: "Types of ML",
      description: "Compare supervised, unsupervised, and reinforcement learning with practical examples.",
      duration: "14 min",
      difficulty: "beginner",
      conceptParagraphs: [
        "Machine Learning is often grouped into supervised, unsupervised, and reinforcement learning. Each type solves different classes of problems.",
        "Supervised learning uses labeled data, unsupervised learning discovers hidden structure, and reinforcement learning optimizes actions through rewards.",
        "Choosing the right learning type starts with your data reality and your product objective.",
      ],
      conceptBullets: [
        "Supervised: predict a known target from examples.",
        "Unsupervised: group similar behaviors without labels.",
        "Reinforcement: learn policies from reward signals over time.",
      ],
      visualAidTitle: "Learning Types Comparator",
      visualAidDescription: "Observe how different learning styles perform under the same data conditions.",
      visualDemoPoints: [
        { label: "Supervised Fit", value: 76 },
        { label: "Unsupervised Insight", value: 58 },
        { label: "RL Reward Stability", value: 49 },
        { label: "Product Suitability", value: 69 },
      ],
      youtubeLinks: [
        {
          id: "nKW8Ndu7Mjw",
          title: "Types of Machine Learning",
          description: "Quick, visual explanation of major ML categories.",
          embedUrl: "https://www.youtube.com/embed/nKW8Ndu7Mjw",
        },
      ],
      realWorldUseCase:
        "An e-commerce team uses supervised learning for demand forecasting, unsupervised clustering for customer segments, and RL for ad bidding optimization.",
      codeSnippet: `const chooseLearningType = (hasLabels: boolean, hasRewards: boolean) => {
  if (hasRewards) return "reinforcement";
  if (hasLabels) return "supervised";
  return "unsupervised";
};`,
      summary: [
        "Different ML types exist because product problems differ.",
        "Data shape and feedback loop determine the right choice.",
        "Hybrid systems often combine more than one learning style.",
      ],
      xpReward: 25,
    },
    {
      id: "linear-regression",
      title: "Linear Regression",
      description: "Predict continuous values and understand trend lines with interpretable ML.",
      duration: "15 min",
      difficulty: "beginner",
      conceptParagraphs: [
        "Linear Regression predicts a numeric value by fitting a straight line through data points. It is often the first model used for baseline forecasting.",
        "The model learns coefficients that estimate how each feature influences the output. This helps both prediction and interpretability.",
        "Even when advanced models exist, linear regression is valuable for quick baselines and explaining business dynamics.",
      ],
      conceptBullets: [
        "Great for continuous prediction like price, demand, and time.",
        "Coefficients show feature impact direction and strength.",
        "Acts as a trustworthy baseline before complex models.",
      ],
      visualAidTitle: "Trend Line Explorer",
      visualAidDescription: "Adjust confidence to see how prediction bands tighten around a regression line.",
      visualDemoPoints: [
        { label: "Signal-to-Noise", value: 44 },
        { label: "Line Fit", value: 66 },
        { label: "Prediction Stability", value: 73 },
        { label: "Business Confidence", value: 78 },
      ],
      youtubeLinks: [
        {
          id: "zPG4NjIkCjc",
          title: "Linear Regression Intuition",
          description: "Visual intuition for slope, intercept, and prediction.",
          embedUrl: "https://www.youtube.com/embed/zPG4NjIkCjc",
        },
      ],
      realWorldUseCase:
        "A logistics team predicts delivery duration from distance and traffic signals, then surfaces ETAs to users.",
      codeSnippet: `const predict = (distanceKm: number, trafficIndex: number) => {
  const base = 12;
  return base + distanceKm * 1.8 + trafficIndex * 3.2;
};`,
      summary: [
        "Linear regression is simple, fast, and interpretable.",
        "It predicts numeric outcomes from weighted inputs.",
        "Start with it before moving to heavier models.",
      ],
      xpReward: 30,
    },
    {
      id: "data-basics",
      title: "Data Basics",
      description: "Learn how data cleaning, features, and quality checks shape model performance.",
      duration: "11 min",
      difficulty: "beginner",
      conceptParagraphs: [
        "Most AI issues are data issues. Missing values, skewed distributions, and inconsistent labels reduce model reliability.",
        "Data preparation includes cleaning, normalization, feature construction, and validation checks before training.",
        "Great teams treat data quality as a product capability, not a one-time pre-processing step.",
      ],
      conceptBullets: [
        "Clean data reduces noisy model behavior.",
        "Feature engineering converts raw inputs into useful signals.",
        "Validation pipelines prevent quality regressions over time.",
      ],
      visualAidTitle: "Data Quality Pipeline",
      visualAidDescription: "Explore how each quality stage improves downstream model confidence.",
      visualDemoPoints: [
        { label: "Raw Data Health", value: 31 },
        { label: "Cleaned Dataset", value: 59 },
        { label: "Feature Readiness", value: 71 },
        { label: "Model Readiness", value: 82 },
      ],
      youtubeLinks: [
        {
          id: "ua-CiDNNj30",
          title: "Data Preprocessing for ML",
          description: "Foundational guide to preparing data for better models.",
          embedUrl: "https://www.youtube.com/embed/ua-CiDNNj30",
        },
      ],
      realWorldUseCase:
        "A fintech app standardizes transaction categories and removes duplicate records to reduce fraud model false alarms.",
      codeSnippet: `const sanitizeAmount = (value: string) => Number(value.replace(/[$,]/g, ""));

const isValidTransaction = (amount: number, category?: string) =>
  Number.isFinite(amount) && amount > 0 && Boolean(category);`,
      summary: [
        "Data quality directly controls model quality.",
        "Cleaning and feature engineering are core ML skills.",
        "Reliable pipelines protect model performance long-term.",
      ],
      xpReward: 20,
    },
  ],
  intermediate: [
    {
      id: "classification-workflow",
      title: "Classification Workflow",
      description: "Build robust classifiers and evaluate them with precision, recall, and F1.",
      duration: "18 min",
      difficulty: "intermediate",
      conceptParagraphs: [
        "Classification predicts labels such as spam vs not-spam or churn vs retained. The workflow includes feature prep, model training, threshold tuning, and ongoing monitoring.",
        "Accuracy can be misleading with imbalanced classes. Precision and recall reveal how well your model handles the minority class and harmful mistakes.",
        "In production, threshold strategy often matters as much as raw model architecture.",
      ],
      conceptBullets: [
        "Choose evaluation metrics based on product risk.",
        "Tune decision thresholds to match business goals.",
        "Monitor drift to keep quality stable post-launch.",
      ],
      visualAidTitle: "Confusion Matrix Signal",
      visualAidDescription: "Slider changes sensitivity and affects false positives/false negatives.",
      visualDemoPoints: [
        { label: "Precision", value: 68 },
        { label: "Recall", value: 72 },
        { label: "F1 Score", value: 70 },
        { label: "Calibration", value: 65 },
      ],
      youtubeLinks: [
        {
          id: "4qJaSmvhxi8",
          title: "Classification Metrics Explained",
          description: "Understand precision, recall, F1 and practical trade-offs.",
          embedUrl: "https://www.youtube.com/embed/4qJaSmvhxi8",
        },
      ],
      realWorldUseCase:
        "A trust-and-safety team uses classifiers to flag abusive content while minimizing false positives for normal users.",
      codeSnippet: `const shouldFlag = (probAbuse: number, threshold = 0.7) => probAbuse >= threshold;

const decision = shouldFlag(0.74) ? "Flag content" : "Allow content";`,
      summary: [
        "Classification quality is about trade-offs, not one metric.",
        "Threshold tuning aligns model behavior with product priorities.",
        "Monitoring is essential after deployment.",
      ],
      xpReward: 35,
    },
    {
      id: "feature-engineering",
      title: "Feature Engineering in Practice",
      description: "Design stronger model inputs by encoding, scaling, and aggregating signals.",
      duration: "16 min",
      difficulty: "intermediate",
      conceptParagraphs: [
        "Feature engineering transforms raw logs into model-friendly signals. Better features often beat more complex architectures.",
        "Common patterns include categorical encoding, normalization, and rolling-window aggregations.",
        "Strong feature design is tightly connected to domain understanding and product behavior.",
      ],
      conceptBullets: [
        "Raw data is rarely directly useful for training.",
        "Temporal and aggregated features add predictive power.",
        "Good features improve both performance and interpretability.",
      ],
      visualAidTitle: "Feature Impact Simulator",
      visualAidDescription: "See how improved feature quality raises model performance.",
      visualDemoPoints: [
        { label: "Raw Features", value: 42 },
        { label: "Encoded Signals", value: 58 },
        { label: "Aggregated Features", value: 74 },
        { label: "Prediction Lift", value: 79 },
      ],
      youtubeLinks: [
        {
          id: "N9fDIAflCMY",
          title: "Feature Engineering for ML",
          description: "Practical feature engineering examples and workflow.",
          embedUrl: "https://www.youtube.com/embed/N9fDIAflCMY",
        },
      ],
      realWorldUseCase:
        "A retention model improves by adding rolling 7-day activity and recency features rather than changing the algorithm.",
      codeSnippet: `const daysSinceLastSeen = (lastSeenAt: Date) =>
  Math.floor((Date.now() - lastSeenAt.getTime()) / (1000 * 60 * 60 * 24));`,
      summary: [
        "Feature quality is a major predictor of ML success.",
        "Domain knowledge helps create useful transformations.",
        "Start with interpretable features before black-box complexity.",
      ],
      xpReward: 40,
    },
    {
      id: "model-evaluation",
      title: "Model Evaluation & Iteration",
      description: "Set up repeatable experiments and pick models with confidence.",
      duration: "14 min",
      difficulty: "intermediate",
      conceptParagraphs: [
        "Model evaluation is the bridge between experimentation and production. It helps avoid overfitting and gives confidence in deployment decisions.",
        "Reliable setups use train/validation/test splits, clear baselines, and error slicing across user segments.",
        "Fast iteration loops make ML teams productive: run experiment, inspect failures, improve data/features, repeat.",
      ],
      conceptBullets: [
        "Always compare against a baseline model.",
        "Track metrics by segment, not only global averages.",
        "Error analysis drives smarter iteration cycles.",
      ],
      visualAidTitle: "Experiment Tracker",
      visualAidDescription: "Slide to compare baseline and candidate model outcomes.",
      visualDemoPoints: [
        { label: "Baseline", value: 61 },
        { label: "Candidate A", value: 69 },
        { label: "Candidate B", value: 73 },
        { label: "Production Readiness", value: 70 },
      ],
      youtubeLinks: [
        {
          id: "85dtiMz9tSo",
          title: "How to Evaluate ML Models",
          description: "Framework for selecting and validating production-ready models.",
          embedUrl: "https://www.youtube.com/embed/85dtiMz9tSo",
        },
      ],
      realWorldUseCase:
        "A recommendation team compares models by both click-through rate and downstream completion rate before release.",
      codeSnippet: `const scoreModel = (precision: number, recall: number) => {
  if (precision + recall === 0) return 0;
  return (2 * precision * recall) / (precision + recall);
};`,
      summary: [
        "Evaluation is about robustness, not just leaderboard scores.",
        "Segment-level analysis catches hidden model failures.",
        "Iteration speed is a major product advantage.",
      ],
      xpReward: 35,
    },
  ],
  advanced: [
    {
      id: "neural-network-systems",
      title: "Neural Network Systems",
      description: "Go deeper into layers, activations, and optimization dynamics in deep learning.",
      duration: "20 min",
      difficulty: "advanced",
      conceptParagraphs: [
        "Neural networks stack transformations to learn non-linear patterns from large datasets. Each layer extracts increasingly abstract features.",
        "Training depends on optimization choices such as learning rate schedules, normalization, and regularization.",
        "Production-grade neural systems require both model quality and infrastructure awareness (latency, throughput, reliability).",
      ],
      conceptBullets: [
        "Depth improves representation power but increases complexity.",
        "Optimization choices affect convergence and stability.",
        "Serving strategy is critical for real product impact.",
      ],
      visualAidTitle: "Layer Activation Flow",
      visualAidDescription: "Use the slider to inspect activation strength across network layers.",
      visualDemoPoints: [
        { label: "Input Layer", value: 55 },
        { label: "Hidden Layer 1", value: 69 },
        { label: "Hidden Layer 2", value: 74 },
        { label: "Output Confidence", value: 81 },
      ],
      youtubeLinks: [
        {
          id: "aircAruvnKk",
          title: "Neural Networks Visualized",
          description: "Visual understanding of neurons, layers, and learning.",
          embedUrl: "https://www.youtube.com/embed/aircAruvnKk",
        },
        {
          id: "IHZwWFHWa-w",
          title: "Backpropagation Intuition",
          description: "Conceptual explanation of gradient-based learning.",
          embedUrl: "https://www.youtube.com/embed/IHZwWFHWa-w",
        },
      ],
      realWorldUseCase:
        "An autonomous driving stack uses deep vision models to classify objects and estimate drivable space in real-time.",
      codeSnippet: `const forwardPass = (input: number, weight: number, bias: number) => {
  const z = input * weight + bias;
  return Math.max(0, z); // ReLU
};`,
      summary: [
        "Neural networks scale representation complexity.",
        "Optimization and architecture decisions are tightly linked.",
        "Production constraints shape real-world deployment choices.",
      ],
      xpReward: 55,
    },
    {
      id: "llm-application-design",
      title: "LLM Application Design",
      description: "Design practical prompt, retrieval, and guardrail patterns for AI products.",
      duration: "22 min",
      difficulty: "advanced",
      conceptParagraphs: [
        "LLM products are systems, not single prompts. They combine prompt templates, retrieval context, memory, and safety checks.",
        "Reliable behavior comes from structured inputs, deterministic formatting, and evaluation against realistic user scenarios.",
        "The strongest teams treat LLM design as product engineering with iteration loops and observability.",
      ],
      conceptBullets: [
        "Prompt quality improves with explicit structure and examples.",
        "Retrieval grounds responses in trusted context.",
        "Guardrails reduce unsafe or misleading outputs.",
      ],
      visualAidTitle: "RAG Pipeline Confidence",
      visualAidDescription: "Adjust slider to simulate retrieval quality and answer confidence.",
      visualDemoPoints: [
        { label: "Query Understanding", value: 62 },
        { label: "Context Retrieval", value: 71 },
        { label: "Answer Quality", value: 76 },
        { label: "Safety Validation", value: 69 },
      ],
      youtubeLinks: [
        {
          id: "T-D1OfcDW1M",
          title: "LLM App Patterns",
          description: "Prompting, retrieval, and tool-use design patterns.",
          embedUrl: "https://www.youtube.com/embed/T-D1OfcDW1M",
        },
      ],
      realWorldUseCase:
        "A sales copilot uses retrieval over CRM notes and product docs to draft personalized outreach messages with compliance checks.",
      codeSnippet: `const buildPrompt = (context: string, question: string) => {
  return [
    "You are a helpful assistant.",
    "Use only the provided context.",
    \`Context: \${context}\`,
    \`Question: \${question}\`,
  ].join("\\n");
};`,
      summary: [
        "Great LLM UX requires orchestration, not prompt-only tricks.",
        "Grounding and guardrails improve trust and consistency.",
        "Evaluation loops are essential for production quality.",
      ],
      xpReward: 60,
    },
    {
      id: "mlops-readiness",
      title: "MLOps Readiness",
      description: "Learn deployment, monitoring, and reliability patterns for production ML systems.",
      duration: "19 min",
      difficulty: "advanced",
      conceptParagraphs: [
        "MLOps is about shipping models reliably. It includes model versioning, CI/CD, feature stores, and automated monitoring.",
        "Without observability, model performance silently degrades due to drift and changing user behavior.",
        "A mature ML product couples model metrics with business and UX metrics to drive decisions.",
      ],
      conceptBullets: [
        "Deployment is only the beginning; monitoring is continuous.",
        "Track drift, latency, and prediction quality in real time.",
        "Operational excellence keeps AI products trustworthy.",
      ],
      visualAidTitle: "Production Health Monitor",
      visualAidDescription: "See how monitoring signals correlate with product reliability.",
      visualDemoPoints: [
        { label: "Data Drift Alerting", value: 66 },
        { label: "Latency SLA", value: 79 },
        { label: "Model Accuracy", value: 72 },
        { label: "System Reliability", value: 77 },
      ],
      youtubeLinks: [
        {
          id: "06-AZXmwHjo",
          title: "MLOps in Practice",
          description: "Practical MLOps fundamentals from deployment to monitoring.",
          embedUrl: "https://www.youtube.com/embed/06-AZXmwHjo",
        },
      ],
      realWorldUseCase:
        "A recommendation engine team tracks data drift and latency dashboards; automatic rollback prevents bad model releases.",
      codeSnippet: `const shouldRollback = (latencyMs: number, driftScore: number) => {
  return latencyMs > 300 || driftScore > 0.4;
};`,
      summary: [
        "Production ML needs robust deployment + monitoring practices.",
        "Drift management protects long-term model performance.",
        "MLOps ties technical quality to product reliability.",
      ],
      xpReward: 50,
    },
  ],
};

export const getLevelModules = (level: Difficulty) => modulesByLevel[level];

export const findModule = (level: Difficulty, moduleId: string) =>
  modulesByLevel[level].find((module) => module.id === moduleId);
