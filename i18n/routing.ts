import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'es', 'ja', 'de', 'fr', 'ko', 'it'],
  defaultLocale: 'en',
})
