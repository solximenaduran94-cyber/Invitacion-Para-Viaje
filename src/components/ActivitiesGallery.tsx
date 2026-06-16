/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Activity } from '../types';
import { Sparkles, Compass, MapPin } from 'lucide-react';

interface ActivitiesGalleryProps {
  activities: Activity[] | undefined;
  destinationTitle: string;
  themeColor: string;
}

export default function ActivitiesGallery({ activities, destinationTitle, themeColor }: ActivitiesGalleryProps) {
  if (!activities || activities.length === 0) return null;

  const isCalafate = destinationTitle.toLowerCase().includes('calafate');

  return (
    <motion.div
      id="activities-gallery"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mt-16 mb-6 w-full max-w-6xl mx-auto"
    >
      <div className="text-center mb-8">
        <span className={`text-xs font-semibold tracking-[0.25em] uppercase font-sans px-3 py-1 rounded-full border
          ${isCalafate 
            ? 'bg-sky-50 text-sky-700 border-sky-200' 
            : 'bg-amber-50 text-amber-700 border-amber-200'}`}
        >
          Experiencias Diseñadas con Amor
        </span>
        <h3 className="text-2xl md:text-4xl font-serif font-bold text-neutral-800 mt-3 tracking-tight">
          Paseos mágicos que Juan planeó en {destinationTitle}
        </h3>
        <p className="text-xs md:text-sm text-neutral-500 font-sans mt-2 max-w-xl mx-auto leading-relaxed">
          Haz clic en el destino para ver los detalles. Aquí puedes ver la belleza de las actividades que podrán compartir del 8 al 12 de Julio:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-2">
        {activities.map((activity, idx) => (
          <motion.div
            key={idx}
            id={`activity-card-${idx}`}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Activity Thumbnail with Overlay */}
            <div className="relative h-56 w-full overflow-hidden select-none">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
              
              <img
                src={activity.imageSrc}
                alt={activity.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              <div className="absolute bottom-3 left-4 z-10">
                <span className={`text-[9px] font-sans font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm text-white backdrop-blur-md bg-white/20 border border-white/10`}>
                  N° {idx + 1} EXPERIENCIA
                </span>
              </div>
            </div>

            {/* Copy Content */}
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <span className={`text-[10px] font-sans font-bold tracking-wider uppercase block mb-1
                  ${isCalafate ? 'text-sky-600' : 'text-amber-700'}`}
                >
                  {activity.subtitle}
                </span>
                
                <h4 className="text-lg font-serif font-semibold text-neutral-800 mb-2 tracking-tight">
                  {activity.title}
                </h4>
                
                <p className="text-xs text-neutral-500 leading-relaxed font-sans mb-4">
                  {activity.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-50 flex items-center gap-1.5 text-[10px] uppercase font-sans font-semibold tracking-wider text-neutral-400">
                <Compass className="w-3.5 h-3.5" />
                <span>Rumbo al asombro</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
