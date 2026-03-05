/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  // Prevents @react-pdf/renderer's native canvas dep from crashing the bundle.
  // canvas is a server-only Node.js native module; we stub it out for the browser.
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
}

export default nextConfig