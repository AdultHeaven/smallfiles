/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  async headers() {
    return [
      // 1. Permanent Vercel Edge CDN caching for public static marketing and info pages
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/features',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/pricing',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/security',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/status',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/contact',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/terms',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/privacy',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/dmca',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },

      // 2. Permanent Edge caching for public file preview pages (/f/:code and /download/:id)
      {
        source: '/f/:code*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/download/:id*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },

      // 3. Permanent Edge caching for public media embeds (/e/:path*)
      {
        source: '/e/:id*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },

      // 4. Static assets caching (favicon, og-image, static icons)
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/og-image.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      // 5. User-specific and mutation routes: STRICTLY NO-STORE (never cached by CDN)
      {
        source: '/dashboard/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-cache, no-store, must-revalidate, max-age=0',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'no-store',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'no-store',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-cache, no-store, must-revalidate, max-age=0',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'no-store',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
