'use client';

import { useCallback, useRef, useEffect, useState } from 'react';

// Mapeamento de notas para frequências
const noteFrequencies: Record<string, number> = {
  'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47,
  'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'Bb3': 233.08, 'B3': 246.94,
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'Bb5': 932.33, 'B5': 987.77,
  'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51, 'F6': 1396.91, 'G6': 1567.98, 'A6': 1760.00, 'B6': 1975.53,
  'C7': 2093.00, 'D7': 2349.32, 'E7': 2637.02, 'F7': 2793.83, 'G7': 3135.96,
};

// Frequências para acordes
const chordFrequencies: Record<string, number[]> = {
  'Gmaj': [196.00, 246.94, 293.66], // G, B, D
  'Cmaj': [261.63, 329.63, 392.00], // C, E, G
  'Fmaj': [174.61, 220.00, 261.63], // F, A, C
  'D7': [293.66, 369.99, 440.00, 261.63], // D, F#, A, C
  'Am': [220.00, 261.63, 329.63], // A, C, E
};

// Configurações de timbre por tipo
type TimbreType = 'accordion' | 'musette' | 'bandoneon' | 'organ' | 'harmonica';

interface TimbreConfig {
  waveType: OscillatorType;
  harmonics: number[];
  filterFreq: number;
  filterQ: number;
  attack: number;
  decay: number;
  sustain: number;
  detune: number;
}

const timbreConfigs: Record<TimbreType, TimbreConfig> = {
  accordion: {
    waveType: 'sawtooth',
    harmonics: [1, 0.5, 0.25],
    filterFreq: 2500,
    filterQ: 1,
    attack: 0.03,
    decay: 0.1,
    sustain: 0.25,
    detune: 3,
  },
  musette: {
    waveType: 'sawtooth',
    harmonics: [1, 0.6, 0.3, 0.15],
    filterFreq: 3000,
    filterQ: 0.8,
    attack: 0.02,
    decay: 0.08,
    sustain: 0.3,
    detune: 8, // Mais detune para efeito musette
  },
  bandoneon: {
    waveType: 'triangle',
    harmonics: [1, 0.4, 0.2],
    filterFreq: 2000,
    filterQ: 1.5,
    attack: 0.04,
    decay: 0.12,
    sustain: 0.2,
    detune: 2,
  },
  organ: {
    waveType: 'sine',
    harmonics: [1, 0.8, 0.6, 0.4, 0.2],
    filterFreq: 4000,
    filterQ: 0.5,
    attack: 0.01,
    decay: 0.05,
    sustain: 0.4,
    detune: 0,
  },
  harmonica: {
    waveType: 'square',
    harmonics: [1, 0.3],
    filterFreq: 1800,
    filterQ: 2,
    attack: 0.02,
    decay: 0.06,
    sustain: 0.35,
    detune: 5,
  },
};

interface ActiveOscillator {
  oscillators: OscillatorNode[];
  gainNode: GainNode;
}

export function useAudioEngine() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeOscillators = useRef<Map<string, ActiveOscillator>>(new Map());
  const masterGainRef = useRef<GainNode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [volume, setVolumeState] = useState(50);
  const [timbre, setTimbreState] = useState<TimbreType>('accordion');

  // Inicializa o contexto de áudio
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      masterGainRef.current = audioContextRef.current.createGain();
      masterGainRef.current.connect(audioContextRef.current.destination);
      masterGainRef.current.gain.value = volume / 100;
      setIsInitialized(true);
    }
    
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    return audioContextRef.current;
  }, [volume]);

  // Atualiza o volume master
  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = newVolume / 100;
    }
  }, []);

  // Atualiza o timbre
  const setTimbre = useCallback((newTimbre: string) => {
    setTimbreState(newTimbre as TimbreType);
  }, []);

  // Cria o som baseado no timbre selecionado
  const createSound = useCallback((frequency: number, ctx: AudioContext): ActiveOscillator => {
    const config = timbreConfigs[timbre];
    const gainNode = ctx.createGain();
    const oscillators: OscillatorNode[] = [];
    
    // Filtro passa-baixa
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = config.filterFreq;
    filter.Q.value = config.filterQ;
    
    // Criar osciladores com harmônicos
    config.harmonics.forEach((amplitude, index) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = config.waveType;
      osc.frequency.value = frequency * (index + 1); // Harmônicos
      
      // Detune para efeito de coro/tremolo
      if (index === 0 && config.detune > 0) {
        osc.detune.value = config.detune;
        
        // Adicionar segundo oscilador com detune negativo para efeito musette
        const osc2 = ctx.createOscillator();
        const osc2Gain = ctx.createGain();
        osc2.type = config.waveType;
        osc2.frequency.value = frequency;
        osc2.detune.value = -config.detune;
        osc2Gain.gain.value = amplitude * 0.8;
        osc2.connect(osc2Gain);
        osc2Gain.connect(filter);
        osc2.start(ctx.currentTime);
        oscillators.push(osc2);
      }
      
      oscGain.gain.value = amplitude;
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start(ctx.currentTime);
      oscillators.push(osc);
    });
    
    filter.connect(gainNode);
    gainNode.connect(masterGainRef.current!);
    
    // Envelope ADSR
    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.4, now + config.attack);
    gainNode.gain.linearRampToValueAtTime(config.sustain, now + config.attack + config.decay);
    
    return { oscillators, gainNode };
  }, [timbre]);

  // Toca uma nota
  const playNote = useCallback((noteId: string, note: string) => {
    const ctx = initAudio();
    if (!ctx || !masterGainRef.current) return;

    // Para a nota anterior se existir
    stopNote(noteId);

    const frequencies = chordFrequencies[note] || [noteFrequencies[note]];
    
    if (!frequencies || frequencies.some(f => !f)) {
      console.warn(`Nota não encontrada: ${note}`);
      return;
    }

    // Criar osciladores para cada frequência do acorde
    const allOscillators: OscillatorNode[] = [];
    const gainNode = ctx.createGain();
    gainNode.connect(masterGainRef.current);
    
    frequencies.forEach((freq) => {
      if (freq) {
        const sound = createSound(freq, ctx);
        allOscillators.push(...sound.oscillators);
      }
    });

    activeOscillators.current.set(noteId, { oscillators: allOscillators, gainNode });
  }, [initAudio, createSound]);

  // Para uma nota
  const stopNote = useCallback((noteId: string) => {
    const active = activeOscillators.current.get(noteId);
    
    if (active && audioContextRef.current) {
      const now = audioContextRef.current.currentTime;
      
      active.oscillators.forEach((osc) => {
        try {
          osc.stop(now + 0.15);
        } catch {
          // Oscilador já parado
        }
      });
      
      activeOscillators.current.delete(noteId);
    }
  }, []);

  // Para todas as notas
  const stopAllNotes = useCallback(() => {
    activeOscillators.current.forEach((_, noteId) => {
      stopNote(noteId);
    });
  }, [stopNote]);

  // Cleanup
  useEffect(() => {
    return () => {
      stopAllNotes();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopAllNotes]);

  return {
    playNote,
    stopNote,
    stopAllNotes,
    initAudio,
    isInitialized,
    volume,
    setVolume,
    timbre,
    setTimbre,
  };
}
