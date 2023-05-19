/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,

  // Use the CDN in production and localhost for development.
  assetPrefix: isProd ? process.env.NEXT_PUBLIC_CDN_PATH : undefined,
}

module.exports = nextConfig
