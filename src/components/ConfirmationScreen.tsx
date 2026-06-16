/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DestinationDetails } from '../types';
import { Share2, MessageCircle, Copy, Check, Calendar, MapPin, Heart, Sparkles, Navigation } from 'lucide-react';

interface ConfirmationScreenProps {
  selectedDestination: 'calafate' | 'bariloche';
  dreams: string;
  destinationDetails: DestinationDetails;
  onReset: () => void;
  milagrosName: string;
}

export default function ConfirmationScreen({
  selectedDestination,
  dreams,
  destinationDetails,
  onReset,
  milagrosName,
}: ConfirmationScreenProps) {
  const [copied, setCopied] = useState(false);

  // Poetic formulated message for WhatsApp
  const makeMessageText = () => {
    const destinationEmoji = selectedDestination === 'calafate' ? '❄️🏔️' : '🌲🍫';
    const destinationTitle = destinationDetails.title.toUpperCase();
    
    let text = `¡Hola Juan! ❤️ He recibido tu hermosa invitación y acepto con todo mi corazón. 

He elegido que hagamos nuestra escapada a *${destinationTitle}* ${destinationEmoji} del miércoles 8 al domingo 12 de Julio de 2026.

✨ *Mis sueños para este viaje son:* 
"${dreams || 'Caminar de la mano contemplando los paisajes, vivir aventuras inolvidables y escribir un nuevo capítulo juntos.'}"

¡Qué emoción inmensa empezar a planear y soñar con este viaje! Te amo muchísimo, nos vemos muy pronto en el sur. 🎒✈️`;

    return encodeURIComponent(text);
  };

  const shareOnWhatsApp = () => {
    const text = makeMessageText();
    const url = `https://api.whatsapp.com/send?phone=5493512069516&text=${text}`;
    window.open(url, '_blank');
  };

  const copyToClipboard = () => {
    const destinationEmoji = selectedDestination === 'calafate' ? '❄️🏔️' : '🌲🍫';
    const destinationTitle = destinationDetails.title.toUpperCase();
    
    const plainText = `¡Hola Juan! ❤️ He recibido tu hermosa invitación y acepto con todo mi corazón. 

He elegido que hagamos nuestra escapada a *${destinationTitle}* ${destinationEmoji} del miércoles 8 al domingo 12 de Julio de 2026.

✨ *Mis sueños para este viaje son:* 
"${dreams || 'Caminar de la mano contemplando los paisajes, vivir aventuras inolvidables y escribir un nuevo capítulo juntos.'}"

¡Qué emoción inmensa empezar a planear y soñar con este viaje! Te amo muchísimo, nos vemos muy pronto en el sur. 🎒✈️`;

    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const isCalafate = selectedDestination === 'calafate';

  return (
    <motion.div
      id="confirmation-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl mx-auto px-4 py-8 z-10 relative flex flex-col items-center"
    >
      {/* Sparkly Floating Icons */}
      <div className="absolute -top-6 animate-bounce">
        <Heart className="w-12 h-12 text-rose-500 fill-rose-500 shadow-md" />
      </div>

      <div className="text-center mb-8 mt-6">
        <h2 className="text-4xl md:text-5xl font-serif text-neutral-800 tracking-tight font-bold mb-2">
          ¡Viaje Sellado con Amor!
        </h2>
        <p className="text-sm text-neutral-500 font-sans max-w-md mx-auto leading-relaxed">
          Has completado tu carta de respuesta. Aquí tienes tu boleto romántico y los accesos para enviarle tu elección a Juan.
        </p>
      </div>

      {/* Boarding Pass Container */}
      <div className="w-full bg-linear-to-b from-neutral-500/10 to-transparent p-0.5 rounded-3xl mb-8">
        <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden relative">
          
          {/* Aesthetic Side Ribbon or Left Section for Destination Banner */}
          <div className="lg:w-1/3 relative h-48 lg:h-auto min-h-[220px] bg-neutral-900 overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            <img
              src={destinationDetails.imageSrc}
              alt={destinationDetails.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-85"
            />
            
            {/* Stamp on Boarding Pass */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Sparkles className="w-3 h-3 text-amber-200" />
              <span className="text-[9px] text-white tracking-widest uppercase font-sans font-medium">Boleto de Ensueño</span>
            </div>

            <div className="absolute bottom-6 left-6 z-10 flex flex-col">
              <p className="text-[10px] uppercase font-sans tracking-widest text-neutral-300">Rumbo a</p>
              <h3 className="text-2xl md:text-3xl font-serif text-white font-bold tracking-tight">
                {destinationDetails.title}
              </h3>
              <p className="text-xs text-neutral-200 italic font-sans">{destinationDetails.province}</p>
            </div>
          </div>

          {/* Main Boarding Pass Body (Center) */}
          <div className="flex-grow p-6 md:p-8 flex flex-col justify-between relative">
            {/* Perforation Separation Lines for Ticket Visual */}
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-4 h-full pointer-events-none">
              <div className="absolute left-[-8px] top-6 w-4 h-4 bg-neutral-100 rounded-full border border-neutral-200/50" />
              <div className="absolute left-[-8px] bottom-6 w-4 h-4 bg-neutral-100 rounded-full border border-neutral-200/50" />
              <div className="h-full border-r-2 border-dotted border-neutral-200 w-1 ml-1" />
            </div>

            {/* Ticket Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-100 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-sans font-semibold text-neutral-400 tracking-widest block">PASE DE ABORDAR</span>
                <h4 className="text-lg md:text-xl font-serif font-bold text-neutral-800 flex items-center gap-1.5">
                  La Ruta del Amor y el Asombro 
                </h4>
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border 
                ${isCalafate ? 'bg-sky-50 text-sky-700 border-sky-100' : 'bg-amber-50 text-amber-800 border-amber-100'}`}
              >
                CÓDIGO: JM-JUL-2026
              </div>
            </div>

            {/* Flight info grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 my-2 text-left">
              <div>
                <span className="text-[9px] font-sans text-neutral-400 tracking-wider uppercase block">Pasajera Especial</span>
                <span className="text-sm font-semibold font-sans text-neutral-800">{milagrosName.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-[9px] font-sans text-neutral-400 tracking-wider uppercase block">Anfitrión</span>
                <span className="text-sm font-semibold font-sans text-neutral-800 font-medium">JUAN</span>
              </div>
              <div>
                <span className="text-[9px] font-sans text-neutral-400 tracking-wider uppercase block">Fecha de Salida</span>
                <span className="text-sm font-semibold font-sans text-neutral-800 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>Miércoles 08 Jul</span>
                </span>
              </div>
              <div>
                <span className="text-[9px] font-sans text-neutral-400 tracking-wider uppercase block">Fecha de Regreso</span>
                <span className="text-sm font-semibold font-sans text-neutral-800 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>Domingo 12 Jul</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 my-2 pt-2 border-t border-neutral-50 text-left">
              <div>
                <span className="text-[9px] font-sans text-neutral-400 tracking-wider uppercase block">Puerta</span>
                <span className="text-sm font-semibold font-sans text-neutral-800">PUERTA DEL CORAZÓN</span>
              </div>
              <div>
                <span className="text-[9px] font-sans text-neutral-400 tracking-wider uppercase block">Asientos</span>
                <span className="text-sm font-semibold font-sans text-neutral-800">01A & 01B (Juntos)</span>
              </div>
              <div>
                <span className="text-[9px] font-sans text-neutral-400 tracking-wider uppercase block">Estadía</span>
                <span className="text-sm font-semibold font-sans text-neutral-800">4 Noches Mágicas</span>
              </div>
              <div>
                <span className="text-[9px] font-sans text-neutral-400 tracking-wider uppercase block">Estado</span>
                <span className="text-sm font-semibold font-sans text-emerald-600 flex items-center gap-1 tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block shrink-0" />
                  <span>CONFIRMADO</span>
                </span>
              </div>
            </div>

            {/* Dreams quotes card */}
            <div className="mt-4 p-4 rounded-xl bg-neutral-50 border border-neutral-100 text-left relative">
              <span className="text-[9px] font-sans text-neutral-400 tracking-widest uppercase block mb-1">Tus Sueños Seleccionados</span>
              <p className="text-xs text-neutral-600 font-sans italic leading-relaxed">
                &ldquo;{dreams || 'Hacer nuestra escapada romántica del miércoles 8 al domingo 12 de Julio, abrigarnos juntos frente al imponente paisaje patagónico y escribir los más bellos sueños viajeros.'}&rdquo;
              </p>
            </div>

            {/* Visual Barcode section */}
            <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-3 border-t border-neutral-100 pt-4">
              <div className="flex flex-col">
                <span className="text-[9px] font-sans text-neutral-400 tracking-wider uppercase">Requisitos obligatorios</span>
                <span className="text-xs font-serif italic text-neutral-500 leading-relaxed">Ganas de amar, abrigos calientes, y corazones prestos al asombro patagónico.</span>
              </div>
              
              {/* Monospace style Barcode */}
              <div className="flex flex-col items-center">
                <div className="h-8 flex gap-0.5 items-end opacity-75">
                  <div className="w-1.5 h-full bg-neutral-900" />
                  <div className="w-0.5 h-full bg-neutral-900" />
                  <div className="w-1 h-full bg-neutral-900" />
                  <div className="w-0.5 h-full bg-neutral-900" />
                  <div className="w-2 h-full bg-neutral-900" />
                  <div className="w-0.5 h-full bg-neutral-900" />
                  <div className="w-1 h-full bg-neutral-900" />
                  <div className="w-1.5 h-full bg-neutral-900" />
                  <div className="w-0.5 h-full bg-neutral-900" />
                  <div className="w-1 h-full bg-neutral-900" />
                  <div className="w-2 h-full bg-neutral-900" />
                  <div className="w-0.5 h-full bg-neutral-900" />
                </div>
                <span className="text-[8px] font-mono text-neutral-400 mt-1 select-none">{milagrosName.toUpperCase()}♥JUAN·07/2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action triggers */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-neutral-100 p-6 flex flex-col items-center gap-4 text-center">
        <h5 className="text-sm font-semibold text-neutral-800 uppercase tracking-widest font-sans">
          ¿Cómo deseas responderle a Juan?
        </h5>
        
        <p className="text-xs text-neutral-500 leading-relaxed font-sans max-w-sm mb-2">
          Presiona el botón verde de WhatsApp para iniciar un chat privado directo con tu carta de respuesta pre-escrita, o cópiala al portapapeles.
        </p>

        {/* WhatsApp Button */}
        <button
          type="button"
          id="send-whatsapp-btn"
          onClick={shareOnWhatsApp}
          className="w-full py-4.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-100 shadow-lg text-white font-semibold font-sans tracking-wider uppercase text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span>Enviar por WhatsApp a Juan</span>
        </button>

        {/* Secondary Clipboard Copy Button */}
        <div className="flex gap-2 w-full">
          <button
            type="button"
            id="copy-text-btn"
            onClick={copyToClipboard}
            className={`flex-1 py-3 px-4 rounded-xl border font-semibold font-sans tracking-wider uppercase text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer
              ${copied 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'}`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>¡Mensaje Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Mensaje</span>
              </>
            )}
          </button>

          <button
            type="button"
            id="change-choice-btn"
            onClick={onReset}
            className="py-3 px-4 rounded-xl border border-rose-200 text-neutral-600 hover:bg-rose-50 hover:text-rose-900 font-semibold font-sans tracking-wider uppercase text-xs transition-all cursor-pointer"
          >
            Cambiar Elección
          </button>
        </div>

        {/* Formatted message preview expander */}
        <div className="w-full mt-2 pt-4 border-t border-neutral-100 text-left">
          <span className="text-[10px] uppercase font-sans tracking-wider text-neutral-400 font-bold block mb-1">
            Mensaje que se enviará:
          </span>
          <pre className="text-xs bg-neutral-50 text-neutral-600 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap font-sans text-[11px] leading-relaxed border border-neutral-100 select-all">
            {decodeURIComponent(makeMessageText())}
          </pre>
        </div>
      </div>
    </motion.div>
  );
}
