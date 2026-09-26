import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale } from "@/lib/i18n/config";
import { getLocaleFromPathname } from "@/lib/i18n/paths";
import { LOCALE_HEADER } from "@/lib/i18n/request-locale";

/**
 * Locale proxy — sets x-locale from the URL.
 * Danish stays unprefixed (existing URLs). English uses /en.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = getLocaleFromPathname(pathname) || defaultLocale;

  const response = NextResponse.next();
  response.headers.set(LOCALE_HEADER, locale);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|brand/|images/|logos/|api/|studio|focus|.*\\..*).*)",
  ],
};
