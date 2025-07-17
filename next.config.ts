
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['mui-file-input'],
  images: {
    domains: ['ukladka-plitki.ru'],
  },
  /* config options here */
};

export default nextConfig;
