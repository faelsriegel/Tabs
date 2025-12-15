'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from '@/components/ThemeProvider';
import { Music, ChevronLeft, Sun, Moon, Info, Keyboard } from 'lucide-react';
import Accordion from '@/components/instruments/Accordion';
import { accordionConfigs, getAccordionConfig, accordionCategories } from '@/config/accordion';

function AccordionPageContent() {
  const searchParams = useSearchParams();
  const tipoParam = searchParams.get('tipo');
  const { theme, toggleTheme } = useTheme();
  
  const [selectedAccordion, setSelectedAccordion] = useState(tipoParam || 'verdulera');
  const [showInfo, setShowInfo] = useState(false);

  const config = getAccordionConfig(selectedAccordion) || accordionConfigs[0];

  // Update selected accordion when URL param changes
  useEffect(() => {
    if (tipoParam && getAccordionConfig(tipoParam)) {
      setSelectedAccordion(tipoParam);
    }
  }, [tipoParam]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Responsivo */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-amber-500/10 dark:border-amber-500/10 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-2 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-amber-500/10 dark:hover:bg-amber-500/10 h-8 w-8 sm:h-10 sm:w-10">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <div className="relative h-8 w-8 sm:h-12 sm:w-12">
                <Image src="/logo_semfundo.png" alt="TABS" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-script text-lg sm:text-2xl font-semibold text-amber-500 dark:text-amber-500 leading-none">Tabs</span>
                <span className="hidden sm:block text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70 leading-none mt-0.5">Tecnologias de Aprendizagem Musical Baseadas em Som</span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Accordion Type Selector */}
            <Select value={selectedAccordion} onValueChange={setSelectedAccordion}>
              <SelectTrigger className="w-[100px] sm:w-[180px] border-amber-500/20 dark:border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/5 h-8 sm:h-10 text-xs sm:text-sm">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <div className="px-2 py-1.5 text-xs font-semibold text-amber-500/70 dark:text-amber-500/70">
                  Clássicos
                </div>
                {accordionCategories.classicos.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id}>
                    <span>{acc.name}</span>
                  </SelectItem>
                ))}
                <div className="px-2 py-1.5 text-xs font-semibold text-amber-500/70 dark:text-amber-500/70 border-t mt-1 pt-2">
                  Regionais
                </div>
                {accordionCategories.paises.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id}>
                    <span>{acc.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowInfo(!showInfo)}
              className="rounded-full hover:bg-amber-500/10 dark:hover:bg-amber-500/10 h-8 w-8 sm:h-10 sm:w-10"
            >
              <Info className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400/70 dark:text-amber-400/70" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-amber-500/10 dark:hover:bg-amber-500/10 h-8 w-8 sm:h-10 sm:w-10"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto pt-16 sm:pt-24 pb-4 sm:pb-8 px-2 sm:px-4">
        {/* Accordion Info */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 sm:mb-8"
        >
          <h2 className="font-script text-2xl sm:text-3xl md:text-4xl text-amber-500 dark:text-amber-500 mb-1 sm:mb-2">{config.name}</h2>
          <p className="text-sm sm:text-base text-muted-foreground px-2">{config.description}</p>
        </motion.div>

        {/* Info Panel */}
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <Card className="max-w-2xl mx-auto border-amber-500/20 dark:border-amber-500/20 bg-gradient-to-br from-card via-card/95 to-amber-950/10 dark:to-amber-950/10">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 dark:bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Keyboard className="w-5 h-5 text-amber-500 dark:text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-amber-400/90 dark:text-amber-400/90">Controles do Teclado</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <kbd className="px-1.5 py-0.5 bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/20 dark:border-amber-500/20 rounded text-xs font-mono">Espaço</kbd> - Alternar direção do fole (abrir/fechar)</li>
                      <li>• <kbd className="px-1.5 py-0.5 bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/20 dark:border-amber-500/20 rounded text-xs font-mono">1-0</kbd> - Primeira fileira de botões</li>
                      <li>• <kbd className="px-1.5 py-0.5 bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/20 dark:border-amber-500/20 rounded text-xs font-mono">Q-P</kbd> - Segunda fileira de botões</li>
                      <li>• <kbd className="px-1.5 py-0.5 bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/20 dark:border-amber-500/20 rounded text-xs font-mono">A-L</kbd> - Terceira fileira de botões</li>
                      <li>• <kbd className="px-1.5 py-0.5 bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/20 dark:border-amber-500/20 rounded text-xs font-mono">Z-M</kbd> - Baixos e acordes</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-4">
                      As notas mudam dependendo se o fole está abrindo ou fechando, 
                      simulando o comportamento real de um acordeão diatônico.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Accordion Simulator */}
        <Accordion config={config} />

        {/* Quick Select Grid */}
        <div className="mt-6 sm:mt-12 max-w-4xl mx-auto">
          <h3 className="font-script text-xl sm:text-2xl text-amber-500 dark:text-amber-500 mb-3 sm:mb-4 text-center">Outros Acordeões</h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2">
            {accordionConfigs.map((acc) => (
              <button
                key={acc.id}
                onClick={() => setSelectedAccordion(acc.id)}
                className={`
                  p-2 sm:p-3 rounded-lg text-center transition-all
                  ${selectedAccordion === acc.id 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-500 dark:to-orange-500 text-white shadow-lg shadow-amber-500/25 scale-105' 
                    : 'bg-amber-500/5 dark:bg-amber-500/5 border border-amber-500/20 dark:border-amber-500/20 hover:bg-amber-500/10 hover:scale-102'
                  }
                `}
              >
                <div className="text-[9px] sm:text-[11px] font-medium truncate px-1">
                  {acc.name.split(' ')[0]}
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer - Responsivo */}
      <footer className="border-t border-amber-500/10 dark:border-amber-500/10 bg-gradient-to-b from-background to-amber-950/10 dark:to-amber-950/10 py-6 sm:py-12 mt-6 sm:mt-12">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:gap-6 px-4 md:flex-row">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative h-8 w-8 sm:h-12 sm:w-12">
              <Image src="/logo_semfundo.png" alt="TABS" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-script text-lg sm:text-2xl font-semibold text-amber-500 dark:text-amber-500 leading-none">Tabs</span>
              <span className="hidden sm:block text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70 leading-none mt-0.5">Tecnologias de Aprendizagem Musical Baseadas em Som</span>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            Desenvolvido por{' '}
            <a 
              href="https://www.srcompanytechsolutions.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-500 dark:text-amber-500 light:text-orange-500 hover:underline font-medium"
            >
              SRC Ltda
            </a>
            {' '}· Inspirado no{' '}
            <a 
              href="https://acordeonvirtual.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 dark:text-amber-400 light:text-orange-400 hover:underline"
            >
              Acordeão Virtual
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function AccordionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4 animate-pulse">
            <Image src="/logo_semfundo.png" alt="TABS" fill className="object-contain" />
          </div>
          <p className="font-bold">Tabs</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Carregando acordeão...</p>
        </div>
      </div>
    }>
      <AccordionPageContent />
    </Suspense>
  );
}
