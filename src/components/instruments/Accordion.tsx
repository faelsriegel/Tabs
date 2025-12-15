'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { AccordionConfig, AccordionButton } from '@/types';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Volume2, VolumeX, Music, Waves } from 'lucide-react';

// Tipos de timbre disponíveis
const timbres = [
  { id: 'accordion', name: 'Acordeão Clássico' },
  { id: 'musette', name: 'Musette Francês' },
  { id: 'bandoneón', name: 'Bandoneón Tango' },
  { id: 'organ', name: 'Órgão' },
  { id: 'harmonica', name: 'Gaita/Harmônica' },
];

// Mapeamento de notas PT-BR para EN
const noteMap: Record<string, string> = {
  'Dó': 'C', 'Ré': 'D', 'Mi': 'E', 'Fá': 'F', 'Sol': 'G', 'Lá': 'A', 'Si': 'B',
  'Dó#': 'C#', 'Ré#': 'D#', 'Fá#': 'F#', 'Sol#': 'G#', 'Lá#': 'A#',
  'Réb': 'Db', 'Mib': 'Eb', 'Solb': 'Gb', 'Láb': 'Ab', 'Sib': 'Bb',
};

function convertNote(note: string): string {
  // Extract octave number if present
  const match = note.match(/^(.+?)(\d+)?$/);
  if (!match) return note;
  
  const [, noteName, octave] = match;
  const enNote = noteMap[noteName] || noteName;
  
  return octave ? `${enNote}${octave}` : enNote;
}

interface AccordionProps {
  config: AccordionConfig;
}

