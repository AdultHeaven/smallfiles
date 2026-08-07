import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/api/', '/download/', '/f/', '/file/'],
    },
    sitemap: 'https://walkfiles.com/sitemap.xml',
  };
}
