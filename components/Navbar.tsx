"use client";

import { useState } from "react";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import AnimatedLogo from "@/components/AnimatedLogo";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/module", label: "Modules" },
    { href: "/playground", label: "Playground" },
    { href: "/game", label: "Games" },
    { href: "/quiz", label: "Quiz" },
    { href: "/simulation", label: "Simulation" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white p-1 shadow-sm ring-1 ring-purple-100">
            <AnimatedLogo size={34} />
          </div>
          <h1 className="bg-gradient-to-r from-gray-900 to-purple-700 bg-clip-text text-2xl font-extrabold text-transparent">
            Bloom
          </h1>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-gray-600 transition hover:text-purple-600">
              {link.label}
            </a>
          ))}
          <button
            onClick={handleLogout}
            className="rounded-lg bg-gradient-to-r from-red-400 to-red-500 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:from-red-500 hover:to-red-600 hover:shadow-lg"
          >
            Logout
          </button>
        </div>

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

      {mobileMenuOpen && (
        <div className="border-t bg-white/95 backdrop-blur-md transition-all duration-300 md:hidden">
          <div className="flex flex-col p-4 gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 font-medium text-gray-600 transition hover:bg-purple-50 hover:text-purple-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="mt-2 rounded-lg bg-gradient-to-r from-red-400 to-red-500 px-5 py-3 font-medium text-white shadow-md transition hover:from-red-500 hover:to-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
