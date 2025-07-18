import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
     basePath: '/blog',
  trailingSlash: true,
  output: 'standalone',
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);