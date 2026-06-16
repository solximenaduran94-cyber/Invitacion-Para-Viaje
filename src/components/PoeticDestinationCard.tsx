/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { DestinationDetails } from '../types';
import { Snowflake, Flame, MapPin, Sparkles, Check, Compass } from 'lucide-react';

interface PoeticDestinationCardProps {
  key?: React.Key | string | null;
  destination: DestinationDetails;
  isSelected: boolean;
  onSelect: () => void;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export default function PoeticDestinationCard({
  destination,
  isSelected,
  onSelect,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: PoeticDestinationCardProps) {
  const isCalafate = destination.id === 'calafate';
  
  // Custom styled elements for each theme
  const getIcon = () => {
    if (isCalafate) {
      return <Snowflake className="w-5 h-5 text-sky-400 animate-pulse" />;
    } else {
      return <Flame className="w-5 h-5 text-orange-500 animate-pulse" />;
    }
  };

  const getBorderColor = () => {
    if (isSelected) {
      return isCalafate ? 'border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.35)]' : 'border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.35)]';
    }
    return 'border-neutral-200/60 hover:border-neutral-300';
  };

  const getBadgeColor = () => {
    return isCalafate 
      ? 'bg-sky-50 text-sky-700 border-sky-100' 
      : 'bg-amber-50 text-amber-800 border-amber-100';
  };

  const getHeadingColor = () => {
    return isCalafate ? 'text-sky-950' : 'text-amber-950';
  };

  return (
    <motion.div
      id={`card-${destination.id}`}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onSelect}
      className={`relative flex flex-col justify-between h-full bg-white/95 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 ${getBorderColor()}`}
    >
      {/* Active selection tag */}
      {isSelected && (
        <div className={`absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border shadow-sm
          ${isCalafate ? 'bg-sky-500 text-white border-sky-400' : 'bg-amber-600 text-white border-amber-504'}`}
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
          <span>ELEGIDO</span>
        </div>
      )}

      {/* Hero Image Section */}
      <div className="relative h-64 md:h-72 w-full overflow-hidden select-none">
        {/* Soft dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent z-10" />
        
        <img
          src={destination.imageSrc}
          alt={destination.title}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-1000 ease-out 
            ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {/* Destination Pin & Province */}
        <div className="absolute bottom-4 left-4 z-10 flex flex-col">
          <div className="flex items-center gap-1 text-white/90 text-[10px] md:text-xs font-sans tracking-widest uppercase mb-1 font-medium drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{destination.province}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-serif text-white font-semibold drop-shadow-lg tracking-tight">
            {destination.title}
          </h3>
        </div>
      </div>

      {/* Poetry Description */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        {/* Poetic Subtitle */}
        <span className={`text-xs font-medium tracking-[0.2em] uppercase font-sans mb-3 block ${isCalafate ? 'text-sky-600' : 'text-amber-700'}`}>
          {destination.poeticSubtitle}
        </span>
        
        <p className={`text-sm italic font-serif leading-relaxed mb-6 font-medium ${isCalafate ? 'text-sky-900/90' : 'text-amber-900/90'}`}>
          &ldquo;{destination.description}&rdquo;
        </p>

        {/* Highlight list */}
        <div className="space-y-4 mb-8 flex-grow">
          <div className="text-neutral-400 text-[10px] uppercase tracking-widest font-sans font-semibold mb-2">
            Sueños para compartir ahí:
          </div>
          {destination.highlights.map((hlt, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="shrink-0 mt-0.5">{getIcon()}</span>
              <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                {hlt}
              </p>
            </div>
          ))}
        </div>

        {/* Poetic Quote Box */}
        <div className={`p-4 rounded-xl border border-dashed my-2 text-center relative overflow-hidden backdrop-blur-xs
          ${isCalafate ? 'bg-sky-50/40 border-sky-200' : 'bg-amber-50/40 border-amber-200'}`}
        >
          <p className="text-xs italic font-serif text-neutral-700 leading-relaxed relative z-10">
            {destination.poeticQuote}
          </p>
        </div>
      </div>

      {/* Click feedback footer action */}
      <div className={`p-4 border-t border-neutral-100 flex items-center justify-between transition-colors duration-300
        ${isSelected 
          ? (isCalafate ? 'bg-sky-50/50' : 'bg-amber-50/50') 
          : 'bg-neutral-50/50'}`}
      >
        <span className="text-xs text-neutral-400 font-sans tracking-wide">
          {isSelected ? 'Tu elección romántica' : 'Haz clic para explorar este destino'}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-1 cursor-pointer
            ${isSelected
              ? (isCalafate ? 'bg-sky-600 text-white shadow-md' : 'bg-amber-700 text-white shadow-md')
              : 'bg-transparent text-neutral-600 hover:bg-neutral-200/55'}`}
        >
          {isSelected ? (
            <>
              <Check className="w-3 h-3 stroke-[2.5]" />
              <span>SELECCIONADO</span>
            </>
          ) : (
            <>
              <Compass className="w-3 h-3" />
              <span>SELECCIONAR</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
