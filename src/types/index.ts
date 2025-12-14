// Tipos globais do projeto Tabs

export interface Instrument {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  available: boolean;
}

export interface Note {
  note: string;
  frequency: number;
  octave: number;
}

// Tipos do Acordeão
export interface AccordionButton {
  id: string;
  row: number;
  position: number;
  openNote: string;
  closeNote: string;
  keyBinding: string;
  color: string;
}

export interface AccordionBass {
  id: string;
  note: string;
  type: 'bass' | 'chord';
  keyBinding: string;
}

// Alias para compatibilidade
export type BassButton = AccordionBass;

export interface AccordionConfig {
  id: string;
  name: string;
  description: string;
  type?: 'diatonic' | 'chromatic' | 'piano';
  rows?: number;
  buttons: AccordionButton[];
  bassButtons: AccordionBass[];
  tuning: string;
}

// Tipos do Violão/Guitarra (para futuro)
export interface GuitarString {
  id: number;
  note: string;
  octave: number;
  color: string;
}

export interface GuitarFret {
  fret: number;
  string: number;
  note: string;
  keyBinding?: string;
}

export interface GuitarConfig {
  id: string;
  name: string;
  strings: GuitarString[];
  frets: number;
  tuning: string;
}

// Tipos para Tablatura/Guitar Hero mode
export interface TabNote {
  id: string;
  time: number; // tempo em ms
  duration: number;
  button?: string; // para acordeão
  fret?: number; // para guitarra
  string?: number; // para guitarra
  isOpen?: boolean; // fole aberto/fechado para acordeão
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  instrument: 'accordion' | 'guitar' | 'both';
  tabs: TabNote[];
  audioUrl?: string;
}

// Estado do player
export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  score: number;
  combo: number;
  maxCombo: number;
  hitNotes: number;
  missedNotes: number;
  accuracy: number;
}

// Configurações do usuário
export interface UserSettings {
  volume: number;
  noteSpeed: number;
  showKeyBindings: boolean;
  theme: 'dark' | 'light';
  instrument: string;
}
