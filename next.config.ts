// /** @type {import('next').NextConfig} */
// eslint-disable-next-line no-undef @typescript-eslint/no-require-imports
import createNextIntPlugins from 'next-intl/plugin';
const withNextIntl = createNextIntPlugins();
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // images: {
  //   unoptimized: true,
  // },
}

export default withNextIntl(nextConfig)