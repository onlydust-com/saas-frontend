import { NextRequest, NextResponse } from "next/server";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { isInMaintenanceMode } from "@/shared/helpers/maintenance";

export default function middleware(req: NextRequest) {
  const { inMaintenance } = isInMaintenanceMode();

  if (inMaintenance) {
    req.nextUrl.pathname = NEXT_ROUTER.splash.maintenance;

    return NextResponse.rewrite(req.nextUrl);
  }

  if (!inMaintenance && req.nextUrl.pathname === NEXT_ROUTER.splash.maintenance) {
    req.nextUrl.pathname = NEXT_ROUTER.notFound;

    return NextResponse.rewrite(req.nextUrl);
  }

  return NextResponse.next();
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
