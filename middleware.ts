import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: Request) {
  const token = (await cookies()).get("authToken")?.value;
  const { pathname } = new URL(request.url);

  // Exclude static files and API routes
  if (
    pathname.startsWith("/_next") || // Next.js static files
    pathname.startsWith("/api") || // API routes
    pathname.startsWith("/static") || // Static assets
    pathname.includes(".") // Files with extensions (e.g., .css, .js)
  ) {
    return NextResponse.next();
  }

  // If no token, redirect to login
  if (!token && !pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // If token exists and user tries to access login, redirect to homepage
  if (token && pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
