import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  dataCollection: {
    userInfo: true,
    cookies: true,
    httpHeaders: true,
    urlQueryParams: true,
  },
  // Disable Sentry in local development
  enabled: process.env.NODE_ENV === 'production',
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
})
