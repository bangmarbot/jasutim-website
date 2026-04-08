import createMiddleware from 'next-intl/middleware';
import {defaultLocale, locales} from '@/lib/content';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
