import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getLocale } from 'next-intl/server'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Poppins, Lora, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { BackToTop } from '@/components/ui/back-to-top'
import { Toaster } from '@/components/ui/toaster'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Doki — Container Engine for Android',
  description: 'Run Docker containers natively on your phone. No root. No bloat.',
  authors: [{ name: 'OpceanAI' }],
  openGraph: {
    title: 'Doki — Container Engine for Android',
    description: 'Run Docker containers natively on your phone. No root. No bloat.',
    type: 'website',
    url: 'https://dok1.xyz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doki — Container Engine for Android',
    description: 'Run Docker containers natively on your phone. No root. No bloat.',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  alternates: {
    languages: {
      en: '/',
      es: '/',
      ja: '/',
      de: '/',
      fr: '/',
      ko: '/',
      it: '/',
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f5' },
    { media: '(prefers-color-scheme: dark)', color: '#141413' },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const messages = await getMessages()
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${poppins.variable} ${lora.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="font-serif antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <a href="#main-content" className="skip-link">Skip to content</a>
            <ScrollProgress />
            <main id="main-content">{children}</main>
            <BackToTop />
            <Toaster />
          </NextIntlClientProvider>
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
