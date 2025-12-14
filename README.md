# 🎵 Tabs - Simulador de Instrumentos Musicais

Plataforma web interativa para simular instrumentos musicais com fidelidade de áudio e resposta em tempo real. O projeto oferece uma experiência imersiva de aprendizado e prática musical diretamente no navegador.

## 🎯 Visão Geral

O Tabs é uma aplicação Next.js 16 que simula instrumentos musicais com síntese de áudio em tempo real. Atualmente implementa um acordeão completo com múltiplas configurações, com arquitetura preparada para violão e guitarra.

### Recursos Implementados

**Acordeão (Completamente Funcional)**
- 5 tipos: Verdulera, Diatônico, Cromático, Piano e Bandoneón
- Sistema push/pull autêntico (diferentes notas ao abrir/fechar o fole)
- 5 timbres: Acordeão Clássico, Musette Francês, Bandoneón Tango, Órgão, Gaita/Harmônica
- Controle de volume e direção do fole em tempo real
- Mapeamento de teclado customizado por tipo de acordeão
- Visualização interativa dos botões com feedback visual
- Síntese de áudio Web Audio API com suporte a harmônicos e modulação

**Violão e Guitarra (Planejados)**
- Estrutura de configuração preparada em `/src/config/instruments.ts`
- Componentes UI prontos para integração

## 🛠️ Stack Tecnológico

```json
{
  "framework": "Next.js 16.0.10 (App Router)",
  "linguagem": "TypeScript 5",
  "ui": ["React 19.2.1", "Tailwind CSS 4", "Radix UI", "Framer Motion"],
  "áudio": ["Web Audio API", "Tone.js", "Howler.js"],
  "ícones": "Lucide React",
  "gestão": "Class Variance Authority + clsx + tailwind-merge"
}
```

## 📂 Arquitetura do Projeto

```
src/
├── app/
│   ├── page.tsx              # Landing page com seleção de instrumentos
│   ├── acordeao/page.tsx     # Página do simulador de acordeão
│   ├── layout.tsx            # Layout raiz com theme provider
│   └── globals.css           # Estilos globais + Tailwind
├── components/
│   ├── ThemeProvider.tsx     # Context de tema claro/escuro
│   ├── instruments/
│   │   └── Accordion.tsx     # Componente principal do acordeão (787 linhas)
│   └── ui/                   # Componentes shadcn/ui
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       └── slider.tsx
├── config/
│   ├── accordion.ts          # Configurações de todos os tipos de acordeão
│   └── instruments.ts        # Metadados dos instrumentos disponíveis
├── hooks/
│   ├── useAudioEngine.ts     # Engine de síntese de áudio (268 linhas)
│   └── useKeyboard.ts        # Hook de captura de eventos de teclado
├── types/
│   └── index.ts              # Tipos TypeScript compartilhados
└── lib/
    └── utils.ts              # Utilitários (cn, etc)
```

## 🎼 Detalhes da Implementação de Áudio

### Engine de Síntese (`useAudioEngine.ts`)
- **Osciladores**: Sawtooth, square, triangle com harmonics customizados
- **Filtros**: Low-pass com frequência e Q configuráveis por timbre
- **Envelope ADSR**: Attack, Decay, Sustain, Release independentes
- **Detune**: Efeito chorus/musette com osciladores detuned
- **Polyphony**: Suporte a múltiplas notas simultâneas
- **Mapeamento**: Note names → Frequências (C2-G7, incluindo Bb)
- **Acordes**: Pré-configurados para baixos (Gmaj, Cmaj, Fmaj, D7, Am)

### Configurações de Acordeão (`accordion.ts`)
Cada tipo tem estrutura:
```typescript
{
  id: string;
  name: string;
  description: string;
  tuning: string;
  buttons: AccordionButton[];  // Botões de melodia
  bassButtons: AccordionBass[]; // Botões de baixo
}
```

**Tipos implementados:**
1. **Verdulera** (8 botões × 2 fileiras): Sistema Sol/Dó argentino
2. **Diatônico** (10 botões × 2 fileiras): Escalas diatônicas G/C
3. **Cromático** (12 botões × 3 fileiras): Escala cromática completa
4. **Piano** (41 botões): Layout de piano tradicional
5. **Bandoneón** (38 botões): Configuração clássica de tango

Cada botão tem: `id`, `row`, `position`, `openNote`, `closeNote`, `keyBinding`, `color`.

## 🎨 Sistema de Tema

O projeto usa `ThemeProvider` com `next-themes` para alternar entre light/dark mode. Cores consistentes via Tailwind CSS com variáveis CSS customizadas.

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📋 Roadmap de Desenvolvimento

### Próximas Features
1. **Violão**
   - Sistema de tablaturas interativas
   - Acordes com posições de dedos
   - Dedilhados e arpejos
   - Afinações alternativas (Drop D, Open G, etc)
   - Capotraste virtual

2. **Guitarra**
   - Efeitos de pedal (distortion, delay, reverb, chorus)
   - Técnicas (bend, slide, hammer-on, pull-off)
   - Modo Lead e Rhythm
   - Backing tracks

3. **Melhorias do Acordeão**
   - Gravação e playback de performances
   - Metrônomo integrado
   - Modos de aprendizado guiado
   - Músicas pré-programadas com tutoriais

4. **Sistema Geral**
   - Biblioteca de músicas/partituras
   - Exportação MIDI
   - Integração com dispositivos MIDI externos
   - Modo multiplayer/colaborativo
   - Sistema de progressão e conquistas

### Otimizações Técnicas
- Lazy loading de samples de áudio
- Service Worker para cache offline
- Análise de performance de síntese
- Suporte a Web MIDI API
- PWA para instalação mobile

## 🎹 Uso do Simulador de Acordeão

1. Selecione o tipo de acordeão no dropdown
2. Escolha o timbre desejado
3. Use **Espaço** para alternar direção do fole (abrir/fechar)
4. Pressione as teclas mapeadas para tocar notas
5. Ajuste o volume com o slider
6. Botões de melodia (lado direito) e baixos/acordes (lado esquerdo)

### Mapeamento de Teclado (Verdulera)
- **Melodia**: 1-8 (primeira fileira), Q-I (segunda fileira)
- **Baixos**: Z, X, C, V, B, N

## 🧩 Padrões de Código

- **Componentes**: Client components com `'use client'`
- **Hooks**: Custom hooks para lógica reutilizável
- **Tipagem**: Forte com TypeScript, interfaces em `types/index.ts`
- **Estilização**: Tailwind utility-first + componentes shadcn
- **Animações**: Framer Motion para transições suaves
- **Estado**: useState/useCallback/useRef para performance

## 📄 Licença

Projeto pessoal - Livre para uso educacional

---

**Desenvolvedor**: Tabs Team  
**Versão**: 0.1.0  
**Última Atualização**: Dezembro 2025
