'use client';

import { useEffect, useCallback, useRef } from 'react';

interface KeyHandlers {
  onKeyDown: (key: string) => void;
  onKeyUp: (key: string) => void;
}

export function useKeyboard({ onKeyDown, onKeyUp }: KeyHandlers) {
  const pressedKeys = useRef<Set<string>>(new Set());

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Ignora se estiver digitando em um input
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return;
    }

    const key = event.key.toLowerCase();
    
    // Evita repetição de tecla
    if (pressedKeys.current.has(key)) {
      return;
    }

    pressedKeys.current.add(key);
    onKeyDown(key);
  }, [onKeyDown]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    
    if (pressedKeys.current.has(key)) {
      pressedKeys.current.delete(key);
      onKeyUp(key);
    }
  }, [onKeyUp]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return {
    pressedKeys: pressedKeys.current,
    isPressed: (key: string) => pressedKeys.current.has(key),
  };
}
