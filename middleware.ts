import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const profileCompleted = request.cookies.get('profile-completed');
  const publicPaths = ['/login', '/api'];

  console.log("🛡️ Middleware:", { path, profileCompleted: !!profileCompleted });

  const isPublicPath = publicPaths.some(publicPath =>
    path.startsWith(publicPath)
  );

  // If profile is not completed and trying to access protected route
  if (!profileCompleted && !isPublicPath) {
    console.log("🔄 Middleware: Redirecting to login - no profile completed");
    return NextResponse.redirect(new URL('/login', request.url));
  }

  console.log("✅ Middleware: Allowing access to", path);
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ]
};
