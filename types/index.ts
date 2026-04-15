export interface User {
  uid: string;
  email: string;
  xp: number;
  progress: number;
  level: "Seed" | "Sprout" | "Bloom";
  streak?: number;
  badges?: string[];
  modulesCompleted?: string[];
  quizScores?: Record<string, number>;
  gameStats?: Record<string, number>;
  createdAt: Date;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  topics: string[];
  status: "completed" | "in-progress" | "locked";
}

export interface LeaderboardUser {
  id: string;
  email: string;
  xp: number;
  level: string;
  progress: number;
  streak?: number;
  badges?: string[];
}

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface ModuleVideo {
  id: string;
  title: string;
  url: string;
}

export interface LearningModule {
  id: string;
  level: Difficulty;
  title: string;
  concept: string;
  realWorldExample: string;
  visualLabel: string;
  xpReward: number;
  videos: ModuleVideo[];
}

export interface QuizQuestion {
  id: string;
  moduleId: string;
  prompt: string;
  options: string[];
  correct: number;
  difficulty: Difficulty;
  explanation: string;
  xp: number;
}
