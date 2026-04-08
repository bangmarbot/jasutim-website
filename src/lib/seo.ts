import type {Metadata} from 'next';
import {content, siteConfig, type Locale} from '@/lib/content';

export function getMetadata(locale: Locale, path = ''): Metadata {
  const t = content[locale];
  const url = `${siteConfig.domain}/${locale}${path}`;

  return {
    metadataBase: new URL(siteConfig.domain),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: url,
      languages: {
        id: `${siteConfig.domain}/id${path}`,
        en: `${siteConfig.domain}/en${path}`,
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url,
      siteName: siteConfig.name,
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
    },
  };
}
