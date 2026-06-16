/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles, Map } from 'lucide-react';

interface LetterEnvelopeProps {
  onOpen: () => void;
  milagrosName: string;
}

export default function LetterEnvelope({ onOpen, milagrosName }: LetterEnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1200); // Allow animation to finish
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 z-10 relative">
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            id="envelope-wrapper"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -50, transition: { duration: 0.8, ease: 'easeIn' } }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-full max-w-lg bg-neutral-50/90 text-neutral-800 rounded-2xl shadow-2xl overflow-hidden border border-rose-100/50 flex flex-col items-center justify-between p-8 md:p-12 relative"
          >
            {/* Ambient gold corner decoration */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-200 rounded-tl-xl p-1 pointer-events-none" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-200 rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-amber-200 rounded-bl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-200 rounded-br-xl pointer-events-none" />

            {/* Stamp / Rose Seal design at top */}
            <div className="mb-6 flex flex-col items-center">
              <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-medium mb-2 font-sans">
                Patagonia te espera
              </span>
              <div className="h-[2px] w-12 bg-amber-200 mb-6" />
            </div>

            {/* To Milagros Label */}
            <div className="text-center my-6">
              <p className="text-sm italic uppercase text-neutral-400 font-sans tracking-widest mb-1">
                Escrito con el alma para
              </p>
              <h1 id="recipient-name" className="text-6xl md:text-7xl font-script text-rose-600 tracking-wide my-4 select-none">
                {milagrosName || 'Mili'}
              </h1>
              <p className="text-amber-700 font-sans text-xs flex items-center justify-center gap-1.5 font-medium tracking-wide">
                <Map className="w-3.5 h-3.5" /> DE JUAN · JULIO 2026
              </p>
            </div>

            {/* Visual envelope representation */}
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-rose-200 to-transparent my-4" />

            {/* Wax Seal Area */}
            <div className="my-8 flex flex-col items-center justify-center relative">
              {/* Pulsing glow under wax seal */}
              <div className="absolute w-20 h-20 bg-rose-400/20 rounded-full blur-xl animate-pulse" />

              <button
                id="open-letter-btn"
                onClick={handleOpenClick}
                className="group relative z-10 w-20 h-20 bg-red-700 hover:bg-red-800 transition-colors duration-300 rounded-full flex flex-col items-center justify-center shadow-[inset_0px_2px_4px_rgba(255,255,255,0.4),0px_6px_16px_rgba(159,18,57,0.3)] border border-red-800 hover:scale-105 active:scale-95 cursor-pointer"
                title="Haz clic para abrir"
              >
                <div className="absolute w-[calc(100%-6px)] h-[calc(100%-6px)] border-2 border-dashed border-red-500/30 rounded-full" />
                <Heart className="w-6 h-6 text-amber-200 fill-amber-200/40 group-hover:scale-110 duration-300 group-hover:rotate-12" />
                <span className="text-[10px] text-amber-100/90 font-medium tracking-wider font-sans mt-1">
                  ABRIR
                </span>
                
                {/* Floating sparkle elements on hover */}
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                </div>
              </button>
              
              <span className="text-xs text-rose-500/80 font-sans font-medium tracking-wide mt-3 animate-pulse">
                Presiona el sello para abrir su corazón
              </span>
            </div>

            {/* Poetic teaser phrase at bottom */}
            <p className="text-center text-xs md:text-sm text-neutral-500 italic max-w-sm mt-4 font-serif leading-relaxed px-2">
              \"Hay invitaciones que nacen en un susurro y se transforman en senderos, cumbres y recuerdos que no se apagan...\"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
