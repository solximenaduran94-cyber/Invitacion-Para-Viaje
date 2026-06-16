/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DESTINATIONS } from './data';
import { Destination, TravelResponse } from './types';
import BackgroundElements from './components/BackgroundElements';
import LetterEnvelope from './components/LetterEnvelope';
import PoeticDestinationCard from './components/PoeticDestinationCard';
import DreamVotingPanel from './components/DreamVotingPanel';
import ConfirmationScreen from './components/ConfirmationScreen';
import ActivitiesGallery from './components/ActivitiesGallery';
import CountdownTimer from './components/CountdownTimer';
import SparkleOverlay from './components/SparkleOverlay';
import { playChime, playHeartbeat, playParchment, startBackgroundSong, stopBackgroundSong } from './utils/audio';
import { Calendar, Compass, Heart, MapPin, Sparkles, Volume2, VolumeX, Mail } from 'lucide-react';

export default function App() {
  // Configurable name in case they want customization, default is "Mili"
  const [milagrosName, setMilagrosName] = useState('Mili');
  
  // State loaded from localStorage for persistent user experience
  const [response, setResponse] = useState<TravelResponse>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('milagros_trip_response_2026');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.milagrosName === 'Milagros') {
            parsed.milagrosName = 'Mili';
          }
          return parsed;
        } catch (e) {
          console.error('Error parsing response state', e);
        }
      }
    }
    return {
      choice: null,
      dreams: '',
      confirmed: false,
      opened: false,
      milagrosName: 'Mili'
    };
  });

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<Destination | null>(null);
  
  // State for high-fidelity golden sparkle particles on screen transition
  const [showSparkleTransition, setShowSparkleTransition] = useState(false);
  
  // State for hearts popped by clicking on the Polaroid photo
  const [clickHearts, setClickHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handlePolaroidClick = (e: React.MouseEvent<HTMLDivElement>) => {
    triggerHeartbeat();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newHeart = {
      id: Date.now() + Math.random(),
      x,
      y
    };
    
    setClickHearts((prev) => [...prev, newHeart]);
    
    // Auto cleanup
    setTimeout(() => {
      setClickHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);
  };

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('milagros_trip_response_2026', JSON.stringify(response));
  }, [response]);

  // Manage background romantic song playing based on opened status & sound preference
  useEffect(() => {
    if (soundEnabled && response.opened) {
      startBackgroundSong();
    } else {
      stopBackgroundSong();
    }
    return () => {
      stopBackgroundSong();
    };
  }, [soundEnabled, response.opened]);

  // Audio trigger wrappers checking state
  const triggerChime = () => {
    if (soundEnabled) playChime();
  };

  const triggerHeartbeat = () => {
    if (soundEnabled) playHeartbeat();
  };

  const triggerParchment = () => {
    if (soundEnabled) playParchment();
  };

  // State Mutators
  const handleOpenLetter = () => {
    setResponse((prev) => ({ ...prev, opened: true }));
    triggerChime();
  };

  const handleSelectDestination = (destId: Destination) => {
    setResponse((prev) => ({ ...prev, choice: destId }));
    triggerHeartbeat();
  };

  const handleDreamsChange = (text: string) => {
    setResponse((prev) => ({ ...prev, dreams: text }));
  };

  const handleConfirm = () => {
    if (!response.choice) return;
    setShowSparkleTransition(true);
    setResponse((prev) => ({ ...prev, confirmed: true }));
    triggerChime();

    // Fade and clean up the high volume sparkle explosion after 7.5 seconds
    setTimeout(() => {
      setShowSparkleTransition(false);
    }, 7500);
  };

  const handleReset = () => {
    setShowSparkleTransition(false);
    setResponse({
      choice: null,
      dreams: '',
      confirmed: false,
      opened: true, // Keep it opened once she opened it once
      milagrosName: 'Mili'
    });
    triggerParchment();
  };

  // Find destination payload
  const currentDestinationDetails = response.choice 
    ? DESTINATIONS.find(d => d.id === response.choice) || null
    : null;

  // Let's decide background tint state
  const getPageBackgroundTheme = () => {
    if (!response.opened) return 'bg-[#FAF8F5]'; // Soft cream paper background
    if (response.choice === 'calafate') return 'bg-gradient-to-b from-[#EFF9FC] via-[#F8FBFC] to-[#E6F3F7]';
    if (response.choice === 'bariloche') return 'bg-gradient-to-b from-[#FFF9F2] via-[#FFFBF7] to-[#FDF5EB]';
    return 'bg-gradient-to-b from-[#FAF8F5] via-[#FFFDFB] to-[#F7F3EE]';
  };

  return (
    <div className={`min-h-screen ${getPageBackgroundTheme()} transition-colors duration-1000 relative flex flex-col justify-between selection:bg-rose-200 selection:text-rose-900 pb-12`}>
      
      {/* Immersive background particles and orbs */}
      <BackgroundElements currentChoice={response.choice} />

      {/* High-fidelity sparkle overlay on choosing and confirming */}
      {showSparkleTransition && <SparkleOverlay />}

      {/* Floating Control Toolbar (Mute/Reset) */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        {response.opened && (
          <button
            onClick={() => {
              setResponse(prev => ({ ...prev, opened: false, confirmed: false }));
              triggerParchment();
            }}
            className="p-2.5 rounded-full bg-white/70 hover:bg-white border border-neutral-100 shadow-md text-neutral-500 hover:text-rose-500 transition-all cursor-pointer"
            title="Ver Sobre Cerrado"
          >
            <Mail className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2.5 rounded-full bg-white/70 hover:bg-white border border-neutral-100 shadow-md text-neutral-500 hover:text-rose-500 transition-all cursor-pointer"
          title={soundEnabled ? "Silenciar ambiente" : "Activar sonido romántico"}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-rose-500 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      {/* Primary Layout Area */}
      <main className="flex-grow flex flex-col justify-center relative w-full z-10 px-4 md:px-8">
        
        <AnimatePresence mode="wait">
          {!response.opened ? (
            /* PHASE 1: Closed Envelope Wax Seal */
            <motion.div
              key="closed-envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12"
            >
              <LetterEnvelope onOpen={handleOpenLetter} milagrosName={response.milagrosName} />
            </motion.div>
          ) : response.confirmed && response.choice && currentDestinationDetails ? (
            /* PHASE 3: Confirmed Boarding Pass Ticket */
            <motion.div
              key="confirmed-boarding-pass"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="py-6"
            >
              <ConfirmationScreen
                selectedDestination={response.choice}
                dreams={response.dreams}
                destinationDetails={currentDestinationDetails}
                onReset={handleReset}
                milagrosName={response.milagrosName}
              />
            </motion.div>
          ) : (
            /* PHASE 2: Main Invitation and voting interface */
            <motion.div
              key="letter-revealed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="max-w-6xl mx-auto py-10 w-full"
            >
              {/* Romantic invitation letter header */}
              <div className="text-center mb-12 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="mb-3 text-rose-500"
                >
                  <Heart className="w-8 h-8 fill-rose-500/10" />
                </motion.div>
                
                <h1 className="text-3xl md:text-5xl font-serif font-extrabold text-neutral-800 tracking-tight leading-tight">
                  Un Viaje Juntos es la Mejor Respuestas
                </h1>
                
                <p className="text-xl md:text-2xl font-script text-rose-600 mt-2 select-none tracking-wide animate-fade-in">
                  {response.milagrosName}, ¿a dónde nos guiarán nuestros sueños?
                </p>

                {/* Polaroid of the couple at the beginning of the letter */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  whileHover={{ scale: 1.05, rotate: 1, transition: { duration: 0.3 } }}
                  onClick={handlePolaroidClick}
                  className="relative mt-6 mb-2 bg-white p-4 pb-5 shadow-xl border border-neutral-100/80 rounded-sm w-64 md:w-72 flex flex-col items-center gap-3 select-none cursor-pointer"
                >
                  {/* Floating Click Hearts */}
                  <AnimatePresence>
                    {clickHearts.map((heart) => (
                      <motion.div
                        key={heart.id}
                        initial={{ opacity: 1, scale: 0.4, x: heart.x - 12, y: heart.y - 12 }}
                        animate={{ 
                          opacity: [1, 1, 0], 
                          scale: [0.6, 1.6, 1.2],
                          y: heart.y - 140 - Math.random() * 60,
                          x: heart.x - 12 + (Math.random() - 0.5) * 80
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute pointer-events-none z-50 text-rose-500 fill-rose-500"
                        style={{ left: 0, top: 0 }}
                      >
                        <Heart className="w-6 h-6 fill-rose-500" />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <div className="relative w-full aspect-square overflow-hidden bg-neutral-100 border border-neutral-100 rounded-xs">
                    <img 
                      src="/images/juan_y_mili.jpg" 
                      alt="Juan y Mili" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-15 hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="text-center font-script text-xl md:text-2xl text-rose-700/80 tracking-wide flex items-center justify-center gap-2">
                    Juan & {response.milagrosName}
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
                  </div>
                </motion.div>

                <div className="h-[2px] w-16 bg-rose-200 mt-6 mb-8" />

                {/* Core invitation block with dates */}
                <div className="bg-white/80 border border-rose-100 rounded-3xl p-6 md:p-8 max-w-2xl shadow-xl backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-linear-to-r from-sky-300 via-rose-300 to-amber-300" />
                  
                  <p className="text-sm md:text-base text-neutral-600 font-serif leading-relaxed mb-4">
                    Juan quiere regalarte una escapada inolvidable. Cinco días suspendidos en el tiempo, 
                    entre paisajes australes, vientos puros y el abrigo de caminar juntos. 
                    Las fechas ya están marcadas en las estrellas:
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-6">
                    <div className="flex items-center gap-2.5 px-4 py-3 bg-rose-50/50 rounded-2xl border border-rose-100 text-rose-800">
                      <Calendar className="w-5 h-5 shrink-0" />
                      <div className="text-left">
                        <span className="text-[10px] uppercase tracking-wider block font-sans text-rose-500 font-bold">FECHA RECOMENDADA</span>
                        <span className="text-sm font-semibold font-sans">Miércoles 08 al Domingo 12 de Julio, 2026</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 font-sans italic">
                    * El pasaje está listo, pero el destino espera tu mirada para nacer. ¿Preferirías la magia blanca de las cumbres alpinas y el hogar de Bariloche, o la imponente catedral de hielo eterno y silencio en El Calafate?
                  </p>
                </div>

                {/* Countdown Timer */}
                <CountdownTimer />
              </div>

              {/* Cards Grid: Side-by-Side selector */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 px-2">
                {DESTINATIONS.map((dest) => (
                  <PoeticDestinationCard
                    key={dest.id}
                    destination={dest}
                    isSelected={response.choice === dest.id}
                    onSelect={() => handleSelectDestination(dest.id)}
                    isHovered={hoveredCard === dest.id}
                    onHoverStart={() => {
                      setHoveredCard(dest.id);
                      triggerHeartbeat();
                    }}
                    onHoverEnd={() => setHoveredCard(null)}
                  />
                ))}
              </div>

              {/* Activities Showcase */}
              {response.choice && currentDestinationDetails && (
                <ActivitiesGallery
                  activities={currentDestinationDetails.activities}
                  destinationTitle={currentDestinationDetails.title}
                  themeColor={currentDestinationDetails.themeColor}
                />
              )}

              {/* Response Panel / Message composer and sealer */}
              <DreamVotingPanel
                selectedDestination={response.choice}
                dreams={response.dreams}
                onDreamsChange={handleDreamsChange}
                onConfirm={handleConfirm}
                destinationDetails={currentDestinationDetails}
                milagrosName={response.milagrosName}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Pure Elegant Footer */}
      <footer className="w-full text-center py-6 border-t border-neutral-100 mt-12 bg-white/10 z-10 relative">
        <p className="text-xs text-neutral-400 font-sans tracking-widest flex items-center justify-center gap-1">
          <span>Hecho con</span>
          <Heart className="w-3 h-3 text-rose-400 fill-rose-400 inline" />
          <span>para {response.milagrosName} & Juan · Patagonia 2026</span>
        </p>
      </footer>
    </div>
  );
}
