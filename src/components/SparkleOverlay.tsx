import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Star } from 'lucide-react';

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
  type: 'sparkle' | 'heart' | 'star' | 'circle';
}

export default function SparkleOverlay() {
  const [particles, setParticles] = useState<SparkleParticle[]>([]);

  useEffect(() => {
    const colors = [
      '#FCD34D', // Gold
      '#F472B6', // Rose pink
      '#FB7185', // Coral/rose
      '#6EE7B7', // Emerald spark
      '#FFFbeb', // Warm pure white
      '#FDA4AF', // Rose gold
    ];

    const types: ('sparkle' | 'heart' | 'star' | 'circle')[] = [
      'sparkle', 'heart', 'star', 'circle'
    ];

    // Generate 65 sparkly particles spread across the entire viewport
    const generated = Array.from({ length: 65 }).map((_, i) => {
      const type = types[Math.floor(Math.random() * types.length)];
      return {
        id: i,
        // Start across the screen width (0% to 100%)
        x: Math.random() * 100,
        // Start from middle/bottom to rise up
        y: 60 + Math.random() * 40, 
        size: 10 + Math.random() * 26, // 10px to 36px size range
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 1.5,
        duration: 2.5 + Math.random() * 3, // Drift duration
        rotation: Math.random() * 360,
        type,
      };
    });

    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* Golden spotlight flashes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.45, 0.2, 0] }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
        className="absolute inset-0 bg-gradient-radial from-amber-200/40 via-rose-100/10 to-transparent mix-blend-screen"
      />

      {particles.map((p) => {
        return (
          <motion.div
            key={p.id}
            initial={{ 
              opacity: 0, 
              scale: 0.1, 
              left: `${p.x}%`, 
              top: `${p.y}%`,
              rotate: p.rotation
            }}
            animate={{ 
              opacity: [0, 0.9, 0.9, 0],
              scale: [0.3, 1.2, 1, 0],
              top: [`${p.y}%`, `${p.y - 80}%`],
              left: [`${p.x}%`, `${p.x + (Math.random() * 20 - 10)}%`],
              rotate: p.rotation + 360
            }}
            transition={{ 
              delay: p.delay,
              duration: p.duration,
              ease: "easeInOut",
              repeat: 1, // Repeat once for sustained magic
            }}
            className="absolute drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]"
            style={{ color: p.color }}
          >
            {p.type === 'sparkle' && <Sparkles style={{ width: p.size, height: p.size }} className="fill-current" />}
            {p.type === 'heart' && <Heart style={{ width: p.size, height: p.size }} className="fill-current" />}
            {p.type === 'star' && <Star style={{ width: p.size, height: p.size }} className="fill-current" />}
            {p.type === 'circle' && (
              <div 
                className="rounded-full shadow-inner" 
                style={{ 
                  width: p.size / 1.5, 
                  height: p.size / 1.5, 
                  backgroundColor: p.color 
                }} 
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
