import type {MetadataRoute} from 'next';
import {locales, siteConfig, localePath} from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/programs', '/impact', '/contact'];

  return locales.flatMap((locale) =>
    routes.map((route) => {
      const lp = localePath(locale, route);
      return {
        url: `${siteConfig.domain}${lp === '/' ? '' : lp}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
        priority: route === '' ? 1 : 0.7,
      };
    }),
  );
}
