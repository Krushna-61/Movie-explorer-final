// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Import the SessionProvider and NavBar
import SessionProvider from "./components/SessionProvider"; 
import NavBar from "./components/NavBar"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Update the title for your app
  title: "Movie Explorer App",
  description: "A Next.js 14 Movie Explorer built with TMDB, NextAuth, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // FINAL FIX: Apply dual background color class to the body.
        // This ensures the background covers the entire viewport and switches with the theme.
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-gray-900`}
      >
        <SessionProvider>
          <NavBar /> 
          
          <main>
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}