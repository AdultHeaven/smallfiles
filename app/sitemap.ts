import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://walkfiles.com';

  const routes = [
    '',
    '/features',
    '/pricing',
    '/contact',
    '/dmca',
    '/privacy',
    '/terms',
    '/security',
    '/status',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
