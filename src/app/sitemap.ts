import type {MetadataRoute} from 'next';
import {locales, siteConfig} from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/tentang', '/program', '/dampak', '/kontak'];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.domain}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : 0.7,
    })),
  );
}
