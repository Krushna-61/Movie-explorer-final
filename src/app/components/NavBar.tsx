// src/app/components/NavBar.tsx
"use client";
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, Heart, Home, Moon, Sun } from 'lucide-react'; // Added Moon and Sun
import { useState, useEffect } from 'react';

// --- Theme Toggle Component ---
const ThemeToggle = () => {
  // Initialize theme state: Set to 'dark' if localStorage/system prefers it, otherwise 'light'
  const [theme, setTheme] = useState('light');

  // 1. Initialize theme from system/localStorage on mount
  useEffect(() => {
    // Check localStorage first, then system preference
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  // 2. Apply and Persist theme whenever 'theme' state changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
    // Remove 'theme' from local storage if it's the default system preference
    // (Optional, but helps future-proof against system changes)
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-white bg-gray-700 hover:bg-gray-600 dark:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {/* Display Sun icon for light mode (click to go dark) or Moon icon for dark mode */}
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-300" />
      ) : (
        <Moon className="w-5 h-5 text-gray-300" />
      )}
    </button>
  );
};
// ------------------------------

export default function NavBar() {
  const { status } = useSession();

  // Only show the NavBar if the user is authenticated
  if (status !== 'authenticated') {
    return null;
  }

  return (
    // Updated for dark mode: Nav bar background changes in dark mode
    <nav className="bg-gray-800 dark:bg-zinc-900 p-4 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Title */}
        <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
          🎬 Explorer
        </Link>
        
        <div className="flex space-x-6 items-center">
          
          {/* Theme Toggle Button */}
          <ThemeToggle /> 

          {/* Home Link */}
          <Link 
            href="/" 
            className="flex items-center text-gray-200 hover:text-blue-400 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            <Home className="w-5 h-5 mr-1" />
            Browse
          </Link>

          {/* Favorites Link */}
          <Link 
            href="/favorites" 
            className="flex items-center text-gray-200 hover:text-red-400 dark:text-gray-300 dark:hover:text-red-400 transition-colors"
          >
            <Heart className="w-5 h-5 mr-1" />
            Favorites
          </Link>

          {/* Logout Button */}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-1" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}