// src/app/favorites/page.tsx
"use client";
import { useFavorites } from '@/hooks/useFavorites';
import Link from 'next/link';
import Image from 'next/image';

export default function FavoritesPage() {
  const { favorites, isInitialized } = useFavorites();

  return (
    // Apply dark mode background class
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen text-black dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-8 border-b border-gray-700 dark:border-zinc-700 pb-4">My Favorites</h1>
      
      {!isInitialized ? (
        <p className="text-gray-500">Loading favorites...</p>
      ) : favorites.length === 0 ? (
        <p className="text-xl text-gray-500 mt-10 text-center">
            You haven&apos;t added any favorite movies yet!
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {favorites.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              {/* Card structure reused from MovieListing */}
              <div className="bg-gray-800 dark:bg-zinc-800 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer h-full flex flex-col">
                <div className="relative aspect-[2/3] w-full">
                    <Image
                      src={movie.poster_path || '/placeholder.png'}
                      alt={movie.title}
                      fill
                      sizes="(max-width: 600px) 100vw, 300px"
                      className="object-cover"
                    />
                </div>
                <div className="p-3">
                  <h3 className="text-white dark:text-gray-100 text-md font-semibold line-clamp-2">{movie.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}