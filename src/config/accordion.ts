import { AccordionConfig, AccordionButton, AccordionBass } from '@/types';

// Helper function to create melody buttons
function createMelodyButtons(
  rows: { openNotes: string[]; closeNotes: string[]; keyBindings: string[] }[]
): AccordionButton[] {
  const buttons: AccordionButton[] = [];
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'];
  
  rows.forEach((row, rowIndex) => {
    row.openNotes.forEach((openNote, position) => {
      buttons.push({
        id: `btn-${rowIndex + 1}-${position + 1}`,
        row: rowIndex + 1,
        position: position + 1,
        openNote,
        closeNote: row.closeNotes[position] || openNote,
        keyBinding: row.keyBindings[position] || '',
        color: colors[rowIndex % colors.length],
      });
    });
  });
  
  return buttons;
}

// Helper function to create bass buttons
function createBassButtons(
  config: { note: string; keyBinding: string; type: 'bass' | 'chord' }[]
): AccordionBass[] {
  return config.map((item, index) => ({
    id: `bass-${index + 1}`,
    note: item.note,
    keyBinding: item.keyBinding,
    type: item.type,
  }));
}

// ==================== ACORDEÃO VERDULERA (ARGENTINO) ====================
export const verduleraConfig: AccordionConfig = {
  id: 'verdulera',
  name: 'Verdulera (Argentino)',
  description: 'Acordeão de 2 fileiras Sol/Dó - Sistema Roque Gonzales',
  tuning: 'Sol/Dó (G/C)',
  buttons: createMelodyButtons([
    {
      openNotes: ['Si3', 'Ré4', 'Sol4', 'Si4', 'Ré5', 'Sol5', 'Si5', 'Ré6'],
      closeNotes: ['Lá3', 'Dó4', 'Mi4', 'Lá4', 'Dó5', 'Mi5', 'Lá5', 'Dó6'],
      keyBindings: ['1', '2', '3', '4', '5', '6', '7', '8'],
    },
    {
      openNotes: ['Dó4', 'Mi4', 'Sol4', 'Dó5', 'Mi5', 'Sol5', 'Dó6', 'Mi6'],
      closeNotes: ['Ré4', 'Fá4', 'Lá4', 'Ré5', 'Fá5', 'Lá5', 'Ré6', 'Fá6'],
      keyBindings: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i'],
    },
  ]),
  bassButtons: createBassButtons([
    { note: 'Sol', keyBinding: 'z', type: 'bass' },
    { note: 'Dó', keyBinding: 'x', type: 'bass' },
    { note: 'Ré', keyBinding: 'c', type: 'bass' },
    { note: 'Sol', keyBinding: 'a', type: 'chord' },
    { note: 'Dó', keyBinding: 's', type: 'chord' },
    { note: 'Ré7', keyBinding: 'd', type: 'chord' },
  ]),
};

