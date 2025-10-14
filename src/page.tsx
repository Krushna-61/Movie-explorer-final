// src/app/page.tsx

"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// === ADD THIS LINE ===
import MovieListing from '@/app/components/MovieListing'; // Assuming this is the correct relative path to your component
// =====================

export default function HomePage() {
  // ... rest of the component code
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      {/* ... header code ... */}
      
      <MovieListing /> {/* Now TypeScript knows what MovieListing is */}
      
    </div>
  );
}