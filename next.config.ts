
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  basePath: '/blog',
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
