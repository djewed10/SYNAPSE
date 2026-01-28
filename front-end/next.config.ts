import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow access from any host (for mobile testing via IP)
  allowedDevOrigins: ['*'],
  
  // Ensure images from external sources work
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Allow all hosts in development
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};

export default nextConfig;
