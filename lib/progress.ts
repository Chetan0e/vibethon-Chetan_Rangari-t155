import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

type ActivityType = "module" | "quiz" | "game" | "simulation" | "playground";

type ProgressUpdate = {
  type: ActivityType;
  refId: string;
  xp: number;
  score?: number;
  extras?: Record<string, number | string | boolean>;
};

const getLevel = (xp: number) => {
  if (xp >= 1500) return "Bloom";
  if (xp >= 600) return "Sprout";
  return "Seed";
};

const getBadgeSet = (xp: number, streak: number) => {
  const badges: string[] = [];
  if (xp >= 200) badges.push("Beginner");
  if (xp >= 700) badges.push("Pro");
  if (xp >= 1400) badges.push("Master");
  if (streak >= 5) badges.push("Streaker");
  return badges;
};

export async function recordProgress(update: ProgressUpdate) {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  const current = userSnap.exists() ? userSnap.data() : {};
  const currentXP = Number(current.xp || 0);
  const nextXP = currentXP + update.xp;
  const progress = Math.min(100, Math.floor(nextXP / 18));
  const streak = Math.max(1, Number(current.streak || 0));
  const modulesCompleted = new Set<string>(current.modulesCompleted || []);
  const quizScores = { ...(current.quizScores || {}) };
  const gameStats = { ...(current.gameStats || {}) };

  if (update.type === "module") modulesCompleted.add(update.refId);
  if (update.type === "quiz" && typeof update.score === "number") quizScores[update.refId] = update.score;
  if ((update.type === "game" || update.type === "simulation") && typeof update.score === "number") gameStats[update.refId] = update.score;

  await setDoc(
    userRef,
    {
      email: current.email || user.email,
      xp: nextXP,
      progress,
      level: getLevel(nextXP),
      streak,
      badges: getBadgeSet(nextXP, streak),
      modulesCompleted: Array.from(modulesCompleted),
      quizScores,
      gameStats,
      updatedAt: new Date(),
      ...update.extras,
    },
    { merge: true },
  );
}
