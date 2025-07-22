import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const allowedRegions = [
  'tn', 'ka', 'mh', 'dl', 'ts', 'hr',
  'se', 'uaedxb', 'uaesh', 'uaead'
];

const intlMiddleware = createIntlMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname, basePath } = request.nextUrl;

  const match = pathname.match(/^\/([a-zA-Z0-9_-]+)(\/|$)/);
  const pathSegment = match?.[1];

  // Allow /auth routes to bypass
  if (pathSegment === 'auth') {
    return NextResponse.next();
  }

  // Redirect regional path like /tn to /
  if (pathSegment && allowedRegions.includes(pathSegment)) {
    const url = request.nextUrl.clone();
    url.pathname = basePath || '/'; // If deployed with basePath, use it
    return NextResponse.redirect(url);
  }

  // Fallback to intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'], // Run middleware only for valid routes
};
