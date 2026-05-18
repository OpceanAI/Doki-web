import type { Metadata, Viewport } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Inter, JetBrains_Mono, Syne } from 'next/font/google'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { BackToTop } from '@/components/ui/back-to-top'

// Initialize fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Doki — Container Engine for Android',
  description: 'Run Docker containers natively on your phone. No root. No bloat. One binary. Every platform.',
  generator: 'v0.app',
  keywords: ['docker', 'containers', 'android', 'termux', 'rootless', 'oci', 'podman'],
  authors: [{ name: 'OpceanAI' }],
  openGraph: {
    title: 'Doki — Container Engine for Android',
    description: 'Run Docker containers natively on your phone. No root. No bloat.',
    type: 'website',
    url: 'https://doki.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doki — Container Engine for Android',
    description: 'Run Docker containers natively on your phone. No root. No bloat.',
  },
  icons: {
    icon: '/227894459.jpeg',
    apple: '/227894459.jpeg',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${syne.variable} dark bg-black`}>
      <body className="font-sans antialiased bg-[var(--bg-base)] text-[var(--text-primary)]">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <ScrollProgress />
        <main id="main-content">{children}</main>
        <BackToTop />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
