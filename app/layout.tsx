import type { Metadata, Viewport } from 'next'

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
  metadataBase: new URL('https://dok1.xyz'),
  title: 'Doki — Container Engine for Android',
  description: 'Run Docker containers natively on your phone. No root. No bloat. One binary. Every platform.',
  generator: 'v0.app',
  keywords: ['docker', 'containers', 'android', 'termux', 'rootless', 'oci', 'podman', 'kubernetes', 'mesh', 'proot', 'linux'],
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
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f5' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a18' },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${lora.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <a href="#main-content" className="skip-link">Skip to content</a>
          <ScrollProgress />
          <main id="main-content">{children}</main>
          <BackToTop />
          <Toaster />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
