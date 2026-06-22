import type {Metadata} from 'next';
import {content, siteConfig, localePath, type Locale} from '@/lib/content';

export function getMetadata(locale: Locale, path = ''): Metadata {
  const t = content[locale];
  const abs = (loc: Locale) => {
    const lp = localePath(loc, path);
    return `${siteConfig.domain}${lp === '/' ? '' : lp}`;
  };
  const url = abs(locale);

  return {
    metadataBase: new URL(siteConfig.domain),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: url,
      languages: {
        id: abs('id'),
        en: abs('en'),
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url,
      siteName: siteConfig.name,
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      type: 'website',
      images: [{url: '/og.jpg', width: 1200, height: 630, alt: siteConfig.name}],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
      images: ['/og.jpg'],
    },
  };
}
