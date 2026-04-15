import Link from "next/link";
import AnimatedLogo from "@/components/AnimatedLogo";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="mb-8 animate-fade-in">
        <AnimatedLogo size={150} />
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <h1 className="text-5xl md:text-7xl font-bold gradient-text">
          Bloom
        </h1>
      </div>

      <p
        className="mt-6 text-gray-600 text-center text-lg md:text-xl max-w-2xl animate-fade-in"
        style={{ animationDelay: '0.3s' }}
      >
        Learn AI by Playing, Building & Experimenting. Transform complex concepts into interactive experiences.
      </p>

      <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <Link href="/login">
          <button className="mt-8 btn-primary px-8 py-4 rounded-xl text-lg font-semibold">
            Get Started 🚀
          </button>
        </Link>
      </div>

      <div
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl animate-fade-in"
        style={{ animationDelay: '0.7s' }}
      >
        <div className="glass-card p-6 text-center">
          <div className="text-4xl mb-3">🎮</div>
          <h3 className="font-semibold">Learn by Playing</h3>
          <p className="text-sm text-gray-600 mt-2">Interactive games to master ML concepts</p>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="text-4xl mb-3">🧠</div>
          <h3 className="font-semibold">AI Mentor</h3>
          <p className="text-sm text-gray-600 mt-2">Get personalized guidance 24/7</p>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="text-4xl mb-3">🏆</div>
          <h3 className="font-semibold">Compete & Grow</h3>
          <p className="text-sm text-gray-600 mt-2">Earn XP, climb leaderboards</p>
        </div>
      </div>
    </div>
  );
}
