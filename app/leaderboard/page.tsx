"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Leaderboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snap = await getDocs(collection(db, "users"));
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        data.sort((a, b) => (b.xp || 0) - (a.xp || 0));
        setUsers(data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 0) return "🥇";
    if (rank === 1) return "🥈";
    if (rank === 2) return "🥉";
    return `#${rank + 1}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 0) return "text-yellow-500";
    if (rank === 1) return "text-gray-500";
    if (rank === 2) return "text-orange-500";
    return "text-gray-700";
  };

  return (
    <>
      <Navbar />

      <div className="p-6 md:p-10 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            🏆 Leaderboard
          </h1>
          <p className="text-gray-600">Top AI learners on Bloom</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center mt-10">
            <div className="animate-pulse text-xl gradient-text">Loading...</div>
          </div>
        ) : (
          <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="neon-glow">
              <div className="space-y-3">
                {users.length === 0 ? (
                  <p className="text-center text-gray-500 py-10">
                    No users yet. Be the first to join! 🚀
                  </p>
                ) : (
                  users.map((user, index) => (
                    <div
                      key={user.id}
                      className={`flex items-center justify-between p-4 rounded-lg animate-fade-in ${
                        index === 0
                          ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400"
                          : index === 1
                          ? "bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-400"
                          : index === 2
                          ? "bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-400"
                          : "bg-white border border-gray-200"
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-2xl font-bold ${getRankColor(index)}`}>
                          {getRankIcon(index)}
                        </span>
                        <div>
                          <p className="font-semibold">
                            {user.email?.split("@")[0] || "Anonymous"}
                          </p>
                          <p className="text-sm text-gray-500">
                            Level: {user.level || "Seed"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold gradient-text">
                          {user.xp || 0} XP
                        </p>
                        <p className="text-sm text-gray-500">
                          {user.progress || 0}% Complete
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        )}

        <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Card>
            <h3 className="font-semibold mb-4">🎯 How to climb the leaderboard?</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✅ Complete learning modules (+10 XP)</li>
              <li>✅ Play interactive games (+20 XP)</li>
              <li>✅ Take quizzes (+10 XP per correct answer)</li>
              <li>✅ Maintain daily streaks</li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
