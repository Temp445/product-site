// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

// Create the intl middleware instance
const intlMiddleware = createMiddleware(routing);

// Custom middleware wrapper to add redirect logic
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect `/web-development/en/...` to `/web-development/...`
  if (pathname.startsWith('/web-development/en/')) {
    const updated = request.nextUrl.clone();
    updated.pathname = pathname.replace('/web-development/en', '/web-development');
    return NextResponse.redirect(updated);
  }

  // Proceed with next-intl localization middleware
  return intlMiddleware(request);
}

// Config to exclude static and API paths
export const config = {
  matcher: [
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  ]
};
