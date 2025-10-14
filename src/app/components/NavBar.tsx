// src/app/components/NavBar.tsx (Final Code with next-themes)
"use client";
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, Heart, Home, Moon, Sun } from 'lucide-react';

// FIX: Import the hook from next-themes
import { useTheme } from 'next-themes'; 

// --- Theme Toggle Component (Rewritten using useTheme hook) ---
const ThemeToggle = () => {
  // Get the current theme state and the setter function
  const { theme, setTheme } = useTheme(); 

  // Render Moon if current theme is light (click to go dark) or Sun if dark (click to go light)
  const toggleIcon = theme === 'dark' ? (
    <Sun className="w-5 h-5 text-yellow-300" />
  ) : (
    <Moon className="w-5 h-5 text-gray-300" />
  );

  // Determine the next theme based on the current state
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  // We rely on useTheme to handle persistence and state.
  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className="p-2 rounded-full text-white bg-gray-700 hover:bg-gray-600 dark:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
      aria-label={`Toggle theme to ${nextTheme}`}
    >
      {toggleIcon}
    </button>
  );
};
// ------------------------------

export default function NavBar() {
  const { status } = useSession();
  // NOTE: useTheme is automatically available to all client components

  // Only show the NavBar if the user is authenticated
  if (status !== 'authenticated') {
    return null;
  }

  return (
    <nav className="bg-gray-800 dark:bg-zinc-900 p-4 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Title */}
        <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
          🎬 Explorer
        </Link>

        <div className="flex space-x-6 items-center">

          {/* Theme Toggle Button */}
          <ThemeToggle /> {/* Now uses the next-themes hook */}

          {/* Home Link (remains the same) */}
          <Link 
            href="/" 
            className="flex items-center text-gray-200 hover:text-blue-400 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            <Home className="w-5 h-5 mr-1" />
            Browse
          </Link>

          {/* Favorites Link (remains the same) */}
          <Link 
            href="/favorites" 
            className="flex items-center text-gray-200 hover:text-red-400 dark:text-gray-300 dark:hover:text-red-400 transition-colors"
          >
            <Heart className="w-5 h-5 mr-1" />
            Favorites
          </Link>

          {/* Logout Button (remains the same) */}
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