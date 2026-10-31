import { SITE_URL } from '@/lib/site';

export default function sitemap() {
  return [
    { path: '/', priority: 1 },
    { path: '/prijzen', priority: 0.9 },
    { path: '/afspraak', priority: 0.9 },
    { path: '/contact', priority: 0.8 },
    { path: '/over-ons', priority: 0.7 },
  ].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'monthly',
    priority,
  }));
}