// ==================== ACORDEÃO DIATÔNICO 3 FILEIRAS ====================
export const diatonicoConfig: AccordionConfig = {
  id: 'diatonico',
  name: 'Diatônico 3 Fileiras',
  description: 'Acordeão diatônico de 3 fileiras Sol/Dó/Fá',
  tuning: 'Sol/Dó/Fá (G/C/F)',
  buttons: createMelodyButtons([
    {
      openNotes: ['Sol3', 'Si3', 'Ré4', 'Sol4', 'Si4', 'Ré5', 'Sol5', 'Si5', 'Ré6', 'Sol6'],
      closeNotes: ['Lá3', 'Dó4', 'Mi4', 'Lá4', 'Dó5', 'Mi5', 'Lá5', 'Dó6', 'Mi6', 'Lá6'],
      keyBindings: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    },
    {
      openNotes: ['Dó4', 'Mi4', 'Sol4', 'Dó5', 'Mi5', 'Sol5', 'Dó6', 'Mi6', 'Sol6', 'Dó7'],
      closeNotes: ['Ré4', 'Fá4', 'Lá4', 'Ré5', 'Fá5', 'Lá5', 'Ré6', 'Fá6', 'Lá6', 'Ré7'],
      keyBindings: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    },
    {
      openNotes: ['Fá3', 'Lá3', 'Dó4', 'Fá4', 'Lá4', 'Dó5', 'Fá5', 'Lá5', 'Dó6', 'Fá6'],
      closeNotes: ['Sol3', 'Sib3', 'Ré4', 'Sol4', 'Sib4', 'Ré5', 'Sol5', 'Sib5', 'Ré6', 'Sol6'],
      keyBindings: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    },
  ]),
  bassButtons: createBassButtons([
    { note: 'Sol', keyBinding: 'z', type: 'bass' },
    { note: 'Dó', keyBinding: 'x', type: 'bass' },
    { note: 'Fá', keyBinding: 'c', type: 'bass' },
    { note: 'Ré', keyBinding: 'v', type: 'bass' },
    { note: 'Sol', keyBinding: 'b', type: 'chord' },
    { note: 'Dó', keyBinding: 'n', type: 'chord' },
    { note: 'Fá', keyBinding: 'm', type: 'chord' },
    { note: 'Ré7', keyBinding: ',', type: 'chord' },
  ]),
};

// ==================== ACORDEÃO MEXICANO ====================
export const mexicanoConfig: AccordionConfig = {
  id: 'mexicano',
  name: 'Mexicano (Norteño)',
  description: 'Acordeão diatônico Mexicano estilo Norteño',
  tuning: 'Fá/Sib (F/Bb)',
  buttons: createMelodyButtons([
    {
      openNotes: ['Fá3', 'Lá3', 'Dó4', 'Fá4', 'Lá4', 'Dó5', 'Fá5', 'Lá5', 'Dó6', 'Fá6'],
      closeNotes: ['Sol3', 'Sib3', 'Ré4', 'Sol4', 'Sib4', 'Ré5', 'Sol5', 'Sib5', 'Ré6', 'Sol6'],
      keyBindings: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    },
    {
      openNotes: ['Sib3', 'Ré4', 'Fá4', 'Sib4', 'Ré5', 'Fá5', 'Sib5', 'Ré6', 'Fá6', 'Sib6'],
      closeNotes: ['Dó4', 'Mib4', 'Sol4', 'Dó5', 'Mib5', 'Sol5', 'Dó6', 'Mib6', 'Sol6', 'Dó7'],
      keyBindings: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    },
  ]),
  bassButtons: createBassButtons([
    { note: 'Fá', keyBinding: 'z', type: 'bass' },
    { note: 'Sib', keyBinding: 'x', type: 'bass' },
    { note: 'Dó', keyBinding: 'c', type: 'bass' },
    { note: 'Fá', keyBinding: 'a', type: 'chord' },
    { note: 'Sib', keyBinding: 's', type: 'chord' },
    { note: 'Dó7', keyBinding: 'd', type: 'chord' },
  ]),
};

