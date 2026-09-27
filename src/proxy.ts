import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale } from "@/lib/i18n/config";
import { getLocaleFromPathname } from "@/lib/i18n/paths";
import { LOCALE_HEADER, PATHNAME_HEADER } from "@/lib/i18n/request-locale";

/**
 * Locale proxy — forwards locale from the URL to Server Components.
 * Danish stays unprefixed. English uses /en.
 *
 * Request headers (not response headers) are what `headers()` can read.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = getLocaleFromPathname(pathname) || defaultLocale;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  requestHeaders.set(PATHNAME_HEADER, pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/",
    "/((?!_next/static|_next/image|favicon.ico|brand/|images/|logos/|api/|studio|focus|.*\\..*).*)",
  ],
};
