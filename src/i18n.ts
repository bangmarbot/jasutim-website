import {getRequestConfig} from 'next-intl/server';
import {content, defaultLocale, locales, type Locale} from '@/lib/content';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale: Locale =
    requested && (locales as readonly string[]).includes(requested) ? (requested as Locale) : defaultLocale;

  return {
    locale,
    messages: content[locale],
  };
});
