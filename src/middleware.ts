import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/lib/supabase/constants';

const PUBLIC_PREFIXES = ['/auth', '/api', '/_next'];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]
      ) {
        cookiesToSet.forEach(({ name, value }: { name: string; value: string }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(
          ({
            name,
            value,
            options,
          }: {
            name: string;
            value: string;
            options?: Record<string, unknown>;
          }) => response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname, search } = request.nextUrl;
  const isPublic =
    PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix)) || pathname.includes('.');

  // Hard gate: nothing inside the product is reachable without a real session.
  if (!user && !isPublic) {
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
    url.pathname = user ? '/learn' : '/auth';
    url.search = '';
    return NextResponse.redirect(url);
  }

  if (user && pathname === '/auth') {
    const next = request.nextUrl.searchParams.get('next');
    const url = request.nextUrl.clone();
    url.pathname = next && next.startsWith('/') && next !== '/auth' ? next : '/learn';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
