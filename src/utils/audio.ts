/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Simple client-side synthesizer using standard Web Audio API to play delightful cozy sounds.
// Everything is lazily initialized and handles context resume rules safely.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Sweeping romantic chime for reveals and seals
 */
export function playChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const destination = ctx.destination;

  // Magical sparkling metallic arpeggio notes
  const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51]; // C5, E5, G5, B5, C6, E6
  
  notes.forEach((freq, index) => {
    const time = now + index * 0.08;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.05, time + 0.3);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.08, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(time);
    osc.stop(time + 0.55);
  });
}

/**
 * Gentle romantic double heartbeat thump-thump
 */
export function playHeartbeat() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const destination = ctx.destination;

  const playThump = (time: number, freq: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + 0.15);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.3, time + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(time);
    osc.stop(time + 0.2);
  };

  playThump(now, 75);
  playThump(now + 0.22, 70); // Second beat slightly lower and later
}

/**
 * Soft rustling sound representing unfolding a parchment letter
 */
export function playParchment() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bufferSize = ctx.sampleRate * 0.4; // 0.4 seconds of rustle
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Fill raw brown/white noise combo for paper texture
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // Brown noise low-pass filter formula
    data[i] = (lastOut + (0.02 * white)) / 1.02;
    lastOut = data[i];
    data[i] *= 4.5; // Gain staging
  }

  const noiseNode = ctx.createBufferSource();
  noiseNode.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(400, now);
  filter.frequency.exponentialRampToValueAtTime(180, now + 0.4);
  filter.Q.setValueAtTime(1.5, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  noiseNode.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noiseNode.start(now);
  noiseNode.stop(now + 0.4);
}

// @ts-ignore
import rawSongUrl from '../assets/te_regalo.mp3';

let audioElement: HTMLAudioElement | null = null;

/**
 * Start playing the background romantic song (J Abecia, Rels B - Te Regalo Acústico)
 */
export function startBackgroundSong() {
  if (typeof window === 'undefined') return;

  if (!audioElement) {
    audioElement = new Audio(rawSongUrl);
    audioElement.loop = true;
    audioElement.volume = 0.28; // Perfect warm background romantic volume
  }

  // Ensure client Web Audio Context is active for interactive sound impacts
  getAudioContext();

  audioElement.play().catch((err) => {
    console.warn("Audio presentation waiting for user click action to start:", err);
  });
}

/**
 * Stop playing the background romantic song
 */
export function stopBackgroundSong() {
  if (audioElement) {
    audioElement.pause();
  }
}