// ==================== ACORDEÃO COLOMBIANO (VALLENATO) ====================
export const colombianoConfig: AccordionConfig = {
  id: 'colombiano',
  name: 'Colombiano (Vallenato)',
  description: 'Acordeão diatônico para Vallenato colombiano',
  tuning: 'Sol/Dó/Fá (G/C/F)',
  buttons: createMelodyButtons([
    {
      openNotes: ['Sol3', 'Si3', 'Ré4', 'Sol4', 'Si4', 'Ré5', 'Sol5', 'Si5', 'Ré6'],
      closeNotes: ['Lá3', 'Dó4', 'Mi4', 'Lá4', 'Dó5', 'Mi5', 'Lá5', 'Dó6', 'Mi6'],
      keyBindings: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    },
    {
      openNotes: ['Dó4', 'Mi4', 'Sol4', 'Dó5', 'Mi5', 'Sol5', 'Dó6', 'Mi6', 'Sol6'],
      closeNotes: ['Ré4', 'Fá4', 'Lá4', 'Ré5', 'Fá5', 'Lá5', 'Ré6', 'Fá6', 'Lá6'],
      keyBindings: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o'],
    },
    {
      openNotes: ['Fá3', 'Lá3', 'Dó4', 'Fá4', 'Lá4', 'Dó5', 'Fá5', 'Lá5', 'Dó6'],
      closeNotes: ['Sol3', 'Sib3', 'Ré4', 'Sol4', 'Sib4', 'Ré5', 'Sol5', 'Sib5', 'Ré6'],
      keyBindings: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    },
  ]),
  bassButtons: createBassButtons([
    { note: 'Sol', keyBinding: 'z', type: 'bass' },
    { note: 'Dó', keyBinding: 'x', type: 'bass' },
    { note: 'Fá', keyBinding: 'c', type: 'bass' },
    { note: 'Ré', keyBinding: 'v', type: 'bass' },
    { note: 'Sol', keyBinding: 'b', type: 'chord' },
    { note: 'Dó', keyBinding: 'n', type: 'chord' },
    { note: 'Fá', keyBinding: 'm', type: 'chord' },
    { note: 'Ré7', keyBinding: ',', type: 'chord' },
  ]),
};

// ==================== ACORDEÃO CROMÁTICO ====================
export const cromaticoConfig: AccordionConfig = {
  id: 'cromatico',
  name: 'Cromático',
  description: 'Acordeão cromático com botões em ambos os lados',
  tuning: 'Cromático (C System)',
  buttons: createMelodyButtons([
    {
      openNotes: ['Dó4', 'Mib4', 'Fá#4', 'Lá4', 'Dó5', 'Mib5', 'Fá#5', 'Lá5', 'Dó6', 'Mib6'],
      closeNotes: ['Dó4', 'Mib4', 'Fá#4', 'Lá4', 'Dó5', 'Mib5', 'Fá#5', 'Lá5', 'Dó6', 'Mib6'],
      keyBindings: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    },
    {
      openNotes: ['Dó#4', 'Mi4', 'Sol4', 'Sib4', 'Dó#5', 'Mi5', 'Sol5', 'Sib5', 'Dó#6', 'Mi6'],
      closeNotes: ['Dó#4', 'Mi4', 'Sol4', 'Sib4', 'Dó#5', 'Mi5', 'Sol5', 'Sib5', 'Dó#6', 'Mi6'],
      keyBindings: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    },
    {
      openNotes: ['Ré4', 'Fá4', 'Sol#4', 'Si4', 'Ré5', 'Fá5', 'Sol#5', 'Si5', 'Ré6', 'Fá6'],
      closeNotes: ['Ré4', 'Fá4', 'Sol#4', 'Si4', 'Ré5', 'Fá5', 'Sol#5', 'Si5', 'Ré6', 'Fá6'],
      keyBindings: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    },
  ]),
  bassButtons: createBassButtons([
    { note: 'Dó', keyBinding: 'z', type: 'bass' },
    { note: 'Sol', keyBinding: 'x', type: 'bass' },
    { note: 'Ré', keyBinding: 'c', type: 'bass' },
    { note: 'Lá', keyBinding: 'v', type: 'bass' },
    { note: 'Mi', keyBinding: 'b', type: 'bass' },
    { note: 'Dó', keyBinding: 'n', type: 'chord' },
    { note: 'Sol', keyBinding: 'm', type: 'chord' },
    { note: 'Ré', keyBinding: ',', type: 'chord' },
    { note: 'Lá', keyBinding: '.', type: 'chord' },
    { note: 'Mi', keyBinding: '/', type: 'chord' },
  ]),
};

