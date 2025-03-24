import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // If user is NOT authenticated and trying to access the cart page
  if (!token && req.nextUrl.pathname === "/cart") {
    return NextResponse.redirect(new URL("/auth", req.url)); // Redirect to auth page
  }

  return NextResponse.next(); // Continue to the requested page
}

// Apply middleware only on the /cart page
export const config = {
  matcher: "/cart",
};
