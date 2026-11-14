import { NextResponse, type NextRequest } from 'next/server';
import { hasUsableSession, readCookieSession } from '@/lib/supabase/session';

const PUBLIC_PREFIXES = ['/auth', '/api', '/_next'];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Session is read straight from the cookies: no outbound call to Supabase,
  // which would hang in environments without egress to *.supabase.co and would
  // bounce an already-signed-in operator back to /auth in a loop.
  const session = readCookieSession(request.cookies.getAll());
  const signedIn = hasUsableSession(session);

  const isPublic =
    PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix)) || pathname.includes('.');

  // Hard gate: nothing inside the product is reachable without a real session.
  if (!signedIn && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    url.search = '';
    if (pathname !== '/') {
      url.searchParams.set('next', `${pathname}${search}`);
    }
    return NextResponse.redirect(url);
  }

  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = signedIn ? '/learn' : '/auth';
    url.search = '';
    return NextResponse.redirect(url);
  }

  if (signedIn && pathname === '/auth') {
    const next = request.nextUrl.searchParams.get('next');
    const url = request.nextUrl.clone();
    url.pathname = next && next.startsWith('/') && next !== '/auth' ? next : '/learn';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
