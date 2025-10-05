import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'exoplanets.nasa.gov',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.nasa.gov',
        pathname: '/**',
      }
    ]
  },
  output: 'standalone',
  experimental: {
    optimizeCss: true
  },
  swcMinify: true,
  poweredByHeader: false
};

module.exports = nextConfig;

export default nextConfig;
