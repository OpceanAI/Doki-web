import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()


const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default withNextIntl(nextConfig)
