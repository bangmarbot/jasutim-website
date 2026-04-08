import {ContactForm} from '@/components/contact-form';
import {content, siteConfig, type Locale} from '@/lib/content';
import {getMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  return getMetadata(params.locale, '/kontak');
}

export default function ContactPage({params}: {params: {locale: Locale}}) {
  const t = content[params.locale];

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">{t.contact.title}</h1>
        <p className="mt-4 leading-8 text-muted-foreground">{t.contact.description}</p>
        <div className="mt-8 space-y-3 text-muted-foreground">
          <div>Email: {siteConfig.email}</div>
          <div>Phone: {siteConfig.phone}</div>
          <div>Location: {siteConfig.location}</div>
          <div>{t.contact.officeHours}</div>
        </div>
      </div>
      <ContactForm locale={params.locale} />
    </main>
  );
}
