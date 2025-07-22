import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const allowedRegions = [
  'tn', 'ka', 'mh', 'dl', 'ts', 'hr',
  'se', 'uaedxb', 'uaesh', 'uaead'
];

const intlMiddleware = createIntlMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname, origin, basePath } = request.nextUrl;

  // Match first segment of path
  const match = pathname.match(/^\/([a-zA-Z0-9_-]+)(\/|$)/);
  const pathSegment = match?.[1];

  // Skip /auth routes
  if (pathSegment === 'auth') {
    return NextResponse.next();
  }

  // Redirect regional slug (e.g., /tn or /ka) to root (without showing it)
  if (pathSegment && allowedRegions.includes(pathSegment)) {
    const url = request.nextUrl.clone();

    // Remove the region part from the pathname
    const newPath = pathname.replace(`/${pathSegment}`, '') || '/';

    url.pathname = newPath;

    return NextResponse.redirect(url);
  }

  // Handle locale routing (next-intl)
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
