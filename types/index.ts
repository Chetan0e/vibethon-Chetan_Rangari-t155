export interface User {
  uid: string;
  email: string;
  xp: number;
  progress: number;
  level: "Seed" | "Sprout" | "Bloom";
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
}
