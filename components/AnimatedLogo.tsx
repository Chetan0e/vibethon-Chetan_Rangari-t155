"use client";

import { useEffect, useState } from "react";

const petalColors = [
  "#4ade80", // green
  "#facc15", // yellow
  "#fb923c", // orange
  "#f472b6", // pink
  "#a855f7", // purple
  "#60a5fa", // blue
];

export default function AnimatedLogo({ size = 120 }: { size?: number }) {
  const [mounted, setMounted] = useState(false);
  const petalSize = size * 0.35;
  const centerSize = size * 0.25;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Central Circle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg"
        style={{ 
          width: centerSize, 
          height: centerSize,
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)`,
          transform: mounted ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
          opacity: mounted ? 1 : 0,
          transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s ease',
          transitionDelay: mounted ? '0.6s' : '0s'
        }}
      />

      {/* Petals */}
      {petalColors.map((color, index) => {
        const angle = (index * 60) * (Math.PI / 180);
        const distance = size * 0.3;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return (
          <div
            key={index}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
            style={{
              width: petalSize,
              height: petalSize * 1.4,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
              boxShadow: `0 4px 20px ${color}40, inset 0 2px 10px ${color}60`,
              transform: mounted 
                ? `translate(${x}px, ${y}px) rotate(${angle}rad) scale(1)` 
                : `translate(0, 0) rotate(-180deg) scale(0)`,
              opacity: mounted ? 0.85 : 0,
              transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease`,
              transitionDelay: mounted ? `${index * 0.1}s` : '0s'
            }}
          />
        );
      })}
    </div>
  );
}
