// src/app/page.tsx

"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MovieListing from './components/MovieListing'; 

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login'); 
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-xl">
        Checking Authentication...
      </div>
    );
  }

  return (
    // Outer container: Fills screen, handles the background color switch
    <div className="min-h-screen bg-white dark:bg-gray-900">
        
        {/* FIX: Inner container adds Max-Width, Centers content, and applies Padding */}
        <div className="max-w-7xl mx-auto p-8 text-black dark:text-gray-100">
            <h1 className="text-4xl font-bold mb-4">
                Welcome, {session?.user?.name || 'Explorer'}!
            </h1>
            <MovieListing /> 
        </div>
        
    </div>
  );
}