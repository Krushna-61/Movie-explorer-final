// src/app/components/MovieListing.tsx
"use client";
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchMovies, Movie } from '@/lib/tmdb'; 
import { Search, ChevronDown } from 'lucide-react';

// Define the external URL for the fallback image (must be whitelisted in next.config.ts)
const FALLBACK_IMAGE_URL = 'https://via.placeholder.com/500x750?text=Poster+Unavailable';

// --- Dependency 1: MovieCard Component ---
const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => (
  <Link href={`/movie/${movie.id}`} key={movie.id}>
    {/* Final: Card background/text for Dark Mode */}
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer h-full flex flex-col">
      
      {/* Next.js Image Optimization */}
      <div className="relative aspect-[2/3] w-full">
        {movie.poster_path ? (
          <Image
            src={movie.poster_path}
            alt={movie.title}
            fill 
            sizes="(max-width: 600px) 100vw, 300px"
            className="object-cover"
            priority={false}
            onError={(e) => {
              // On error (like 404), switch to the public placeholder URL
              e.currentTarget.srcset = ''; 
              e.currentTarget.src = FALLBACK_IMAGE_URL; 
              e.currentTarget.onerror = null; 
            }}
          />
        ) : (
          // Placeholder div if poster_path is null initially
          <div className="flex items-center justify-center w-full h-full bg-gray-300 dark:bg-zinc-700">
            <p className="text-gray-600 dark:text-gray-400 text-sm p-4 text-center">No Poster</p>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col justify-between flex-grow">
        <h3 className="text-black dark:text-gray-100 text-md font-semibold line-clamp-2" title={movie.title}>
          {movie.title}
        </h3>
        <p className="text-yellow-500 text-sm mt-1">
          ★ {movie.vote_average.toFixed(1)}/10
        </p>
      </div>
    </div>
  </Link>
);

// --- Dependency 2: Loading Skeletons ---
const renderSkeletons = (count: number = 12) => (
  [...Array(count)].map((_, i) => (
    <div key={i} className="bg-gray-200 dark:bg-zinc-800 rounded-lg shadow-lg h-96 w-full animate-pulse">
      <div className="relative aspect-[2/3] bg-gray-300 dark:bg-zinc-700 rounded-t-lg"></div>
      <div className="p-3">
        <div className="h-4 bg-gray-400 dark:bg-zinc-600 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-400 dark:bg-zinc-600 rounded w-1/4"></div>
      </div>
    </div>
  ))
);

// --- Main Component ---
export default function MovieListing() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // PAGINATION STATE
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // FIX 1: Make loadMovies stable by giving it an empty dependency array
  // and using functional setStates to prevent unnecessary re-renders.
  const loadMovies = useCallback(async (query: string, pageNum: number, append: boolean = false) => {
    // Only show loading indicator if we are replacing the list or fetching a new page
    if (movies.length === 0 || !append) setIsLoading(true);
    
    const data = await fetchMovies(query || undefined, pageNum);
    
    if (data.length === 0) {
        setHasMore(false);
    }
    
    // Use functional update to append new data without depending on 'movies' in useCallback
    setMovies(prevMovies => append && pageNum > 1 ? [...prevMovies, ...data] : data);
    setIsLoading(false);
  }, []); // <-- EMPTY DEPENDENCY ARRAY ensures stability


  // FIX 2: Correct initial load/search effect
  useEffect(() => {
    // This effect runs on mount and when searchQuery changes (due to the debounce logic)
    const handler = setTimeout(() => {
        setPage(1); // Always reset to page 1 on a new search
        setHasMore(true); 
        // Pass the latest searchQuery and page 1. Do not append.
        loadMovies(searchQuery, 1, false); 
    }, 500); 

    return () => clearTimeout(handler);
  }, [searchQuery, loadMovies]); // Trigger only when searchQuery or loadMovies changes

  // Handler for the "Load More" button
  const handleLoadMore = () => {
      const nextPage = page + 1;
      setPage(nextPage);
      // Load the next page and explicitly append
      loadMovies(searchQuery, nextPage, true);
  };
  
  if (isLoading && movies.length === 0) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-4">
            {renderSkeletons()}
        </div>
    );
  }

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="relative w-full mb-10">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-gray-500 transition duration-150"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
      </div>


      {movies.length === 0 && !isLoading ? (
        <p className="text-xl text-center text-gray-500 dark:text-gray-400 mt-10">
          No movies found for "{searchQuery}". Try a different search!
        </p>
      ) : (
        <>
            {/* Movie Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} /> 
              ))}
              {/* Show skeletons for the data currently being fetched */}
              {isLoading && movies.length > 0 && renderSkeletons(6)}
            </div>
            
            {/* Load More Button (Pagination/Infinite Scrolling Requirement) */}
            {hasMore && searchQuery.length === 0 && (
                <div className="text-center mt-10">
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="flex items-center justify-center mx-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Loading...' : (
                            <>
                                Load More <ChevronDown className="w-5 h-5 ml-2" />
                            </>
                        )}
                    </button>
                </div>
            )}
            
            {/* Show message when all data has been loaded */}
            {!hasMore && searchQuery.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
                    You've reached the end of the popular movie list!
                </p>
            )}
        </>
      )}
    </div>
  );
}

