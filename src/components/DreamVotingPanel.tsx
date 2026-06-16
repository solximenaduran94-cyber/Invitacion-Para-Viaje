/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { DestinationDetails } from '../types';
import { Sparkles, Edit3, Heart, ArrowRight } from 'lucide-react';

interface DreamVotingPanelProps {
  selectedDestination: 'calafate' | 'bariloche' | null;
  dreams: string;
  onDreamsChange: (value: string) => void;
  onConfirm: () => void;
  destinationDetails: DestinationDetails | null;
  milagrosName: string;
}

export default function DreamVotingPanel({
  selectedDestination,
  dreams,
  onDreamsChange,
  onConfirm,
  destinationDetails,
  milagrosName,
}: DreamVotingPanelProps) {
  
  // Custom suggestion logs based on the destination
  const CalafateSuggestions = [
    'Caminando de la mano abrigados bajo el mismo poncho observando las inmensas agujas celestes.',
    'Escuchando el crujido milenario con chocolate caliente para tibiar nuestras almas frente al glaciar.',
    'Navegar entre icebergs flotantes contemplando los reflejos y jurándonos sueños viajeros en el fin del mundo.',
    'Amanecer temprano sosteniéndonos la mirada frente al gigante blanco antes de que el mundo despierte.'
  ];

  const BarilocheSuggestions = [
    'Refugiados frente a una estufa a leña encendida, oyendo llover afuera mientras comemos bombones artesanales.',
    'Perdernos de risa en los senderos de arrayanes sintiendo el murmullo de hojitas color canela sobre nosotros.',
    'Brindar en una cabaña rústica mirando el Nahuel Huapi pintado de violetas y amarillos por el crepúsculo.',
    'Contemplar lagos espejados desde las cumbres alpinas y abrigarnos entre abrazos que detengan el frío.'
  ];

  const suggestions = selectedDestination === 'calafate' ? CalafateSuggestions : BarilocheSuggestions;

  const handleSuggestionClick = (suggestion: string) => {
    if (dreams.trim()) {
      onDreamsChange(dreams + ' ' + suggestion);
    } else {
      onDreamsChange(suggestion);
    }
  };

  return (
    <motion.div
      id="dream-voting-panel"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-xl border border-neutral-100 p-6 md:p-8 mt-12 backdrop-blur-md"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
          <Edit3 className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h4 className="text-xl md:text-2xl font-serif font-semibold text-neutral-800">
            Escribe tus sueños viajeros o añade un mensaje
          </h4>
          <p className="text-xs text-neutral-400 font-sans tracking-wide">
            Juan leerá cada palabra. Personaliza este momento romántico para los dos.
          </p>
        </div>
      </div>

      {selectedDestination ? (
        <div className="space-y-6">
          {/* Poetic tips/suggestive questions */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-rose-500 font-sans mb-3">
              ¿Qué te imaginas haciendo junto a él en {destinationDetails?.title}?
            </label>
            
            {/* Quick pre-fill cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 my-3">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  id={`suggestion-${i}`}
                  onClick={() => handleSuggestionClick(sug)}
                  className="p-3 text-left text-xs bg-neutral-50 hover:bg-rose-50/50 hover:text-rose-900 border border-neutral-100 hover:border-rose-200 rounded-xl transition-all duration-300 text-neutral-600 leading-relaxed cursor-pointer"
                >
                  &ldquo;{sug}&rdquo;
                </button>
              ))}
            </div>

            {/* Main Interactive TextArea */}
            <textarea
              id="dreams-textarea"
              rows={4}
              value={dreams}
              onChange={(e) => onDreamsChange(e.target.value)}
              placeholder="Escribe tus propios deseos, ideas de paseos o un mensaje especial para Juan..."
              className="w-full p-4 mt-2 bg-neutral-50/70 hover:bg-neutral-50 border border-neutral-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 rounded-xl font-sans text-sm text-neutral-800 placeholder-neutral-400 outline-hidden transition-all resize-none"
            />
          </div>

          {/* Letter parchment real-time preview */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#faf6f0] border border-[#eadaa6]/60 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#eae0cd] opacity-35 filter blur-xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#f4ebd0] opacity-40 filter blur-xl" />
            
            <div className="text-center font-sans uppercase tracking-[0.2em] text-[#8c745c] text-[10px] mb-4">
              Vista previa de tu carta de respuesta
            </div>

            {/* Letter Body */}
            <div className="font-serif text-neutral-700 space-y-4 text-center select-none">
              <p className="font-script text-3xl text-rose-700 leading-none">Mi querido Juan,</p>
              
              <p className="text-sm md:text-base leading-relaxed px-2 md:px-6">
                Acepto con todo mi corazón tu hermosa invitación. 
                Siento que el mejor lugar para que vivamos esta escapada del <span className="font-semibold text-neutral-800">8 al 12 de Julio</span> es{' '}
                <span className={`font-semibold underline decoration-2 underline-offset-4 ${selectedDestination === 'calafate' ? 'text-sky-800 decoration-sky-400' : 'text-amber-800 decoration-amber-500'}`}>
                  {destinationDetails?.title}
                </span>.
              </p>

              {dreams.trim() ? (
                <p className="text-sm md:text-base italic leading-relaxed text-[#514337] bg-white/40 p-4 rounded-xl border border-[#ede3cb] max-w-xl mx-auto font-sans">
                  &ldquo;{dreams}&rdquo;
                </p>
              ) : (
                <p className="text-xs italic leading-relaxed text-neutral-400">
                  (Aquí se verán tus sueños viajeros cuando empieces a escribir o elijas una sugerencia...)
                </p>
              )}

              <p className="font-script text-3xl text-rose-700 leading-none pt-2">Con amor, {milagrosName}.</p>
            </div>
          </div>

          {/* Core Call To Action */}
          <div className="flex flex-col items-center pt-4">
            <button
              type="button"
              id="confirm-viaje-btn"
              onClick={onConfirm}
              className={`w-full max-w-md py-4 px-8 rounded-xl font-sans text-sm font-semibold uppercase tracking-widest text-white shadow-xl hover:-translate-y-0.5 active:translate-y-0 duration-300 transition-all flex items-center justify-center gap-2.5 cursor-pointer
                ${selectedDestination === 'calafate' 
                  ? 'bg-sky-600 hover:bg-sky-700 hover:shadow-sky-200 bg-linear-to-r from-sky-600 to-sky-700' 
                  : 'bg-amber-600 hover:bg-amber-700 hover:shadow-amber-200 bg-linear-to-r from-amber-600 to-amber-700'}`}
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Sellar mi elección y sueños</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-neutral-400 mt-2.5 text-center font-sans tracking-wide">
              * Esto sellará tu respuesta y revelará la carta mística con el enlace directo para enviárselo a Juan.
            </p>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center rounded-xl bg-rose-50/30 border border-dashed border-rose-100 flex flex-col items-center justify-center">
          <Heart className="w-10 h-10 text-rose-300 animate-pulse mb-3" />
          <h5 className="text-sm font-serif font-medium text-neutral-700">Por favor, elige tu destino primero</h5>
          <p className="text-xs text-neutral-400 max-w-sm mt-1 font-sans leading-relaxed">
            Navega más arriba y haz clic en "Seleccionar" en la tarjeta de El Calafate o Bariloche para poder escribir tu hermosa carta.
          </p>
        </div>
      )}
    </motion.div>
  );
}
