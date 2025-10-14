// src/app/layout.tsx (Final Code with RESTORED Fonts)

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // <-- FONT IMPORTS MUST BE HERE
import "./globals.css";

// 1. Import the SessionProvider and NavBar
import SessionProvider from "./components/SessionProvider"; 
import NavBar from "./components/NavBar";
import ThemeProvider from "./components/ThemeProvider"; 

// --- RESTORE THESE FONT DEFINITIONS ---
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// -------------------------------------

export const metadata: Metadata = {
// ... metadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body
        // This line now correctly accesses the font variables
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-gray-900`}
      >
        <ThemeProvider> 
          <SessionProvider>
            <NavBar /> 
            <main>
              {children}
            </main>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}