export default function Accordion({ config }: AccordionProps) {
  const [bellowsDirection, setBellowsDirection] = useState<'open' | 'close'>('open');
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [isMuted, setIsMuted] = useState(false);
  const [selectedTimbre, setSelectedTimbre] = useState('accordion');
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { playNote, stopNote, setVolume, volume, setTimbre } = useAudioEngine();

  // Atualizar timbre quando mudar
  useEffect(() => {
    if (setTimbre) {
      setTimbre(selectedTimbre);
    }
  }, [selectedTimbre, setTimbre]);

  // Get note based on bellows direction
  const getNoteForButton = useCallback((openNote: string, closeNote: string) => {
    return bellowsDirection === 'open' ? openNote : closeNote;
  }, [bellowsDirection]);

  // Handle key presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      
      const key = e.key.toLowerCase();
      
      // Space bar toggles bellows
      if (key === ' ') {
        e.preventDefault();
        setBellowsDirection(prev => prev === 'open' ? 'close' : 'open');
        return;
      }

      // Find matching button in melody buttons
      for (const button of config.buttons) {
        if (button.keyBinding.toLowerCase() === key) {
          const note = getNoteForButton(button.openNote, button.closeNote);
          setActiveKeys(prev => new Set([...prev, button.id]));
          playNote(button.id, convertNote(note));
          return;
        }
      }

      // Find matching button in bass buttons
      for (const bassButton of config.bassButtons) {
        if (bassButton.keyBinding.toLowerCase() === key) {
          setActiveKeys(prev => new Set([...prev, bassButton.id]));
          playNote(bassButton.id, convertNote(bassButton.note));
          return;
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // Find matching button in melody buttons
      for (const button of config.buttons) {
        if (button.keyBinding.toLowerCase() === key) {
          setActiveKeys(prev => {
            const newSet = new Set(prev);
            newSet.delete(button.id);
            return newSet;
          });
          stopNote(button.id);
          return;
        }
      }

      // Find matching button in bass buttons
      for (const bassButton of config.bassButtons) {
        if (bassButton.keyBinding.toLowerCase() === key) {
          setActiveKeys(prev => {
            const newSet = new Set(prev);
            newSet.delete(bassButton.id);
            return newSet;
          });
          stopNote(bassButton.id);
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [config, getNoteForButton, playNote, stopNote]);

  // Group buttons by row
  const buttonsByRow = config.buttons.reduce((acc, button) => {
    if (!acc[button.row]) acc[button.row] = [];
    acc[button.row].push(button);
    return acc;
  }, {} as Record<number, typeof config.buttons>);

  // Get number of rows
  const isPianoStyle = config.id === 'piano';
  const isBandoneon = config.id === 'bandoneon';
  const isDiatonic = config.id === 'diatonico';
  const diatonicOverlayButtons = isDiatonic
    ? config.buttons.map((button) => {
        const columnGroup = Math.floor((button.position - 1) / 5);
        const columnIndex = (button.position - 1) % 5;
        const topOffset = 10 + (button.row - 1) * 23 + columnGroup * 3;
        const leftBase = columnGroup === 0 ? 6 : 56;
        const leftValue = leftBase + columnIndex * 6.5;

        return {
          id: button.id,
          button,
          top: `${Math.min(topOffset, 92)}%`,
          left: `${Math.min(leftValue, 94)}%`,
          width: '6.1%',
          height: '6.1%',
        };
      })
    : [];

  const handleOverlayPress = (button: AccordionButton) => {
    setActiveKeys((prev) => {
      const next = new Set(prev);
      next.add(button.id);
      return next;
    });

    const note = getNoteForButton(button.openNote, button.closeNote);
    playNote(button.id, convertNote(note));
  };

  const handleOverlayRelease = (button: AccordionButton) => {
    setActiveKeys((prev) => {
      const next = new Set(prev);
      next.delete(button.id);
      return next;
    });

    stopNote(button.id);
  };

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-6 w-full max-w-6xl mx-auto p-2 sm:p-4" ref={containerRef}>
      {/* Header with info */}
      <div className="flex flex-col items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
        <Badge variant="outline" className="text-xs sm:text-base px-3 sm:px-4 py-0.5 sm:py-1 border-amber-500/30 dark:border-amber-500/30 light:border-amber-600/40 bg-amber-500/5 dark:bg-amber-500/5 light:bg-amber-500/10 text-amber-400 dark:text-amber-400 light:text-amber-700">
          {config.tuning}
        </Badge>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {/* Mobile: Botão de fole */}
          <button
            onClick={() => setBellowsDirection(prev => prev === 'open' ? 'close' : 'open')}
            className="sm:hidden px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium shadow-lg active:scale-95 transition-transform"
          >
            Fole: {bellowsDirection === 'open' ? '⬅️ Abrir' : '➡️ Fechar'}
          </button>
          {/* Desktop: Instrução de teclado */}
          <p className="hidden sm:block text-xs sm:text-sm text-muted-foreground text-center max-w-md">
            Pressione <kbd className="px-1.5 sm:px-2 py-0.5 bg-amber-500/10 dark:bg-amber-500/10 light:bg-amber-500/15 border border-amber-500/20 dark:border-amber-500/20 light:border-amber-600/40 rounded text-[10px] sm:text-xs font-mono text-amber-300 dark:text-amber-300 light:text-amber-700">Espaço</kbd> para alternar o fole
          </p>
        </div>
      </div>

      {/* Controls: Volume + Timbre - Responsivo */}
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 w-full">
        {/* Volume Control */}
        <div className="flex items-center gap-2 sm:gap-3 bg-amber-500/5 dark:bg-amber-500/5 light:bg-amber-500/10 backdrop-blur-sm px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full border border-amber-500/20 dark:border-amber-500/20 light:border-amber-600/30 shadow-sm">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="text-amber-400/70 dark:text-amber-400/70 light:text-amber-600 hover:text-amber-400 dark:hover:text-amber-400 light:hover:text-amber-700 transition-colors"
          >
            {isMuted ? <VolumeX size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Volume2 size={16} className="sm:w-[18px] sm:h-[18px]" />}
          </button>
          <Slider
            value={[volume]}
            onValueChange={(value) => setVolume(value[0])}
            max={100}
            step={1}
            className="w-16 sm:w-24"
          />
          <span className="text-[10px] sm:text-xs text-amber-400/70 dark:text-amber-400/70 light:text-amber-600 w-6 sm:w-8">{volume}%</span>
        </div>

        {/* Timbre Selector */}
        <div className="flex items-center gap-2 bg-amber-500/5 dark:bg-amber-500/5 light:bg-amber-500/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-amber-500/20 dark:border-amber-500/20 light:border-amber-600/30 shadow-sm">
          <Waves size={14} className="sm:w-[18px] sm:h-[18px] text-amber-400/70 dark:text-amber-400/70 light:text-amber-600" />
          <Select value={selectedTimbre} onValueChange={setSelectedTimbre}>
            <SelectTrigger className="w-[110px] sm:w-[160px] border-0 bg-transparent h-6 sm:h-8 text-xs sm:text-sm">
              <SelectValue placeholder="Timbre" />
            </SelectTrigger>
            <SelectContent>
              {timbres.map((timbre) => (
                <SelectItem key={timbre.id} value={timbre.id}>
                  <span className="text-xs sm:text-sm">{timbre.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Accordion Body - Layout responsivo */}
      <div className="relative flex flex-col sm:flex-row items-center sm:items-stretch justify-center gap-1 sm:gap-2 w-full overflow-x-auto px-2 sm:px-0">
        {/* Container que pode scroll horizontal em mobile */}
        <div className="flex items-stretch justify-center gap-1 sm:gap-2 min-w-fit scale-75 sm:scale-100 origin-center">
          {/* Left Side - Bass Buttons */}
          <div 
            className={`
              relative flex flex-col justify-center items-center gap-1.5 sm:gap-2 p-2 sm:p-6
              border-2 shadow-2xl
              ${isBandoneon ? 'rounded-xl sm:rounded-2xl border-stone-600' : 'rounded-l-2xl sm:rounded-l-3xl rounded-r-md sm:rounded-r-lg border-amber-900/60'}
            `}
            style={{
              minWidth: '70px',
              background: `
                linear-gradient(135deg, 
                  #8B4513 0%, 
                  #654321 25%, 
                  #4a3728 50%, 
                  #3d2817 75%, 
                  #2d1f17 100%
                )
              `,
              boxShadow: `
                inset 0 2px 4px rgba(255,220,180,0.15), 
                inset 0 -2px 4px rgba(0,0,0,0.3),
                0 10px 40px rgba(0,0,0,0.5),
                0 0 0 1px rgba(139,69,19,0.3)
              `,
            }}
          >
            {/* Textura de madeira simulada */}
            <div 
              className="absolute inset-0 opacity-20 rounded-inherit pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  rgba(0,0,0,0.1) 1px,
                  transparent 2px,
                  transparent 20px
                )`,
              }}
            />
            
            {/* Decorative metal corners - hidden on mobile */}
            <div className="hidden sm:block absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-amber-400/40 rounded-tl-xl" />
            <div className="hidden sm:block absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-amber-400/40 rounded-bl-xl" />
            <div className="hidden sm:block absolute top-1/2 left-3 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-amber-400/20 via-amber-300/40 to-amber-400/20 rounded-full" />
            
            {/* Bass Buttons */}
            <div className="flex flex-col gap-2.5 sm:gap-5 relative z-10">
              {config.bassButtons.map((button) => (
                <motion.button
                  key={button.id}
                  className={`
                    relative w-12 h-12 sm:w-[72px] sm:h-[72px] rounded-full
                    flex items-center justify-center
                    font-bold text-xs sm:text-base
                    transition-all duration-75
                    touch-manipulation
                  `}
                  style={{
                    background: button.type === 'bass' 
                      ? 'linear-gradient(145deg, #1a1a1a, #050505)'
                      : 'linear-gradient(145deg, #e0d4c0, #baa888)',
                    border: button.type === 'bass' ? '3px solid #2a2a2a' : '3px solid #8a7560',
                    boxShadow: activeKeys.has(button.id)
                      ? 'inset 0 4px 12px rgba(0,0,0,0.95), 0 0 30px rgba(255,200,100,0.7)'
                      : '0 6px 12px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.2)',
                    transform: activeKeys.has(button.id) ? 'scale(0.95)' : 'scale(1)',
                  }}
                  animate={{
                    scale: activeKeys.has(button.id) ? 0.92 : 1,
                  }}
                  whileHover={{ scale: 1.05 }}
                  onMouseDown={() => {
                    setActiveKeys(prev => new Set([...prev, button.id]));
                    playNote(button.id, convertNote(button.note));
                  }}
                  onMouseUp={() => {
                    setActiveKeys(prev => {
                      const newSet = new Set(prev);
                      newSet.delete(button.id);
                      return newSet;
                    });
                    stopNote(button.id);
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    setActiveKeys(prev => new Set([...prev, button.id]));
                    playNote(button.id, convertNote(button.note));
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    setActiveKeys(prev => {
                      const newSet = new Set(prev);
                      newSet.delete(button.id);
                      return newSet;
                    });
                    stopNote(button.id);
                  }}
                  onMouseLeave={() => {
                    if (activeKeys.has(button.id)) {
                      setActiveKeys(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(button.id);
                        return newSet;
                      });
                      stopNote(button.id);
                    }
                  }}
                >
                  <span className="text-white/90 font-medium text-[8px] sm:text-xs">{button.note}</span>
                  <span className="hidden sm:block absolute -bottom-0.5 text-[8px] sm:text-[10px] text-amber-400/70 font-mono">
                    {button.keyBinding.toUpperCase()}
                  </span>
                  {activeKeys.has(button.id) && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-amber-400/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Bellows - Fole realista e responsivo */}
          <motion.div
            className="relative flex items-center"
            animate={{
              width: bellowsDirection === 'open' ? (typeof window !== 'undefined' && window.innerWidth < 640 ? '50px' : '90px') : (typeof window !== 'undefined' && window.innerWidth < 640 ? '18px' : '30px'),
            }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div 
              className="h-full w-full relative overflow-hidden rounded-sm"
              style={{
                minHeight: '280px',
                background: '#1a1a1a',
              }}
            >
            {/* Folds do fole - textura de couro/tecido realista */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full"
                style={{
                  top: `${i * 8.33}%`,
                  height: '8.33%',
                }}
                animate={{
                  scaleX: bellowsDirection === 'open' ? 1 : 0.6,
                }}
                transition={{ delay: i * 0.015, duration: 0.2 }}
              >
                {/* Dobra principal */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: i % 2 === 0 
                      ? 'linear-gradient(180deg, #8B0000 0%, #660000 25%, #4a0000 50%, #660000 75%, #8B0000 100%)'
                      : 'linear-gradient(180deg, #660000 0%, #4a0000 25%, #330000 50%, #4a0000 75%, #660000 100%)',
                    boxShadow: 'inset 0 1px 2px rgba(255,200,200,0.1), inset 0 -1px 2px rgba(0,0,0,0.5)',
                  }}
                />
                {/* Borda metálica entre dobras */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{
                    background: 'linear-gradient(90deg, #444 0%, #888 30%, #aaa 50%, #888 70%, #444 100%)',
                  }}
                />
                {/* Detalhes laterais de metal */}
                <div 
                  className="absolute top-0 left-0 bottom-0 w-[4px]"
                  style={{
                    background: 'linear-gradient(180deg, #666 0%, #333 50%, #666 100%)',
                  }}
                />
                <div 
                  className="absolute top-0 right-0 bottom-0 w-[4px]"
                  style={{
                    background: 'linear-gradient(180deg, #666 0%, #333 50%, #666 100%)',
                  }}
                />
              </motion.div>
            ))}
            
            {/* Molduras laterais do fole */}
            <div className="absolute top-0 left-0 w-[6px] h-full bg-gradient-to-r from-amber-900 to-amber-800 shadow-lg" />
            <div className="absolute top-0 right-0 w-[6px] h-full bg-gradient-to-l from-amber-900 to-amber-800 shadow-lg" />
            
            {/* Indicador de direção do fole */}
            {/* Bellows animation indicator - removed icon */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Icon removed for cleaner professional look */}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Melody Buttons - Caixa do teclado realista e responsiva */}
        <div 
          className={`
            relative flex flex-col justify-center gap-1.5 sm:gap-3 p-2 sm:p-6
            border-2 shadow-2xl
            ${isBandoneon ? 'rounded-xl sm:rounded-2xl border-stone-600' : 'rounded-r-2xl sm:rounded-r-3xl rounded-l-md sm:rounded-l-lg border-amber-900/60'}
          `}
          style={{
            background: `
              linear-gradient(135deg, 
                #5a4332 0%, 
                #4a3728 20%, 
                #3d2817 50%, 
                #2d1f17 80%, 
                #1a110b 100%
              )
            `,
            boxShadow: `
              inset 0 2px 6px rgba(255,220,180,0.12), 
              inset 0 -3px 8px rgba(0,0,0,0.4),
              0 15px 50px rgba(0,0,0,0.6),
              0 0 0 1px rgba(139,69,19,0.25)
            `,
          }}
        >
          {/* Textura de madeira */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  85deg,
                  transparent 0px,
                  rgba(139,69,19,0.08) 1px,
                  transparent 2px,
                  transparent 15px
                ),
                repeating-linear-gradient(
                  95deg,
                  transparent 0px,
                  rgba(0,0,0,0.05) 1px,
                  transparent 2px,
                  transparent 25px
                )
              `,
              borderRadius: 'inherit',
            }}
          />
          
          {/* Decorative metal corners - hidden on mobile */}
          <div className="hidden sm:block absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-amber-400/35 rounded-tr-xl" />
          <div className="hidden sm:block absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-amber-400/35 rounded-br-xl" />
          <div className="hidden sm:block absolute top-1/2 right-3 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-amber-400/15 via-amber-300/30 to-amber-400/15 rounded-full" />
          
          {/* Grille decoration - Grade do alto-falante estilo vintage - hidden on mobile */}
          <div 
            className="hidden sm:block absolute top-4 left-1/2 -translate-x-1/2 w-20 h-10 rounded-lg overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #3a2a1a 0%, #2a1a10 100%)',
              border: '2px solid #4a3a2a',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            <div className="w-full h-full flex items-center justify-center gap-1 p-1">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-full w-1 rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, #5a4a3a 0%, #3a2a1a 50%, #5a4a3a 100%)',
                    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)',
                  }}
                />
              ))}
            </div>
            {/* Logo/marca decorativa */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[6px] text-amber-600/30 font-serif tracking-widest">TABS</span>
            </div>
          </div>
          
          {/* Melody Buttons */}
          {isPianoStyle ? (
            <div className="relative pt-4 sm:pt-12">
              {/* White keys */}
              <div className="flex gap-0.5">
                {buttonsByRow[1]?.map((button, idx) => (
                  <motion.button
                    key={button.id}
                    className={`
                      relative w-9 h-28 sm:w-[54px] sm:h-[180px] rounded-b-md sm:rounded-b-lg
                      flex flex-col items-center justify-end pb-2 sm:pb-4
                      bg-gradient-to-b from-white via-gray-50 to-gray-100
                      border border-gray-400 border-b-2 border-b-gray-500
                      touch-manipulation
                    `}
                    style={{
                      boxShadow: activeKeys.has(button.id)
                        ? 'inset 0 4px 14px rgba(0,0,0,0.45)'
                        : '0 6px 12px rgba(0,0,0,0.3), inset 0 -4px 0 rgba(0,0,0,0.18)',
                    }}
                    animate={{
                      scale: activeKeys.has(button.id) ? 0.97 : 1,
                      y: activeKeys.has(button.id) ? 2 : 0,
                    }}
                    whileHover={{ scale: 1.02 }}
                    onMouseDown={() => {
                      setActiveKeys(prev => new Set([...prev, button.id]));
                      playNote(button.id, convertNote(getNoteForButton(button.openNote, button.closeNote)));
                    }}
                    onMouseUp={() => {
                      setActiveKeys(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(button.id);
                        return newSet;
                      });
                      stopNote(button.id);
                    }}
                    onMouseLeave={() => {
                      if (activeKeys.has(button.id)) {
                        setActiveKeys(prev => {
                          const newSet = new Set(prev);
                          newSet.delete(button.id);
                          return newSet;
                        });
                        stopNote(button.id);
                      }
                    }}
                  >
                    <span className="text-[9px] sm:text-xs text-gray-600 font-semibold">
                      {getNoteForButton(button.openNote, button.closeNote)}
                    </span>
                    <span className="text-[8px] sm:text-[10px] text-gray-500 font-mono">
                      {button.keyBinding.toUpperCase()}
                    </span>
                  </motion.button>
                ))}
              </div>
              {/* Black keys */}
              <div className="absolute top-12 left-0 flex">
                {buttonsByRow[2]?.map((button, idx) => {
                  // Position black keys with gaps
                  const blackKeyPositions = [0.75, 1.75, 3.25, 4.25, 5.25, 7.25, 8.25, 9.75, 10.75, 11.75];
                  const left = blackKeyPositions[idx] ? blackKeyPositions[idx] * 36 : (idx + 0.5) * 36;
                  
                  return (
                    <motion.button
                      key={button.id}
                      className="absolute w-7 h-22 sm:w-9 sm:h-[120px] rounded-b-md bg-gradient-to-b from-gray-900 to-black border-2 border-black z-10"
                      style={{
                        left: `${left}px`,
                        boxShadow: activeKeys.has(button.id)
                          ? 'inset 0 4px 10px rgba(0,0,0,0.95)'
                          : '0 6px 12px rgba(0,0,0,0.7), 0 3px 6px rgba(0,0,0,0.85)',
                      }}
                      animate={{
                        scale: activeKeys.has(button.id) ? 0.95 : 1,
                        y: activeKeys.has(button.id) ? 2 : 0,
                      }}
                      onMouseDown={() => {
                        setActiveKeys(prev => new Set([...prev, button.id]));
                        playNote(button.id, convertNote(getNoteForButton(button.openNote, button.closeNote)));
                      }}
                      onMouseUp={() => {
                        setActiveKeys(prev => {
                          const newSet = new Set(prev);
                          newSet.delete(button.id);
                          return newSet;
                        });
                        stopNote(button.id);
                      }}
                      onMouseLeave={() => {
                        if (activeKeys.has(button.id)) {
                          setActiveKeys(prev => {
                            const newSet = new Set(prev);
                            newSet.delete(button.id);
                            return newSet;
                          });
                          stopNote(button.id);
                        }
                      }}
                    >
                      <span className="text-[6px] text-white/60 absolute bottom-1 left-1/2 -translate-x-1/2">
                        {button.keyBinding.toUpperCase()}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 sm:gap-5 pt-2 sm:pt-12">
              {Object.entries(buttonsByRow).map(([rowNum, buttons]) => {
                const rowIndex = parseInt(rowNum);
                const offset = (rowIndex - 1) * 10; // Offset mais realista
                
                return (
                  <div 
                    key={rowNum} 
                    className="flex gap-1.5 sm:gap-2.5"
                    style={{ marginLeft: `${offset}px` }}
                  >
                    {buttons.map((button) => {
                      const isActive = activeKeys.has(button.id);
                      
                      return (
                        <motion.button
                          key={button.id}
                          className={`
                            relative w-10 h-10 sm:w-16 sm:h-16 rounded-full
                            flex flex-col items-center justify-center
                            transition-all duration-75 overflow-hidden
                            touch-manipulation
                          `}
                          style={{
                            background: isActive
                              ? `linear-gradient(145deg, #c0b090 0%, #8a7050 50%, #6a5040 100%)`
                              : `linear-gradient(145deg, #faf8f0 0%, #ece8dc 15%, #ded8cc 30%, #cfc9bd 45%, #c0baae 60%, #b1ab9f 75%, #a29c90 90%, #938d81 100%)`,
                            boxShadow: isActive
                              ? `
                                  inset 0 5px 12px rgba(0,0,0,0.65), 
                                  inset 0 -3px 4px rgba(255,255,255,0.25),
                                  0 0 25px rgba(255,200,100,0.6)
                                `
                              : `
                                  0 5px 10px rgba(0,0,0,0.5), 
                                  0 9px 18px rgba(0,0,0,0.3),
                                  inset 0 3px 0 rgba(255,255,255,1),
                                  inset 0 -3px 0 rgba(0,0,0,0.2)
                                `,
                            border: isActive 
                              ? '3px solid #6a5040' 
                              : '3px solid #a09580',
                            transform: isActive ? 'translateY(2px)' : 'translateY(0)',
                          }}
                          animate={{
                            scale: isActive ? 0.94 : 1,
                          }}
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.94 }}
                          onMouseDown={() => {
                            setActiveKeys(prev => new Set([...prev, button.id]));
                            playNote(button.id, convertNote(getNoteForButton(button.openNote, button.closeNote)));
                          }}
                          onMouseUp={() => {
                            setActiveKeys(prev => {
                              const newSet = new Set(prev);
                              newSet.delete(button.id);
                              return newSet;
                            });
                            stopNote(button.id);
                          }}
                          onTouchStart={(e) => {
                            e.preventDefault();
                            setActiveKeys(prev => new Set([...prev, button.id]));
                            playNote(button.id, convertNote(getNoteForButton(button.openNote, button.closeNote)));
                          }}
                          onTouchEnd={(e) => {
                            e.preventDefault();
                            setActiveKeys(prev => {
                              const newSet = new Set(prev);
                              newSet.delete(button.id);
                              return newSet;
                            });
                            stopNote(button.id);
                          }}
                          onMouseLeave={() => {
                            if (isActive) {
                              setActiveKeys(prev => {
                                const newSet = new Set(prev);
                                newSet.delete(button.id);
                                return newSet;
                              });
                              stopNote(button.id);
                            }
                          }}
                        >
                          {/* Efeito de madrepérola/nácar realista */}
                          <div 
                            className="absolute inset-0 rounded-full opacity-40 pointer-events-none"
                            style={{
                              background: `
                                radial-gradient(ellipse at 25% 25%, rgba(255,255,255,0.8) 0%, transparent 40%),
                                radial-gradient(ellipse at 75% 75%, rgba(220,200,180,0.5) 0%, transparent 30%)
                              `,
                            }}
                          />
                          
                          {/* Marcador de nota especial (Dó, Fá) - hidden on mobile */}
                          {(button.openNote.includes('Dó') || button.openNote.includes('Fá')) && (
                            <div 
                              className="hidden sm:block absolute top-0.5 sm:top-1 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full"
                              style={{
                                background: 'linear-gradient(145deg, #4a4a4a 0%, #2a2a2a 100%)',
                                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)',
                              }}
                            />
                          )}
                          
                          <span className={`text-xs sm:text-base font-bold relative z-10 ${isActive ? 'text-amber-900' : 'text-stone-800'}`}>
                            {getNoteForButton(button.openNote, button.closeNote)}
                          </span>
                          <span className={`hidden sm:block text-[9px] sm:text-xs font-mono relative z-10 mt-1 ${isActive ? 'text-amber-800/70' : 'text-stone-600'}`}>
                            {button.keyBinding.toUpperCase()}
                          </span>
                          
                          {/* Glow effect when active */}
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                className="absolute inset-0 rounded-full pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.3 }}
                                exit={{ opacity: 0 }}
                                style={{ 
                                  background: 'radial-gradient(circle, rgba(255,200,100,0.6) 0%, transparent 70%)',
                                }}
                              />
                            )}
                          </AnimatePresence>
                        </motion.button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Bellows Direction Indicator - Responsivo */}
      <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-4">
        <div 
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all ${
            bellowsDirection === 'open' 
              ? 'bg-amber-500/20 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 dark:border-amber-500/30' 
              : 'bg-amber-500/5 dark:bg-amber-500/5 text-muted-foreground border border-amber-500/10 dark:border-amber-500/10'
          }`}
        >
          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${bellowsDirection === 'open' ? 'bg-amber-500' : 'bg-muted-foreground'}`} />
          <span className="text-xs sm:text-sm font-medium">Abrindo</span>
        </div>
        <div 
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all ${
            bellowsDirection === 'close' 
              ? 'bg-orange-500/20 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30 dark:border-orange-500/30' 
              : 'bg-amber-500/5 dark:bg-amber-500/5 text-muted-foreground border border-amber-500/10 dark:border-amber-500/10'
          }`}
        >
          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${bellowsDirection === 'close' ? 'bg-orange-500' : 'bg-muted-foreground'}`} />
          <span className="text-xs sm:text-sm font-medium">Fechando</span>
        </div>
      </div>

      {/* Instructions - Responsivo, mais compacto em mobile */}
      <div className="mt-3 sm:mt-6 p-2.5 sm:p-4 bg-amber-500/5 dark:bg-amber-500/5 backdrop-blur-sm rounded-lg sm:rounded-xl border border-amber-500/20 dark:border-amber-500/20 max-w-lg">
        <h3 className="font-semibold text-xs sm:text-sm mb-1.5 sm:mb-2 text-center text-amber-400/90 dark:text-amber-400/90">Como Tocar</h3>
        <ul className="text-[10px] sm:text-xs text-muted-foreground space-y-0.5 sm:space-y-1">
          <li className="hidden sm:list-item">• Use as teclas indicadas nos botões para tocar</li>
          <li>• <span className="sm:hidden">Toque nos botões ou use</span><span className="hidden sm:inline">Pressione</span> <kbd className="px-1 sm:px-1.5 py-0.5 bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/20 dark:border-amber-500/20 rounded text-[8px] sm:text-[10px] font-mono text-amber-300 dark:text-amber-300">Espaço</kbd> para alternar o fole</li>
          <li>• As notas mudam conforme a direção do fole</li>
          <li className="hidden sm:list-item">• Os botões da esquerda são baixos e acordes</li>
        </ul>
      </div>
    </div>
  );
}
