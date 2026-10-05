/* Machine-translated locales served through the Google Translate widget.
   Shared by the edge middleware (geo default) and the client (picker, loader).
   Codes are Google Translate target codes, written into the `googtrans`
   cookie as `/en/<code>`. */

export const SOURCE_LANG = 'en'

export const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'ru', label: 'Русский' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'ar', label: 'العربية' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'ko', label: '한국어' },
  { code: 'ja', label: '日本語' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
] as const

export type LocaleCode = (typeof LOCALES)[number]['code']

/* Only countries with one dominant non-English language. Multilingual or
   English-reading markets (CH, BE, CA, IN, ...) are left on English. */
const geo = (locale: LocaleCode, countries: string[]) =>
  Object.fromEntries(countries.map(c => [c, locale]))

export const GEO_TO_LOCALE: Record<string, LocaleCode> = {
  ...geo('es', ['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU',
    'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY']),
  ...geo('pt', ['BR', 'PT', 'AO', 'MZ']),
  ...geo('fr', ['FR', 'MC']),
  ...geo('de', ['DE', 'AT']),
  ...geo('it', ['IT']),
  ...geo('ru', ['RU', 'BY', 'KZ']),
  ...geo('tr', ['TR']),
  ...geo('ar', ['SA', 'AE', 'EG', 'QA', 'KW', 'BH', 'OM', 'JO', 'IQ', 'MA',
    'DZ', 'TN']),
  ...geo('id', ['ID']),
  ...geo('vi', ['VN']),
  ...geo('ko', ['KR']),
  ...geo('ja', ['JP']),
  ...geo('zh-CN', ['CN', 'SG']),
  ...geo('zh-TW', ['TW', 'HK', 'MO']),
}

/* Explicit choice made in the picker (or the geo default, once applied).
   Its presence means geography is never consulted again. */
export const PREF_COOKIE = 'lang-pref'
/* Read by the Google widget on init to pick the target language. */
export const GOOGTRANS_COOKIE = 'googtrans'

export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365
