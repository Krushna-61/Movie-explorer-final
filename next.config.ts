// next.config.ts

import type { NextConfig } from 'next';

// next.config.ts (Partial Update)

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com', 
      },
      // FIX: Replace via.placeholder.com with placehold.co
      {
        protocol: 'https',
        hostname: 'placehold.co', // <-- NEW, UNBLOCKED DOMAIN
      },
    ],
  },
  // ... other config ...
};

export default nextConfig;