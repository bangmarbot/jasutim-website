import {Inter} from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {SiteShell} from '@/components/site-shell';
import {locales, siteConfig, type Locale} from '@/lib/content';
import '../globals.css';

const inter = Inter({subsets: ['latin'], variable: '--font-sans'});

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Yayasan Jalandra Suwara Timu',
  alternateName: 'JASUTIM',
  url: siteConfig.domain,
  logo: `${siteConfig.domain}/images/logo.png`,
  image: `${siteConfig.domain}/og.jpg`,
  email: siteConfig.email,
  description:
    'Yayasan berbasis komunitas di Bekasi yang membangun ekonomi sirkular melalui bank sampah, edukasi lingkungan, dan pemberdayaan warga.',
  foundingDate: '2025-12-05',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Pondok Melati',
    addressRegion: 'Jawa Barat',
    addressCountry: 'ID',
  },
  sameAs: [siteConfig.socials.instagram],
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: {locale: Locale}}) {
  const {locale} = params;
  if (!locales.includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(orgJsonLd)}}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SiteShell>{children}</SiteShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
