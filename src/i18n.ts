import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {content, defaultLocale, locales, type Locale} from '@/lib/content';

export default getRequestConfig(async ({locale}) => {
  const requestedLocale = (locale || defaultLocale) as Locale;

  if (!locales.includes(requestedLocale)) notFound();

  return {
    locale: requestedLocale,
    messages: content[requestedLocale],
  };
});
