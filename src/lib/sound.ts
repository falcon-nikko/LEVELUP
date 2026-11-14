'use client';

type SoundEffect = 'correct' | 'wrong' | 'complete' | 'click';

export function playFeedbackSound(effect: SoundEffect, enabled = true) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const tone = (freq: number, startOffset: number, duration: number, gainPeak = 0.07, type: OscillatorType = 'sine') => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now + startOffset);
      gain.gain.setValueAtTime(0.0001, now + startOffset);
      gain.gain.exponentialRampToValueAtTime(gainPeak, now + startOffset + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + startOffset + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + startOffset);
      osc.stop(now + startOffset + duration + 0.02);
    };

    if (effect === 'correct') {
      tone(587.33, 0, 0.11, 0.06, 'triangle'); // D5
      tone(880, 0.08, 0.16, 0.07, 'triangle'); // A5
    } else if (effect === 'wrong') {
      tone(240, 0, 0.14, 0.06, 'sawtooth');
      tone(190, 0.09, 0.18, 0.05, 'sawtooth');
    } else if (effect === 'complete') {
      tone(523.25, 0, 0.1, 0.06, 'triangle');
      tone(659.25, 0.09, 0.1, 0.06, 'triangle');
      tone(783.99, 0.18, 0.12, 0.07, 'triangle');
      tone(1046.5, 0.28, 0.25, 0.08, 'triangle');
    } else if (effect === 'click') {
      tone(660, 0, 0.04, 0.025, 'sine');
    }
  } catch {
    // Ignore audio context errors when autoplay policy blocks before gesture
  }
}
