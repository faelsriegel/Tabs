'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Guitar,
  Keyboard,
  Music,
  Moon,
  Play,
  Sun,
  Volume2,
  Waves,
  Sparkles,
  Zap,
} from 'lucide-react';

import { useTheme } from '@/components/ThemeProvider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Instrument = {
  id: 'acordeao' | 'violao' | 'guitarra';
  name: string;
  description: string;
  image: string;
  available: boolean;
  chips: string[];
};

const instruments: Instrument[] = [
  {
    id: 'acordeao',
    name: 'Acordeão',
    description: 'Coleção completa com verdulera, diatônico, cromático, piano e bandoneón. Push/pull autêntico.',
    image: '/acordeon.png',
    available: true,
    chips: ['Verdulera', 'Diatônico', 'Cromático', 'Bandoneón'],
  },
  {
    id: 'violao',
    name: 'Violão',
    description: 'Simulador acústico com tablaturas interativas, harmonia funcional e resposta imediata.',
    image: '/violao.png',
    available: false,
    chips: ['Acordes', 'Dedilhados', 'Tablaturas'],
  },
  {
    id: 'guitarra',
    name: 'Guitarra',
    description: 'Instrumento elétrico com efeitos, visualização de cordas e modos rítmicos avançados.',
    image: '/guitarra.png',
    available: false,
    chips: ['Clean', 'Drive', 'Power chords'],
  },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Button
      type="button"
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 rounded-full"
    >
      <motion.div initial={false} animate={{ rotate: isDark ? 0 : 180 }} transition={{ duration: 0.25 }}>
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </motion.div>
    </Button>
  );
}

function FloatingElements() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Theme gradient orbs */}
      <motion.div
        className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-600/25 via-orange-500/15 to-transparent dark:from-amber-600/25 dark:via-orange-500/15 light:from-cyan-500/25 light:via-blue-500/15 blur-3xl"
        animate={{ y: [0, 30, 0], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-32 top-1/2 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-yellow-700/20 via-amber-500/10 to-transparent dark:from-yellow-700/20 dark:via-amber-500/10 light:from-blue-600/20 light:via-cyan-400/10 blur-3xl"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-orange-600/15 to-amber-400/5 dark:from-orange-600/15 dark:to-amber-400/5 light:from-cyan-600/15 light:to-blue-400/5 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Musical notation lines */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="staff" width="100" height="80" patternUnits="userSpaceOnUse">
            <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="30" x2="100" y2="30" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="40" x2="100" y2="40" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#staff)" />
      </svg>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      <motion.div
        className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-500/25 via-orange-600/15 to-yellow-700/10 dark:from-amber-500/25 dark:via-orange-600/15 dark:to-yellow-700/10 light:from-cyan-400/25 light:via-blue-500/15 light:to-sky-600/10 blur-2xl"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <Link href="/acordeao" className="block">
        <div className="group relative overflow-hidden rounded-2xl border border-amber-500/20 dark:border-amber-500/20 light:border-cyan-500/20 bg-gradient-to-br from-card/90 via-card/80 to-amber-950/30 dark:to-amber-950/30 light:to-cyan-50/30 backdrop-blur-xl shadow-2xl shadow-amber-900/20 dark:shadow-amber-900/20 light:shadow-cyan-500/10 cursor-pointer transition-all duration-300 hover:border-amber-500/40 dark:hover:border-amber-500/40 light:hover:border-cyan-500/40">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/hero.png"
              alt="Acordeão virtual"
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
        
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-600/20 dark:from-amber-500/30 dark:to-orange-600/20 light:from-cyan-500/30 light:to-blue-600/20 shadow-lg shadow-amber-500/10 dark:shadow-amber-500/10 light:shadow-cyan-500/10 backdrop-blur">
                  <Music className="h-6 w-6 text-amber-400 dark:text-amber-400 light:text-cyan-600" />
              </div>
              <div>
                <p className="bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-200 dark:to-orange-200 light:from-cyan-600 light:to-blue-600 bg-clip-text font-semibold text-transparent">Acordeão Virtual</p>
                <p className="mt-0.5 text-xs text-muted-foreground">5 modelos disponíveis</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 dark:bg-amber-500/20 light:bg-cyan-500/20 backdrop-blur"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Volume2 className="h-4 w-4 text-amber-400 dark:text-amber-400 light:text-cyan-600" />
              </motion.div>
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 dark:bg-amber-500/20 light:bg-cyan-500/20 backdrop-blur"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              >
                <Waves className="h-4 w-4 text-amber-400 dark:text-amber-400 light:text-cyan-600" />
              </motion.div>
            </div>
          </div>
        </div>
        </div>
      </Link>
    </div>
  );
}

