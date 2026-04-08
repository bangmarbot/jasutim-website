import {content, type Locale} from '@/lib/content';
import {getMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  return getMetadata(params.locale, '/dampak');
}

export default function ImpactPage({params}: {params: {locale: Locale}}) {
  const t = content[params.locale];

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">{params.locale === 'id' ? 'Dampak Kami' : 'Our Impact'}</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {t.impact.cards.map((card) => (
          <article key={card.title} className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="mt-3 leading-7 text-muted-foreground">{card.body}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
