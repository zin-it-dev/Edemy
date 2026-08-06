import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname
  const { isAuthenticated } = await auth()

  if ((pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) || pathname === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    const { redirectToSignIn } = await auth()

    if (!isAuthenticated) return redirectToSignIn()
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for Clerk's auto-proxy path
    '/__clerk/:path*',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};