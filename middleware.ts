import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Quick cookie check: if the request has no Supabase session cookie at all,
  // we can immediately determine auth state without making external network calls to Supabase.
  const hasAuthCookie = request.cookies.getAll().some(
    (c) => c.name.startsWith('sb-') && c.name.includes('auth-token')
  );

  // Protect /dashboard: redirect unauthenticated visitor immediately
  if (url.pathname.startsWith('/dashboard')) {
    if (!hasAuthCookie) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // Auth pages: if no auth cookie is present, visitor is definitely logged out, continue immediately
  if (!hasAuthCookie && (url.pathname === '/login' || url.pathname === '/register' || url.pathname === '/forgot-password')) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect /dashboard and sub-routes
  if (url.pathname.startsWith('/dashboard')) {
    if (!user) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // Redirect logged-in users away from auth pages
  if (user && (url.pathname === '/login' || url.pathname === '/register' || url.pathname === '/forgot-password')) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Only run middleware on routes that actually require authentication checks.
     * All public and non-user-specific pages (/ , /pricing, /f/*, /e/*, /download/*, etc.)
     * are bypassed completely so they are served directly by Vercel CDN Edge Cache
     * without triggering Fluid Compute functions.
     */
    '/dashboard/:path*',
    '/login',
    '/register',
    '/forgot-password',
  ],
};