function InstrumentCard({ instrument }: { instrument: Instrument }) {
  return (
    <Card className="group relative h-full overflow-hidden border-amber-500/20 dark:border-amber-500/20 light:border-cyan-500/20 bg-gradient-to-br from-card via-card/95 to-amber-950/20 dark:to-amber-950/20 light:to-cyan-50/20 transition-all duration-500 hover:border-amber-500/40 dark:hover:border-amber-500/40 light:hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-amber-600/20 dark:hover:shadow-amber-600/20 light:hover:shadow-cyan-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-600/5 dark:from-amber-500/5 dark:to-orange-600/5 light:from-cyan-500/5 light:to-blue-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <CardContent className="relative p-0 flex flex-col h-full">
        <div className="relative h-52 overflow-hidden flex-shrink-0">
          <Image
            src={instrument.image}
            alt={instrument.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent dark:from-card light:from-card/60" />
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="font-display bg-gradient-to-r from-amber-200 via-orange-200 to-amber-300 dark:from-amber-200 dark:via-orange-200 dark:to-amber-300 light:from-cyan-600 light:via-blue-600 light:to-cyan-700 bg-clip-text text-xl tracking-tight text-transparent">{instrument.name}</h3>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground/90 flex-grow">{instrument.description}</p>
          
          <div className="mt-4 flex flex-wrap gap-1.5">
            {instrument.chips.map((chip) => (
              <span key={chip} className="rounded-full border border-amber-500/15 dark:border-amber-500/15 light:border-cyan-500/15 bg-amber-500/5 dark:bg-amber-500/5 light:bg-cyan-500/5 px-2 py-0.5 text-[10px] font-medium text-amber-300/70 dark:text-amber-300/70 light:text-cyan-600/70">
                {chip}
              </span>
            ))}
          </div>
          
          <div className="mt-5">
            {instrument.available ? (
              <Link href={`/${instrument.id}`}>
                <Button size="sm" className="w-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-500 dark:to-orange-500 light:from-cyan-500 light:to-blue-500 text-white font-medium hover:opacity-90 transition-opacity">
                  Acessar
                </Button>
              </Link>
            ) : (
              <Button size="sm" disabled className="w-full rounded-full bg-muted/50 text-muted-foreground cursor-not-allowed">
                Em desenvolvimento
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <div className="group text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400/70">{label}</p>
      <p className="font-display mt-3 bg-gradient-to-br from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-4xl tracking-tight text-transparent drop-shadow-sm">{value}</p>
      <p className="mt-2 text-xs font-medium text-muted-foreground/80">{description}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-amber-500/10 dark:border-amber-500/10 light:border-cyan-500/10 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12">
              <Image src="/logo_semfundo.png" alt="TABS" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-script text-2xl font-semibold text-amber-500 dark:text-amber-500 light:text-cyan-600 leading-none">Tabs</span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70 leading-none mt-0.5">Tecnologias de Aprendizagem Musical Baseadas em Som</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            <Link href="#instrumentos" className="text-sm font-medium text-muted-foreground transition-colors hover:text-amber-400 dark:hover:text-amber-400 light:hover:text-cyan-600">
              Instrumentos
            </Link>
            <Link href="#tecnologia" className="text-sm font-medium text-muted-foreground transition-colors hover:text-amber-400 dark:hover:text-amber-400 light:hover:text-cyan-600">
              Tecnologia
            </Link>
            <Link href="#roadmap" className="text-sm font-medium text-muted-foreground transition-colors hover:text-amber-400 dark:hover:text-amber-400 light:hover:text-cyan-600">
              Roadmap
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/acordeao">
              <Button size="sm" className="group hidden items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-500 dark:to-orange-600 light:from-cyan-500 light:to-blue-600 px-5 font-medium text-white shadow-lg shadow-amber-500/25 dark:shadow-amber-500/25 light:shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30 dark:hover:shadow-amber-500/30 light:hover:shadow-cyan-500/30 sm:flex">
                <span className="flex h-4 items-end gap-0.5">
                  <span className="w-1 animate-[equalize_0.8s_ease-in-out_infinite] rounded-full bg-white" style={{ height: '100%' }} />
                  <span className="w-1 animate-[equalize_0.6s_ease-in-out_infinite_0.2s] rounded-full bg-white" style={{ height: '60%' }} />
                  <span className="w-1 animate-[equalize_0.7s_ease-in-out_infinite_0.4s] rounded-full bg-white" style={{ height: '80%' }} />
                </span>
                Explorar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative min-h-[90vh] pt-14">
          <FloatingElements />
          
          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-script text-2xl text-amber-500 dark:text-amber-500 light:text-cyan-600">
                  Plataforma Musical Interativa
                </p>

                <h1 className="font-display mt-6 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.2] tracking-tight">
                  Aprenda e experimente <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 dark:from-amber-400 dark:via-orange-500 dark:to-amber-600 light:from-cyan-500 light:via-blue-500 light:to-cyan-600 bg-clip-text text-transparent">instrumentos musicais</span>
                </h1>

                <p className="mt-6 max-w-lg text-[16px] leading-[1.7] text-muted-foreground">
                  Plataforma central para ensino e experimentação musical interativa, com biblioteca completa de acordeões e demais instrumentos musicais virtuais, suporte a tablaturas interativas, interfaces responsivas e arquitetura modular.
                </p>

                <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                  <Link href="/acordeao">
                    <Button size="lg" className="group h-14 w-full items-center gap-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 dark:from-amber-500 dark:via-orange-500 dark:to-amber-600 light:from-cyan-500 light:via-blue-500 light:to-cyan-600 px-8 text-base font-semibold text-white shadow-xl shadow-amber-500/30 dark:shadow-amber-500/30 light:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/40 dark:hover:shadow-amber-500/40 light:hover:shadow-cyan-500/40 sm:w-auto">
                      <span className="flex h-6 items-end gap-0.5">
                        <span className="w-1 animate-[equalize_0.8s_ease-in-out_infinite] rounded-full bg-white" style={{ height: '100%' }} />
                        <span className="w-1 animate-[equalize_0.6s_ease-in-out_infinite_0.2s] rounded-full bg-white" style={{ height: '60%' }} />
                        <span className="w-1 animate-[equalize_0.7s_ease-in-out_infinite_0.4s] rounded-full bg-white" style={{ height: '80%' }} />
                        <span className="w-1 animate-[equalize_0.5s_ease-in-out_infinite_0.1s] rounded-full bg-white" style={{ height: '40%' }} />
                      </span>
                      Experimentar agora
                    </Button>
                  </Link>
                  <Link href="#tecnologia">
                    <Button size="lg" variant="outline" className="h-14 w-full rounded-full border-amber-500/30 bg-amber-500/5 text-amber-200 dark:border-amber-500/30 dark:bg-amber-500/5 dark:text-amber-200 light:border-cyan-500/30 light:bg-cyan-500/5 light:text-cyan-700 px-10 text-base font-medium transition-all duration-300 hover:border-amber-500/50 hover:bg-amber-500/10 dark:hover:border-amber-500/50 dark:hover:bg-amber-500/10 light:hover:border-cyan-500/50 light:hover:bg-cyan-500/10 sm:w-auto">
                      Ver tecnologia
                      <ArrowRight className="ml-2.5 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <HeroVisual />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Instruments */}
        <section id="instrumentos" className="relative border-t border-amber-500/10 dark:border-amber-500/10 light:border-cyan-500/10 py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/5 via-transparent to-amber-950/5 dark:from-amber-950/5 dark:to-amber-950/5 light:from-cyan-50/30 light:to-cyan-50/30" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-2xl text-amber-500 dark:text-amber-500 light:text-cyan-600">Biblioteca</p>
              <h2 className="font-display mt-5 bg-gradient-to-br from-foreground via-foreground to-amber-200/80 dark:to-amber-200/80 light:to-cyan-600/80 bg-clip-text text-[clamp(2rem,4vw,3rem)] tracking-tight text-transparent">
                Instrumentos com a mesma engenharia
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
                Todos os módulos compartilham o mesmo core de áudio, sistema de tabs e telemetria em tempo real.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {instruments.map((instrument) => (
                <InstrumentCard key={instrument.id} instrument={instrument} />
              ))}
            </div>
          </div>
        </section>

        {/* Technology */}
        <section id="tecnologia" className="relative border-t border-amber-500/10 dark:border-amber-500/10 light:border-cyan-500/10 bg-gradient-to-b from-amber-950/10 via-background to-amber-950/5 dark:from-amber-950/10 dark:to-amber-950/5 light:from-cyan-50/50 light:to-cyan-50/30 py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-2xl text-amber-500 dark:text-amber-500 light:text-cyan-600">Arquitetura</p>
              <h2 className="font-display mt-5 bg-gradient-to-br from-foreground via-foreground to-amber-200/80 dark:to-amber-200/80 light:to-cyan-600/80 bg-clip-text text-[clamp(2rem,4vw,3rem)] tracking-tight text-transparent">
                Construído para escalar
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
                Três camadas desacopladas: experiência, áudio/inputs e sincronização de tabs.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              <Card className="group relative overflow-hidden border-amber-500/20 dark:border-amber-500/20 light:border-cyan-500/20 bg-gradient-to-br from-card via-card/95 to-amber-950/20 dark:to-amber-950/20 light:to-cyan-50/20 transition-all duration-500 hover:border-amber-500/40 dark:hover:border-amber-500/40 light:hover:border-cyan-500/40 hover:shadow-xl hover:shadow-amber-600/10 dark:hover:shadow-amber-600/10 light:hover:shadow-cyan-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-600/5 dark:from-amber-500/5 dark:to-orange-600/5 light:from-cyan-500/5 light:to-blue-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <CardContent className="relative p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 dark:from-amber-500/20 dark:to-orange-600/20 light:from-cyan-500/20 light:to-blue-600/20 shadow-lg shadow-amber-500/10 dark:shadow-amber-500/10 light:shadow-cyan-500/10">
                    <Sparkles className="h-6 w-6 text-amber-400 dark:text-amber-400 light:text-cyan-600" />
                  </div>
                  <h3 className="mt-5 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-200 dark:to-orange-200 light:from-cyan-600 light:to-blue-600 bg-clip-text text-lg font-semibold text-transparent">Camada de Experiência</h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground/90">
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500/60 dark:bg-amber-500/60 light:bg-cyan-500/60" />Landing + dashboard com SSR</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500/60 dark:bg-amber-500/60 light:bg-cyan-500/60" />Tema claro/escuro dinâmico</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500/60 dark:bg-amber-500/60 light:bg-cyan-500/60" />Biblioteca e roadmap centralizados</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-amber-500/20 dark:border-amber-500/20 light:border-cyan-500/20 bg-gradient-to-br from-card via-card/95 to-amber-950/20 dark:to-amber-950/20 light:to-cyan-50/20 transition-all duration-500 hover:border-amber-500/40 dark:hover:border-amber-500/40 light:hover:border-cyan-500/40 hover:shadow-xl hover:shadow-amber-600/10 dark:hover:shadow-amber-600/10 light:hover:shadow-cyan-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-600/5 dark:from-amber-500/5 dark:to-orange-600/5 light:from-cyan-500/5 light:to-blue-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <CardContent className="relative p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 dark:from-amber-500/20 dark:to-orange-600/20 light:from-cyan-500/20 light:to-blue-600/20 shadow-lg shadow-amber-500/10 dark:shadow-amber-500/10 light:shadow-cyan-500/10">
                    <Zap className="h-6 w-6 text-amber-400 dark:text-amber-400 light:text-cyan-600" />
                  </div>
                  <h3 className="mt-5 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-200 dark:to-orange-200 light:from-cyan-600 light:to-blue-600 bg-clip-text text-lg font-semibold text-transparent">Engine de Áudio</h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground/90">
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500/60 dark:bg-amber-500/60 light:bg-cyan-500/60" />Web Audio com workers dedicados</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500/60 dark:bg-amber-500/60 light:bg-cyan-500/60" />Mapeamento teclado, mouse, touch, MIDI</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500/60 dark:bg-amber-500/60 light:bg-cyan-500/60" />Automação push/pull e efeitos</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-amber-500/20 dark:border-amber-500/20 light:border-cyan-500/20 bg-gradient-to-br from-card via-card/95 to-amber-950/20 dark:to-amber-950/20 light:to-cyan-50/20 transition-all duration-500 hover:border-amber-500/40 dark:hover:border-amber-500/40 light:hover:border-cyan-500/40 hover:shadow-xl hover:shadow-amber-600/10 dark:hover:shadow-amber-600/10 light:hover:shadow-cyan-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-600/5 dark:from-amber-500/5 dark:to-orange-600/5 light:from-cyan-500/5 light:to-blue-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <CardContent className="relative p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 dark:from-amber-500/20 dark:to-orange-600/20 light:from-cyan-500/20 light:to-blue-600/20 shadow-lg shadow-amber-500/10 dark:shadow-amber-500/10 light:shadow-cyan-500/10">
                    <BookOpen className="h-6 w-6 text-amber-400 dark:text-amber-400 light:text-cyan-600" />
                  </div>
                  <h3 className="mt-5 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-200 dark:to-orange-200 light:from-cyan-600 light:to-blue-600 bg-clip-text text-lg font-semibold text-transparent">Tabs e Telemetria</h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground/90">
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500/60 dark:bg-amber-500/60 light:bg-cyan-500/60" />Renderer nota a nota sincronizado</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500/60 dark:bg-amber-500/60 light:bg-cyan-500/60" />Analytics de precisão e dinâmica</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500/60 dark:bg-amber-500/60 light:bg-cyan-500/60" />Preparado para modo gamificado</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap" className="border-t border-amber-500/10 dark:border-amber-500/10 light:border-cyan-500/10 py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-2xl text-amber-500 dark:text-amber-500 light:text-cyan-600">Roadmap</p>
              <h2 className="font-display mt-5 bg-gradient-to-br from-foreground via-foreground to-amber-200/80 dark:to-amber-200/80 light:to-cyan-600/80 bg-clip-text text-[clamp(2rem,4vw,3rem)] tracking-tight text-transparent">
                O que vem por aí
              </h2>
            </div>

            <div className="mx-auto mt-14 max-w-3xl">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 dark:from-amber-500 dark:to-orange-600 light:from-cyan-500 light:to-blue-600 text-sm font-bold text-white shadow-lg shadow-amber-500/30 dark:shadow-amber-500/30 light:shadow-cyan-500/30">v1</div>
                    <div className="mt-2 h-full w-px bg-gradient-to-b from-amber-500/50 to-amber-500/10 dark:from-amber-500/50 dark:to-amber-500/10 light:from-cyan-500/50 light:to-cyan-500/10" />
                  </div>
                  <div className="pb-8">
                    <p className="bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-200 dark:to-orange-200 light:from-cyan-600 light:to-blue-600 bg-clip-text font-semibold text-transparent">Núcleo TABS</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Landing responsiva, acordeões completos, motor Web Audio e tabs em tempo real.</p>
                    <Badge className="mt-3 border-amber-500/30 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 dark:border-amber-500/30 dark:from-amber-500/20 dark:to-orange-500/20 dark:text-amber-300 light:border-cyan-500/30 light:from-cyan-500/20 light:to-blue-500/20 light:text-cyan-600">Disponível</Badge>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-500/40 bg-amber-500/10 dark:border-amber-500/40 dark:bg-amber-500/10 light:border-cyan-500/40 light:bg-cyan-500/10 text-sm font-bold text-amber-400 dark:text-amber-400 light:text-cyan-600">v2</div>
                    <div className="mt-2 h-full w-px bg-gradient-to-b from-amber-500/30 to-amber-500/5 dark:from-amber-500/30 dark:to-amber-500/5 light:from-cyan-500/30 light:to-cyan-500/5" />
                  </div>
                  <div className="pb-8">
                    <p className="font-semibold text-foreground/90">Cordas & Tabs</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Violão e guitarra com tablaturas sincronizadas, técnicas de palhetada e timeline educacional.</p>
                    <Badge variant="secondary" className="mt-3 border-amber-500/20 bg-amber-950/50 text-amber-300/80 dark:border-amber-500/20 dark:bg-amber-950/50 dark:text-amber-300/80 light:border-cyan-500/20 light:bg-cyan-50 light:text-cyan-600/80">Em desenvolvimento</Badge>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-muted-foreground/20 bg-muted/30 text-sm font-medium text-muted-foreground">v3</div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground/80">Modo Performático + MIDI</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Timeline sincronizada com playback, métricas de precisão, feedback em tempo real e suporte completo a controladores MIDI.</p>
                    <Badge variant="outline" className="mt-3 border-muted-foreground/20 text-muted-foreground">Planejado</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative border-t border-amber-500/10 dark:border-amber-500/10 light:border-cyan-500/10 py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/10 via-background to-transparent dark:from-amber-950/10 light:from-cyan-50/50" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display bg-gradient-to-br from-foreground via-foreground to-amber-200/80 dark:to-amber-200/80 light:to-cyan-600/80 bg-clip-text text-[clamp(2rem,4vw,3rem)] tracking-tight text-transparent">
                Pronto para começar?
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
                Abra o acordeão virtual e experimente a qualidade do som.
              </p>
              <Link href="/acordeao">
                <Button size="lg" className="group mt-10 h-14 items-center gap-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 dark:from-amber-500 dark:via-orange-500 dark:to-amber-600 light:from-cyan-500 light:via-blue-500 light:to-cyan-600 px-10 text-base font-semibold text-white shadow-xl shadow-amber-500/30 dark:shadow-amber-500/30 light:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/40 dark:hover:shadow-amber-500/40 light:hover:shadow-cyan-500/40">
                  <span className="flex h-6 items-end gap-0.5">
                    <span className="w-1 animate-[equalize_0.8s_ease-in-out_infinite] rounded-full bg-white" style={{ height: '100%' }} />
                    <span className="w-1 animate-[equalize_0.6s_ease-in-out_infinite_0.2s] rounded-full bg-white" style={{ height: '60%' }} />
                    <span className="w-1 animate-[equalize_0.7s_ease-in-out_infinite_0.4s] rounded-full bg-white" style={{ height: '80%' }} />
                    <span className="w-1 animate-[equalize_0.5s_ease-in-out_infinite_0.1s] rounded-full bg-white" style={{ height: '40%' }} />
                  </span>
                  Acessar instrumento
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-500/10 dark:border-amber-500/10 light:border-cyan-500/10 bg-gradient-to-b from-background to-amber-950/10 dark:to-amber-950/10 light:to-cyan-50/30 py-12">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12">
              <Image src="/logo_semfundo.png" alt="TABS" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-script text-2xl font-semibold text-amber-500 dark:text-amber-500 light:text-cyan-600 leading-none">Tabs</span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70 leading-none mt-0.5">Tecnologias de Aprendizagem Musical Baseadas em Som</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">© 2025 Tabs · Instrumentos Musicais Virtuais</p>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Badge variant="secondary" className="border-amber-500/20 bg-amber-950/50 text-amber-300/80 dark:border-amber-500/20 dark:bg-amber-950/50 dark:text-amber-300/80 light:border-cyan-500/20 light:bg-cyan-50 light:text-cyan-600/80">🇧🇷 Brasil</Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
