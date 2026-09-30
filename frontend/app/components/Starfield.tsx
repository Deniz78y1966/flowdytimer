'use client';

import { useMemo } from 'react';

// Small seeded random generator: looks random, but is identical on server and client
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateShadows(count: number, maxX: number, maxY: number, seed: number) {
  const rand = mulberry32(seed);
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(rand() * maxX);
    const y = Math.floor(rand() * maxY);
    shadows.push(`${x}px ${y}px #fff`);
  }
  return shadows.join(', ');
}

function StarLayer({
  shadows,
  size,
  duration,
  delay = '0s',
}: {
  shadows: string;
  size: number;
  duration: string;
  delay?: string;
}) {
  const dotStyle = { boxShadow: shadows, width: `${size}px`, height: `${size}px` };
  return (
    <div
      className="absolute inset-0 animate-[star-drift_linear_infinite,twinkle_ease-in-out_infinite]"
      style={{ animationDuration: `${duration}, 4s`, animationDelay: `0s, ${delay}` }}
    >
      <div className="absolute inset-0" style={dotStyle} />
      <div className="absolute inset-0 top-[-2000px]" style={dotStyle} />
    </div>
  );
}

export default function Starfield() {
  const small = useMemo(() => generateShadows(400, 2000, 2000, 1), []);
  const medium = useMemo(() => generateShadows(140, 2000, 2000, 2), []);
  const large = useMemo(() => generateShadows(50, 2000, 2000, 3), []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0c1116]">
      <StarLayer shadows={small} size={1} duration="90s" />
      <StarLayer shadows={medium} size={2} duration="60s" delay="1s" />
      <StarLayer shadows={large} size={2} duration="40s" delay="2s" />
    </div>
  );
}