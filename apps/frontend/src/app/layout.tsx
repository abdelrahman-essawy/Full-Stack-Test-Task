import { AuroraBackground } from '../ui/aurora-background';
import { AnimatePresence } from 'motion/react';
import { Navbar } from '../components/header';
import { ReactNode } from 'react';

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <AuroraBackground>
        <Navbar />
        {children}
      </AuroraBackground>
    </AnimatePresence>
  );
}
