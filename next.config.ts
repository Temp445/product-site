import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
//   basePath: '/blog',
//   assetPrefix: '/blog/',
  trailingSlash: true,
};

// Wrap and export
export default withNextIntl(nextConfig);
