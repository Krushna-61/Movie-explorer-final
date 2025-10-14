// src/app/components/ThemeProvider.tsx
'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function ThemeProvider({ children }: Props) {
  // Use 'attribute="class"' to integrate with your existing Tailwind CSS 'dark:' classes
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}