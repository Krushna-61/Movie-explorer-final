// src/app/components/DetailImage.tsx
"use client";
import Image from 'next/image';

// Define the external URL for the fallback image (must be whitelisted in next.config.ts)
const FALLBACK_IMAGE_URL = 'https://via.placeholder.com/500x750?text=Poster+Unavailable';

interface DetailImageProps {
  src: string;
  alt: string;
}

// Client Component to safely host the onError handler
export default function DetailImage({ src, alt }: DetailImageProps) {

  // The client-side function to handle image loading failures
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.srcset = '';
    e.currentTarget.src = FALLBACK_IMAGE_URL; 
    e.currentTarget.onerror = null; 
  };
  
  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={750}
      // Ensure the image styling is retained
      className="rounded-xl shadow-2xl w-full h-auto object-cover"
      priority 
      onError={handleError} // This event handler is now safe on the client side
    />
  );
}