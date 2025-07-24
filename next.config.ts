
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['mui-file-input'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ukladka-plitki.ru',
      }
    ],
  },
  /* config options here */
};

export default nextConfig;
//'ukladka-plitki.ru'