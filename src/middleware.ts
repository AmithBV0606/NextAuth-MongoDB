import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // To know where the user is on our site :
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "verifyemail";

  const token = request.cookies.get("token")?.value || "";

  // If the user is trying to access public url even after logging in :
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // If the user is not trying to access public url and also haven't logged in :
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Runs the middleware on the specified routes here :
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/verifyemail",
    "/profile",
    "/profile/:path*",
  ],
};
