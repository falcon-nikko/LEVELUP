'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CommandPalette } from '@/components/CommandPalette';

interface ShortcutCtx {
  openPalette: () => void;
}

const Ctx = createContext<ShortcutCtx>({ openPalette: () => {} });

export function GlobalShortcuts({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <Ctx.Provider value={{ openPalette: () => setOpen(true) }}>
      {children}
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </Ctx.Provider>
  );
}

export function useCommandPalette() {
  return useContext(Ctx);
}
