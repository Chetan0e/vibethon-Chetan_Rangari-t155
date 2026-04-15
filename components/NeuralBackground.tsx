"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function StarField() {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 3000; i++) {
      p.push((Math.random() - 0.5) * 15);
      p.push((Math.random() - 0.5) * 15);
      p.push((Math.random() - 0.5) * 15);
    }
    return new Float32Array(p);
  }, []);

  const ref = useRef<any>();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3}>
      <PointMaterial
        transparent
        color="#667eea"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

export default function NeuralBackground({ intensity = 0.3 }: { intensity?: number }) {
  return (
    <div className="absolute inset-0 -z-10" style={{ opacity: intensity }}>
      <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <StarField />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
}
