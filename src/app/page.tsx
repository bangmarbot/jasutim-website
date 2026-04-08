import {redirect} from 'next/navigation';
import {defaultLocale} from '@/lib/content';

export default function IndexPage() {
  redirect(`/${defaultLocale}`);
}
