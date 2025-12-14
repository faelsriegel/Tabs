import { Instrument } from '@/types';

export const instruments: Instrument[] = [
  {
    id: 'accordion',
    name: 'Acordeão',
    description: 'Simulador de acordeão diatônico com múltiplas configurações. Toque usando o teclado!',
    icon: '🪗',
    route: '/acordeao',
    color: '#ef4444',
    available: true,
  },
  {
    id: 'guitar',
    name: 'Violão',
    description: 'Simulador de violão com tablaturas estilo Guitar Hero. Em breve!',
    icon: '🎸',
    route: '/violao',
    color: '#f59e0b',
    available: false,
  },
  {
    id: 'electric-guitar',
    name: 'Guitarra',
    description: 'Simulador de guitarra elétrica com efeitos e distorções. Em breve!',
    icon: '🎸',
    route: '/guitarra',
    color: '#8b5cf6',
    available: false,
  },
  {
    id: 'piano',
    name: 'Piano',
    description: 'Simulador de piano com teclado completo. Em breve!',
    icon: '🎹',
    route: '/piano',
    color: '#3b82f6',
    available: false,
  },
];

export const getInstrument = (id: string): Instrument | undefined => {
  return instruments.find(inst => inst.id === id);
};
