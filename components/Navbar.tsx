"use client";

import { useState } from "react";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import AnimatedLogo from "@/components/AnimatedLogo";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <AnimatedLogo size={40} />
          <h1 className="font-bold text-2xl gradient-text">Bloom</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          <a href="/dashboard" className="text-gray-600 hover:text-purple-500 transition font-medium">
            Dashboard
          </a>
          <a href="/roadmap" className="text-gray-600 hover:text-purple-500 transition font-medium">
            Roadmap
          </a>
          <a href="/leaderboard" className="text-gray-600 hover:text-purple-500 transition font-medium">
            Leaderboard
          </a>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white px-5 py-2 rounded-lg transition font-medium shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden bg-white/95 backdrop-blur-md border-t transition-all duration-300"
        >
          <div className="flex flex-col p-4 gap-3">
            <a
              href="/dashboard"
              className="text-gray-600 hover:text-purple-500 transition font-medium py-2 px-4 rounded-lg hover:bg-purple-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </a>
            <a
              href="/roadmap"
              className="text-gray-600 hover:text-purple-500 transition font-medium py-2 px-4 rounded-lg hover:bg-purple-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Roadmap
            </a>
            <a
              href="/leaderboard"
              className="text-gray-600 hover:text-purple-500 transition font-medium py-2 px-4 rounded-lg hover:bg-purple-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Leaderboard
            </a>
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white px-5 py-3 rounded-lg transition font-medium shadow-md mt-2"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
