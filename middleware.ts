import manifest from './locale-manifest.json'

/* Vercel Routing Middleware (root-level file convention, Edge runtime).
   Note this is NOT Astro's src/middleware.ts: Astro middleware does not run
   for prerendered pages, and this site is fully static, so locale routing has
   to happen at the CDN edge before the static asset is served. */

const COOKIE = 'lang-pref'
const GEO_TO_LOCALE: Record<string, string> = { JP: 'ja' }

/* Crawlers must reach the canonical English pages: Googlebot indexes from a
   handful of egress regions, so geo-redirecting it would hide the originals. */
const BOT = /bot|crawler|spider|crawling|slurp|bingpreview|facebookexternalhit/i

const translated = (locale: string, pathname: string): boolean =>
  ((manifest as Record<string, string[]>)[locale] ?? []).includes(pathname)

export default function middleware(request: Request): Response | undefined {
  const url = new URL(request.url)
  const { pathname } = url

  // Already inside a locale tree, or a non-page request.
  if (Object.values(GEO_TO_LOCALE).some(l => pathname.startsWith(`/${l}/`)))
    return
  if (BOT.test(request.headers.get('user-agent') ?? '')) return

  // An explicit choice always wins over geography.
  const cookie = request.headers.get('cookie') ?? ''
  if (cookie.includes(`${COOKIE}=`)) return

  const country = request.headers.get('x-vercel-ip-country') ?? ''
  const locale = GEO_TO_LOCALE[country]
  if (!locale) return

  const target = `/${locale}${pathname}`
  if (!translated(locale, pathname)) return

  url.pathname = target
  return new Response(null, {
    status: 307,
    headers: {
      Location: url.toString(),
      // Geo-varied response: never let one region's copy be cached for another.
      Vary: 'x-vercel-ip-country, cookie',
    },
  })
}

export const config = {
  matcher: ['/((?!_astro|pagefind|api|favicon|.*\\.[a-zA-Z0-9]+$).*)'],
}
