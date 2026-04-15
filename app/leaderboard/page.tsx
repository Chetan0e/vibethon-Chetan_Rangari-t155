"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const badgeColor = (badge: string) => {
  if (badge === "Master") return "bg-yellow-100 text-yellow-700";
  if (badge === "Pro") return "bg-blue-100 text-blue-700";
  return "bg-purple-100 text-purple-700";
};

export default function Leaderboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snap = await getDocs(collection(db, "users"));
        const data = snap.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
        data.sort((a, b) => (b.xp || 0) - (a.xp || 0));
        setUsers(data.slice(0, 20));
      } finally {
        setLoading(false);
      }
    };
    void fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-5xl p-6 md:p-10">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Leaderboard & Gamification</h1>
        <p className="text-gray-600">Rankings by XP, badge system, and streak tracking.</p>

        <div className="mt-8">
          <Card className="neon-glow">
            {loading ? (
              <p className="py-10 text-center text-gray-500">Loading leaderboard...</p>
            ) : (
              <div className="space-y-3">
                {users.map((user, index) => (
                  <div
                    key={user.id}
                    className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 ${
                      index === 0 ? "border-yellow-300 bg-yellow-50" : "border-gray-200 bg-white"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        #{index + 1} {user.email?.split("@")[0] || "anonymous"}
                      </p>
                      <p className="text-xs text-gray-500">Level {user.level || "Seed"} - Streak {user.streak || 1} days</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {(user.badges || ["Beginner"]).map((badge: string) => (
                        <span key={badge} className={`rounded-full px-2 py-1 text-[11px] font-semibold ${badgeColor(badge)}`}>
                          {badge}
                        </span>
                      ))}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold gradient-text">{user.xp || 0} XP</p>
                      <p className="text-xs text-gray-500">{user.progress || 0}% complete</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
