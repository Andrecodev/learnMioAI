// /** @type {import('next').NextConfig} */
// eslint-disable-next-line no-undef @typescript-eslint/no-require-imports
import createNextIntPlugins from 'next-intl/plugin';
const withNextIntl = createNextIntPlugins();
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Add allowed dev origins for cross-origin requests
  experimental: {
    allowedRevalidateHeaderKeys: ['x-vercel-cache-tags'],
  },
  // Configure domains for images if needed
  images: {
    domains: ['localhost', '127.0.0.1', '169.254.7.236'],
  },
  // Add headers for better Firebase integration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
}

export default withNextIntl(nextConfig)