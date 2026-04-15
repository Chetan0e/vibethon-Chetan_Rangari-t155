"use client";

import { useEffect, useState } from "react";

export default function AnimatedLogo({ size = 120 }: { size?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        aria-label="Bloom logo"
        style={{
          transform: mounted ? "scale(1)" : "scale(0)",
          opacity: mounted ? 1 : 0,
          transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease",
        }}
      >
        <defs>
          {/* Main gradient for the flower petals */}
          <linearGradient id="petalGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="petalGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="petalGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          <linearGradient id="petalGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="petalGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="petalGradient6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          
          {/* Center gradient */}
          <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F5F3FF" />
            <stop offset="100%" stopColor="#EDE9FE" />
          </radialGradient>
          
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Shadow filter */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.1"/>
          </filter>
        </defs>

        <style>{`
          @keyframes petalBloom {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          @keyframes centerPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
          @keyframes rotateSlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
          }
        `}</style>

        <g filter="url(#shadow)">
          {/* Outer ring */}
          <circle 
            cx="60" 
            cy="60" 
            r="52" 
            fill="none" 
            stroke="url(#petalGradient1)" 
            strokeWidth="2"
            strokeDasharray="8 4"
            style={{
              opacity: mounted ? 0.3 : 0,
              transition: "opacity 0.5s ease",
              animation: mounted ? "rotateSlow 20s linear infinite" : "none",
              transformOrigin: "60px 60px",
            }}
          />
          
          {/* Petals - 6 petals arranged in a flower pattern */}
          <g style={{
            transformOrigin: "60px 60px",
            animation: mounted ? "float 3s ease-in-out infinite" : "none",
          }}>
            {[
              { angle: 0, gradient: "petalGradient1", delay: 0 },
              { angle: 60, gradient: "petalGradient2", delay: 0.05 },
              { angle: 120, gradient: "petalGradient3", delay: 0.1 },
              { angle: 180, gradient: "petalGradient4", delay: 0.15 },
              { angle: 240, gradient: "petalGradient5", delay: 0.2 },
              { angle: 300, gradient: "petalGradient6", delay: 0.25 },
            ].map((petal, index) => (
              <g
                key={index}
                transform={`translate(60, 60) rotate(${petal.angle}) translate(0, -28)`}
                style={{
                  transformOrigin: "60px 32px",
                  animation: mounted 
                    ? `petalBloom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${petal.delay}s forwards` 
                    : "none",
                  opacity: mounted ? 0 : 0,
                }}
              >
                <path
                  d="M 0 0 Q -8 -15 0 -35 Q 8 -15 0 0"
                  fill={`url(#${petal.gradient})`}
                  filter="url(#glow)"
                  opacity="0.9"
                />
              </g>
            ))}
          </g>
          
          {/* Inner decorative ring */}
          <circle 
            cx="60" 
            cy="60" 
            r="22" 
            fill="none" 
            stroke="rgba(139, 92, 246, 0.3)" 
            strokeWidth="1.5"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.5s ease 0.4s",
            }}
          />
          
          {/* Center circle */}
          <g style={{
            transformOrigin: "60px 60px",
            animation: mounted ? "centerPulse 2s ease-in-out infinite 0.5s" : "none",
          }}>
            <circle 
              cx="60" 
              cy="60" 
              r="16" 
              fill="url(#centerGradient)"
              style={{
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.5s ease 0.3s",
              }}
            />
            {/* Inner dot */}
            <circle 
              cx="60" 
              cy="60" 
              r="5" 
              fill="#8B5CF6"
              opacity="0.8"
              style={{
                opacity: mounted ? 0.8 : 0,
                transition: "opacity 0.5s ease 0.4s",
              }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
