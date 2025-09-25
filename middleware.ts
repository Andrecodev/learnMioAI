import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const profileCompleted = request.cookies.get('profile-completed');
  const publicPaths = ['/login', '/api'];

  const isPublicPath = publicPaths.some(publicPath =>
    path.startsWith(publicPath)
  );

  // If profile is not completed and trying to access protected route
  if (!profileCompleted && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ]
};
