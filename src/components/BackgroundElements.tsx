/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  type: 'heart' | 'star' | 'snowflake' | 'leaf';
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

interface BackgroundElementsProps {
  currentChoice: 'calafate' | 'bariloche' | null;
}

export default function BackgroundElements({ currentChoice }: BackgroundElementsProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Determine types of particles, if Calafate we prefer snowflake-like elements, if Bariloche leafy/woody or classic romantic hearts
    const getParticleType = (): ('heart' | 'star' | 'snowflake' | 'leaf') => {
      const rand = Math.random();
      if (currentChoice === 'calafate') {
        return rand > 0.4 ? 'snowflake' : (rand > 0.15 ? 'star' : 'heart');
      } else if (currentChoice === 'bariloche') {
        return rand > 0.4 ? 'leaf' : (rand > 0.15 ? 'star' : 'heart');
      } else {
        return rand > 0.5 ? 'heart' : 'star';
      }
    };

    // Generate initial particles
    const initialParticles: Particle[] = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 120 - 20, // Start slightly offscreen
      size: Math.random() * 12 + 6,
      speed: Math.random() * 1.5 + 0.5,
      type: getParticleType(),
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.4 + 0.2,
    }));

    setParticles(initialParticles);

    // Animation interval
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => {
          let nextY = p.y + p.speed * 0.3;
          let nextX = p.x + Math.sin(nextY / 10) * 0.2;
          let nextRotation = (p.rotation + p.rotationSpeed) % 360;

          // Wrap around if bottom exceeded
          if (nextY > 110) {
            nextY = -10;
            nextX = Math.random() * 100;
          }

          return { ...p, y: nextY, x: nextX, rotation: nextRotation };
        })
      );
    }, 45);

    return () => clearInterval(interval);
  }, [currentChoice]);

  // Particle characters or SVG icons
  const renderParticleSymbol = (type: 'heart' | 'star' | 'snowflake' | 'leaf') => {
    switch (type) {
      case 'heart':
        return (
          <svg className="fill-pink-400 text-pink-300 w-full h-full" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      case 'star':
        return (
          <svg className="fill-yellow-200 text-amber-100 w-full h-full animate-pulse" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      case 'snowflake':
        return (
          <svg className="text-sky-200 stroke-sky-200 w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-9-9h18m-3-6L6 18m0-12l12 12m-3-9l-3 3-3-3m0 6l3 3 3-3" />
          </svg>
        );
      case 'leaf':
        return (
          <svg className="fill-amber-300 text-amber-400 w-full h-full" viewBox="0 0 24 24">
            <path d="M17 8C14.79 8 13 9.79 13 12S14.79 16 17 16 21 14.21 21 12 19.21 8 17 8Zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2ZM2 12c0 4.42 3.58 8 8 8 2.33 0 4.43-.99 5.9-2.58l-1.42-1.42C13.27 17.2 11.73 18 10 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.73 0 3.27.8 4.48 2.02l1.42-1.42C14.43 4.99 12.33 4 10 4c-4.42 0-8 3.58-8 8Z" />
          </svg>
        );
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Absolute colored glowing orbs representing the choices */}
      <div 
        className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full filter blur-[100px] mix-blend-multiply opacity-20 duration-1000 transition-colors
          ${currentChoice === 'calafate' ? 'bg-sky-400' : currentChoice === 'bariloche' ? 'bg-orange-300' : 'bg-pink-300'}`}
      />
      <div 
        className={`absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full filter blur-[100px] mix-blend-multiply opacity-20 duration-1000 transition-colors
          ${currentChoice === 'calafate' ? 'bg-cyan-300' : currentChoice === 'bariloche' ? 'bg-amber-400' : 'bg-rose-200'}`}
      />

      {/* Floating Sparkles & Hearts */}
      {particles.map((p) => (
        <div
          key={p.id}
          id={`particle-${p.id}`}
          className="absolute transition-all duration-300 ease-out"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            transform: `rotate(${p.rotation}deg)`,
            opacity: p.opacity,
          }}
        >
          {renderParticleSymbol(p.type)}
        </div>
      ))}
    </div>
  );
}
