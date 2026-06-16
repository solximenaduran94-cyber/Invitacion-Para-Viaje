import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Hourglass } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  selectedDate?: 'opcion1' | 'opcion2';
}

export default function CountdownTimer({ selectedDate }: CountdownTimerProps) {
  const targetDate = selectedDate === 'opcion2'
    ? new Date('2026-07-22T00:00:00')
    : new Date('2026-07-08T00:00:00');

  const calculateTimeLeft = (target: Date): TimeLeft => {
    const difference = target.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    // Update immediately when targetDate / selectedDate changes
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedDate]);

  const timeBlocks = [
    { label: 'DÍAS', value: timeLeft.days, color: 'text-rose-600' },
    { label: 'HORAS', value: timeLeft.hours, color: 'text-neutral-700' },
    { label: 'MINUTOS', value: timeLeft.minutes, color: 'text-neutral-700' },
    { label: 'SEGUNDOS', value: timeLeft.seconds, color: 'text-rose-500 font-mono' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md mx-auto my-6 px-4 py-5 bg-white/75 border border-rose-100/60 rounded-3xl shadow-lg backdrop-blur-md relative overflow-hidden flex flex-col items-center select-none"
    >
      {/* Background soft particles simulation or glow */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-rose-200/20 blur-xl rounded-full -mr-3 -mt-3" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-sky-200/20 blur-xl rounded-full -ml-3 -mb-3" />

      <div className="flex items-center gap-2 mb-3 text-rose-500/80">
        <Hourglass className="w-4 h-4 animate-spin-slow text-rose-400" />
        <span className="font-sans text-xs font-bold tracking-widest uppercase">LA CUENTA REGRESIVA</span>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
        {timeBlocks.map((block) => (
          <div
            key={block.label}
            className="flex flex-col items-center p-2.5 rounded-2xl bg-neutral-50/85 border border-neutral-100/60 shadow-xs"
          >
            <span className={`text-2xl md:text-3xl font-extrabold tracking-tight font-sans ${block.color}`}>
              {String(block.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] md:text-[10px] font-sans font-bold tracking-wider text-neutral-400 mt-1 uppercase">
              {block.label}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-3.5 text-center font-script text-lg text-rose-700/85 md:text-xl">
        Hasta que nuestros mundos se detengan en el sur...
      </p>
    </motion.div>
  );
}
