import {defineRouting} from 'next-intl/routing';
import {locales, defaultLocale} from '@/lib/content';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
});