// ==================== BANDONEON ====================
export const bandoneonConfig: AccordionConfig = {
  id: 'bandoneon',
  name: 'Bandoneón',
  description: 'Bandoneón argentino para Tango e Chamamé',
  tuning: 'Sistema 142 vozes',
  buttons: createMelodyButtons([
    {
      openNotes: ['Dó3', 'Ré3', 'Mi3', 'Fá3', 'Sol3', 'Lá3', 'Si3', 'Dó4', 'Ré4', 'Mi4'],
      closeNotes: ['Dó#3', 'Ré#3', 'Fá3', 'Fá#3', 'Sol#3', 'Sib3', 'Dó4', 'Dó#4', 'Ré#4', 'Fá4'],
      keyBindings: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    },
    {
      openNotes: ['Fá4', 'Sol4', 'Lá4', 'Si4', 'Dó5', 'Ré5', 'Mi5', 'Fá5', 'Sol5', 'Lá5'],
      closeNotes: ['Fá#4', 'Sol#4', 'Sib4', 'Dó5', 'Dó#5', 'Ré#5', 'Fá5', 'Fá#5', 'Sol#5', 'Sib5'],
      keyBindings: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    },
  ]),
  bassButtons: createBassButtons([
    { note: 'Dó', keyBinding: 'z', type: 'bass' },
    { note: 'Sol', keyBinding: 'x', type: 'bass' },
    { note: 'Ré', keyBinding: 'c', type: 'bass' },
    { note: 'Lá', keyBinding: 'v', type: 'bass' },
    { note: 'Dó', keyBinding: 'a', type: 'chord' },
    { note: 'Solm', keyBinding: 's', type: 'chord' },
    { note: 'Rém', keyBinding: 'd', type: 'chord' },
    { note: 'Lám', keyBinding: 'f', type: 'chord' },
  ]),
};

// ==================== ACORDEÃO AUSTRÍACO (STEIRISCHE) ====================
export const steirischemConfig: AccordionConfig = {
  id: 'steirische',
  name: 'Austríaco (Steirische)',
  description: 'Acordeão austríaco de 4 fileiras',
  tuning: 'Sol/Dó/Fá/Sib (G/C/F/Bb)',
  buttons: createMelodyButtons([
    {
      openNotes: ['Sol3', 'Si3', 'Ré4', 'Sol4', 'Si4', 'Ré5', 'Sol5', 'Si5'],
      closeNotes: ['Lá3', 'Dó4', 'Mi4', 'Lá4', 'Dó5', 'Mi5', 'Lá5', 'Dó6'],
      keyBindings: ['1', '2', '3', '4', '5', '6', '7', '8'],
    },
    {
      openNotes: ['Dó4', 'Mi4', 'Sol4', 'Dó5', 'Mi5', 'Sol5', 'Dó6', 'Mi6'],
      closeNotes: ['Ré4', 'Fá4', 'Lá4', 'Ré5', 'Fá5', 'Lá5', 'Ré6', 'Fá6'],
      keyBindings: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i'],
    },
    {
      openNotes: ['Fá3', 'Lá3', 'Dó4', 'Fá4', 'Lá4', 'Dó5', 'Fá5', 'Lá5'],
      closeNotes: ['Sol3', 'Sib3', 'Ré4', 'Sol4', 'Sib4', 'Ré5', 'Sol5', 'Sib5'],
      keyBindings: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k'],
    },
    {
      openNotes: ['Sib2', 'Ré3', 'Fá3', 'Sib3', 'Ré4', 'Fá4', 'Sib4', 'Ré5'],
      closeNotes: ['Dó3', 'Mib3', 'Sol3', 'Dó4', 'Mib4', 'Sol4', 'Dó5', 'Mib5'],
      keyBindings: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ','],
    },
  ]),
  bassButtons: createBassButtons([
    { note: 'Sol', keyBinding: 'shift+z', type: 'bass' },
    { note: 'Dó', keyBinding: 'shift+x', type: 'bass' },
    { note: 'Fá', keyBinding: 'shift+c', type: 'bass' },
    { note: 'Sib', keyBinding: 'shift+v', type: 'bass' },
    { note: 'Sol', keyBinding: 'shift+a', type: 'chord' },
    { note: 'Dó', keyBinding: 'shift+s', type: 'chord' },
    { note: 'Fá', keyBinding: 'shift+d', type: 'chord' },
    { note: 'Sib', keyBinding: 'shift+f', type: 'chord' },
  ]),
};

