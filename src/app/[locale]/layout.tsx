import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {SiteShell} from '@/components/site-shell';
import {locales, type Locale} from '@/lib/content';

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: {locale: Locale}}) {
  const {locale} = params;
  if (!locales.includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SiteShell>{children}</SiteShell>
    </NextIntlClientProvider>
  );
}
