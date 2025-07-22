import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const allowedRegions = [
    'tn',  /* Tamil Nadu */
    'ka',  /* Karnataka */
    'mh',  /* Maharashtra */
    'dl',  /* Delhi */
    'ts',  /* Telangana */
    'hr',  /* Haryana */
    'se',   /* Singapore */
    'uaedxb', /* UAE Dubai */
    'uaesh', /* UAE Sharjah */
    'uaead' /* UAE Abu Dhabi */
];

const intlMiddleware = createIntlMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const match = pathname.match(/^\/([a-zA-Z0-9_-]+)(\/|$)/);
  const pathSegment = match?.[1];

  if (pathSegment === 'auth') {
    return NextResponse.next();
  }

  // Redirect /tn → / 
  if (pathSegment && allowedRegions.includes(pathSegment)) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
