const { withSentryConfig } = require('@sentry/nextjs')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'zlgokxtwk5h4usda.public.blob.vercel-storage.com',
      },
    ],
    unoptimized: true,
  },
}

if (process.env.NEXT_EXPORT_TYPE === 'export') {
  nextConfig.output = 'export'
}

// Only apply Sentry config in production
const isProduction = process.env.NODE_ENV === 'production'

module.exports = isProduction
  ? withSentryConfig(nextConfig, {
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    //silent: !process.env.CI,
    //disableLogger: true,

    // Pass the auth token
    authToken: process.env.SENTRY_AUTH_TOKEN,
    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,
    reactComponentAnnotation: {
      enabled: true,
    },
  })
  : nextConfig
