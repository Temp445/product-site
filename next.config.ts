import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin({
    
});

const nextConfig: NextConfig = {
//   basePath: '/web-development',
  assetPrefix: '/web-development/',
  trailingSlash: true,
};

// Wrap and export
export default withNextIntl(nextConfig);
