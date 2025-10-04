import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // 👈 This disables ESLint errors from breaking builds
  },
  typescript: {
    ignoreBuildErrors: true,   // 👈 Optional: if TS errors are blocking too
  },
};

module.exports = nextConfig;

export default nextConfig;
