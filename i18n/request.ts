import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async () => {
  const store = await cookies()
  const cookieLocale = store.get('NEXT_LOCALE')?.value

  const locale =
    cookieLocale && routing.locales.includes(cookieLocale as (typeof routing.locales)[number])
      ? cookieLocale
      : routing.defaultLocale

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
