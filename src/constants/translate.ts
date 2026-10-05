/* Machine-translated locales served through the Google Translate widget.
   Shared by the edge middleware (geo default) and the client (picker, loader).
   Codes are Google Translate target codes, written into the `googtrans`
   cookie as `/en/<code>`. */

export const SOURCE_LANG = 'en'

export const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
] as const

export type LocaleCode = (typeof LOCALES)[number]['code']

export const GEO_TO_LOCALE: Record<string, LocaleCode> = {
  JP: 'ja',
  CN: 'zh-CN',
  SG: 'zh-CN',
  TW: 'zh-TW',
  HK: 'zh-TW',
  MO: 'zh-TW',
}

/* Explicit choice made in the picker (or the geo default, once applied).
   Its presence means geography is never consulted again. */
export const PREF_COOKIE = 'lang-pref'
/* Read by the Google widget on init to pick the target language. */
export const GOOGTRANS_COOKIE = 'googtrans'

export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365
