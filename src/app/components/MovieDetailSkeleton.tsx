// src/app/components/MovieDetailSkeleton.tsx

// This is a client component only if it uses client hooks, but a simple skeleton can be a Server Component

export default function MovieDetailSkeleton() {
  return (
    <div className="p-8 md:p-12 bg-gray-900 min-h-screen text-white animate-pulse">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        
        {/* Poster Skeleton */}
        <div className="flex-shrink-0 w-full md:w-1/3 max-w-sm mx-auto md:mx-0 h-[450px] bg-gray-800 rounded-xl shadow-2xl">
          {/* Placeholder */}
        </div>
        
        {/* Details Skeleton */}
        <div className="flex-grow">
          {/* Title Line */}
          <div className="h-10 w-3/4 bg-gray-700 rounded mb-6"></div>
          {/* Rating/Release Date Line */}
          <div className="flex items-center space-x-6 mb-6">
            <div className="h-6 w-1/4 bg-gray-700 rounded"></div>
            <div className="h-6 w-1/3 bg-gray-700 rounded"></div>
          </div>

          {/* Overview Header */}
          <div className="h-6 w-1/5 bg-gray-700 rounded mb-3"></div>
          {/* Overview Text Blocks */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-800 rounded w-11/12"></div>
            <div className="h-4 bg-gray-800 rounded w-5/6"></div>
          </div>
          
          {/* Button Skeleton */}
          <div className="mt-8 h-12 w-64 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}