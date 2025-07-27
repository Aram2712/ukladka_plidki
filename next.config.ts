
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['mui-file-input'],
  images: {
    remotePatterns: [
    {
      protocol: 'https',
      hostname: 'ukladka-plitki.ru',
      pathname: '/uploads/**',
    },
  ],
  },
  /* config options here */
};

export default nextConfig;