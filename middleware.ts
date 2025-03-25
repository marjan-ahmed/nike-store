import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const returnUrl = req.nextUrl.searchParams.get('return_url') || '/products';
  return NextResponse.redirect(new URL(returnUrl, req.url));}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}