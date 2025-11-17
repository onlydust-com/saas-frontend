import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { NEXT_ROUTER } from "@/shared/constants/router";

// Hardcoded access token for maintenance mode bypass
const VALID_ACCESS_TOKEN =
  "g2NNKru0QTvK1/zPGxBYyVjoWd2Wn5AMeWnIrApJEPqpR5FgpFpO1jeXfjWmZ5cs49i42qeFCzUWPmg+LJepOfE/ibbFEhK4vBoPR3xDbhGk/1h9oE4vwjQLUIbjKK4lVz9IZsreZVESgzO3OXErVkxkfbrYkIIvP0LBnSSpFyKez2uCVN3dt2iu3EL77LuChIUkWvgXDWCBKWSdYUEPSfM6bxbT/cooLTU9cjT+LvlTmZUFPHUUOOAe2jhV+py6ZJ6vidqIAPv0z2vwAwsXCEiz2KCTKA9FYEjkJ0yYbH6fnG8uD/4VW6v6KhzVoFZ0/vyhOZ86kt65G0C+Ns+PSA==";

export function middleware(request: NextRequest) {
  // Check for access cookie
  const accessCookie = request.cookies.get("onlydust_access");

  // If cookie exists and matches the valid token, allow access
  if (accessCookie?.value === VALID_ACCESS_TOKEN) {
    return NextResponse.next();
  }

  // Redirect everyone else to not-found page
  return NextResponse.rewrite(new URL(NEXT_ROUTER.notFound, request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
