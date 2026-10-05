import {
  COOKIE_MAX_AGE,
  GEO_TO_LOCALE,
  GOOGTRANS_COOKIE,
  PREF_COOKIE,
  SOURCE_LANG,
} from './src/constants/translate'

/* Vercel Routing Middleware (root-level file convention, Edge runtime).
   Note this is NOT Astro's src/middleware.ts: Astro middleware does not run
   for prerendered pages, and this site is fully static, so geo detection has
   to happen at the CDN edge before the static asset is served.

   No redirects and no per-locale page trees: every visitor gets the same
   English HTML. For a first-time visitor from a mapped country we only attach
   the `googtrans` cookie, which the client-side Google Translate widget picks
   up on load. Cookies from the document response are stored before any page
   script runs, so this applies on the very first page view. */

/* Countries pinned to the English originals regardless of any locale mapping
   added later. Kept explicit rather than relying on absence from the map
   above, so adding a locale can never silently capture these visitors. */
const FORCE_ENGLISH = new Set(['IN'])

const BOT = /bot|crawler|spider|crawling|slurp|bingpreview|facebookexternalhit/i

const cookie = (name: string, value: string): string =>
  `${name}=${value}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`

export default function middleware(request: Request): Response | undefined {
  if (BOT.test(request.headers.get('user-agent') ?? '')) return

  // An explicit choice (or an already-applied geo default) always wins.
  const cookies = request.headers.get('cookie') ?? ''
  if (cookies.includes(`${PREF_COOKIE}=`)) return

  const country = request.headers.get('x-vercel-ip-country') ?? ''
  if (FORCE_ENGLISH.has(country)) return

  const locale = GEO_TO_LOCALE[country]
  if (!locale) return

  // Equivalent to `next({ headers })` from @vercel/functions: continue to the
  // static asset and merge these headers into its response.
  const headers = new Headers({ 'x-middleware-next': '1' })
  headers.append('set-cookie', cookie(PREF_COOKIE, locale))
  headers.append(
    'set-cookie',
    cookie(GOOGTRANS_COOKIE, `/${SOURCE_LANG}/${locale}`),
  )
  return new Response(null, { headers })
}

export const config = {
  matcher: ['/((?!_astro|pagefind|api|favicon|.*\\.[a-zA-Z0-9]+$).*)'],
}
