// src/app/movie/[id]/page.tsx

import { fetchMovieDetails, Movie } from '@/lib/tmdb';
import { notFound } from 'next/navigation';

// Import necessary Client Components
import FavoriteButton from '../../components/FavoriteButton'; 
import MovieDetailSkeleton from '../../components/MovieDetailSkeleton'; 
import DetailImage from '../../components/DetailImage'; // <-- IMPORTED SAFE COMPONENT

// Type for the dynamic route segment
interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

// Next.js 14 Server Component
export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movieId = params.id;
  
  const movie: Movie | null = await fetchMovieDetails(movieId);

  if (!movie) {
    notFound(); 
  }
  
  // Use a MovieDetailSkeleton if data is incomplete
  if (!movie.poster_path || !movie.title) {
      return <MovieDetailSkeleton />;
  }
  
  const formattedRating = movie.vote_average.toFixed(1);

  return (
    // Final Dark Mode Container Fix
    <div className="p-8 md:p-12 bg-white dark:bg-gray-900 min-h-screen text-black dark:text-gray-100">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        
        {/* Poster Image Section */}
        <div className="flex-shrink-0 w-full md:w-1/3 max-w-sm mx-auto md:mx-0">
          
          {/* FIX: Use the safe client component to render the image */}
          <DetailImage
            src={movie.poster_path}
            alt={movie.title}
          />
          
        </div>
        
        {/* Details Section */}
        <div className="flex-grow">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">{movie.title}</h1>
          
          {/* Rating and Release Date */}
          <div className="flex items-center space-x-6 mb-6">
            <p className="text-3xl text-yellow-500 font-bold">
              ★ {formattedRating}/10
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Released: {movie.release_date}
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-3 border-b border-gray-300 dark:border-gray-700 pb-1">
            Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-8 text-lg">
            {movie.overview}
          </p>
          
          {/* Favorite Button */}
          <div className="mt-8">
            <FavoriteButton 
              movie={{
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path, 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}