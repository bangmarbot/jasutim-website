import {content, type Locale} from '@/lib/content';
import {getMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  return getMetadata(params.locale, '/tentang');
}

export default function AboutPage({params}: {params: {locale: Locale}}) {
  const t = content[params.locale];

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">{params.locale === 'id' ? 'Tentang JASUTIM' : 'About JASUTIM'}</h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">{t.hero.description}</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {t.timeline.items.map((item) => (
          <div key={item.year} className="rounded-3xl border p-6">
            <div className="text-sm font-semibold text-emerald-700">{item.year}</div>
            <p className="mt-3 text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
