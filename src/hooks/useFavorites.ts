// src/hooks/useFavorites.ts
"use client";
import { useState, useEffect, useCallback } from 'react';

// Simplified type for what we need to store for a favorite movie
export type FavoriteMovie = { 
    id: string; // <-- CORRECTLY SET TO string
    title: string; 
    poster_path: string | null; 
};

const STORAGE_KEY = 'movieExplorerFavorites';

// Make sure 'export' is here
export const useFavorites = () => {
    // === STATE DEFINITIONS ===
    const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
    const [isInitialized, setIsInitialized] = useState(false); 
    // ========================

    // 1. Initialize state from localStorage on component mount (client-side only)
    useEffect(() => {
      try {
          const storedFavorites = localStorage.getItem(STORAGE_KEY);
          if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
          }
      } catch (error) {
          console.error("Error reading localStorage:", error);
      } finally {
          setIsInitialized(true);
      }
    }, []);

    // 2. Persist state to localStorage whenever 'favorites' changes
    useEffect(() => {
      if (isInitialized) {
          try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
          } catch (error) {
              console.error("Error writing to localStorage:", error);
          }
      }
    }, [favorites, isInitialized]);

    // === CORRECTED DERIVED FUNCTIONS ===
    // FIX: Change movieId type from number to string
    const isFavorite = useCallback((movieId: string): boolean => { 
      // All IDs are now strings, so comparison is correct
      return favorites.some(movie => movie.id === movieId);
    }, [favorites]);

    const toggleFavorite = useCallback((movie: FavoriteMovie) => {
      // movie.id is correctly passed as a string to isFavorite
      if (isFavorite(movie.id)) {
        // Remove movie
        setFavorites(prev => prev.filter(m => m.id !== movie.id));
      } else {
        // Add movie
        setFavorites(prev => [...prev, movie]);
      }
    }, [isFavorite]);
    // ======================================

    // Return the variables that are now correctly defined in scope
    return { favorites, isFavorite, toggleFavorite, isInitialized };
};