import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
};

export default nextConfig;