// ==================== ACORDEÃO A PIANO ====================
export const pianoConfig: AccordionConfig = {
  id: 'piano',
  name: 'Acordeão a Piano',
  description: 'Acordeão com teclado de piano na mão direita',
  tuning: 'Cromático (Piano)',
  buttons: createMelodyButtons([
    {
      openNotes: ['Dó4', 'Ré4', 'Mi4', 'Fá4', 'Sol4', 'Lá4', 'Si4', 'Dó5', 'Ré5', 'Mi5', 'Fá5', 'Sol5'],
      closeNotes: ['Dó4', 'Ré4', 'Mi4', 'Fá4', 'Sol4', 'Lá4', 'Si4', 'Dó5', 'Ré5', 'Mi5', 'Fá5', 'Sol5'],
      keyBindings: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '\\'],
    },
    {
      openNotes: ['Dó#4', 'Ré#4', 'Fá#4', 'Sol#4', 'Sib4', 'Dó#5', 'Ré#5', 'Fá#5', 'Sol#5', 'Sib5'],
      closeNotes: ['Dó#4', 'Ré#4', 'Fá#4', 'Sol#4', 'Sib4', 'Dó#5', 'Ré#5', 'Fá#5', 'Sol#5', 'Sib5'],
      keyBindings: ['w', 'e', 't', 'y', 'u', 'o', 'p', '[', ']', ''],
    },
  ]),
  bassButtons: createBassButtons([
    { note: 'Dó', keyBinding: '1', type: 'bass' },
    { note: 'Sol', keyBinding: '2', type: 'bass' },
    { note: 'Ré', keyBinding: '3', type: 'bass' },
    { note: 'Lá', keyBinding: '4', type: 'bass' },
    { note: 'Mi', keyBinding: '5', type: 'bass' },
    { note: 'Si', keyBinding: '6', type: 'bass' },
    { note: 'Dó', keyBinding: 'q', type: 'chord' },
    { note: 'Sol', keyBinding: 'r', type: 'chord' },
    { note: 'Ré', keyBinding: 'i', type: 'chord' },
    { note: 'Lá', keyBinding: '7', type: 'chord' },
    { note: 'Mi', keyBinding: '8', type: 'chord' },
    { note: 'Si', keyBinding: '9', type: 'chord' },
  ]),
};

// Export all configs
export const accordionConfigs: AccordionConfig[] = [
  verduleraConfig,
  diatonicoConfig,
  mexicanoConfig,
  colombianoConfig,
  cromaticoConfig,
  bandoneonConfig,
  steirischemConfig,
  pianoConfig,
];

export function getAccordionConfig(id: string): AccordionConfig | undefined {
  return accordionConfigs.find(config => config.id === id);
}

// Categorized configs for the UI
export const accordionCategories = {
  classicos: [
    { id: 'diatonico', name: 'Diatônico', icon: '🪗' },
    { id: 'piano', name: 'Piano', icon: '🎹' },
    { id: 'cromatico', name: 'Cromático', icon: '🔘' },
    { id: 'bandoneon', name: 'Bandoneón', icon: '🎭' },
  ],
  paises: [
    { id: 'mexicano', name: 'Mexicano', icon: '🇲🇽' },
    { id: 'colombiano', name: 'Colombiano', icon: '🇨🇴' },
    { id: 'steirische', name: 'Austríaco', icon: '🇦🇹' },
    { id: 'verdulera', name: 'Argentino', icon: '🇦🇷' },
  ],
};
