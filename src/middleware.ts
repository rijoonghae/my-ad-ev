import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`[Middleware] Running for path: ${pathname}`);

  // Skip middleware for assets and internal Next.js paths
  if (pathname.startsWith('/_next') || pathname.startsWith('/static') || pathname.includes('.')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    console.log('[Middleware] Protecting admin route.');
    const token = request.cookies.get('admin_token')?.value;
    console.log(`[Middleware] Token found: ${token ? 'Yes' : 'No'}`);

    if (!token) {
      console.log('[Middleware] No token, redirecting to login.');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jose.jwtVerify(token, JWT_SECRET);
      console.log('[Middleware] Token verified successfully.');
      return NextResponse.next();
    } catch (error) {
      console.error('[Middleware] Token verification failed:', error);
      console.log('[Middleware] Invalid token, redirecting to login.');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}

export const runtime = 'nodejs'; 