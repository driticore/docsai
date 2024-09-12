import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);

export default clerkMiddleware((auth, req: NextRequest) => {
  const { userId } = auth(); // Properly call the auth() function from Clerk within the middleware context
  const isAuth = !!userId;

  if (!isAuth && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next(); // Proceed to the next step if authenticated
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',  ],
};
