import {content, type Locale} from '@/lib/content';
import {getMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  return getMetadata(params.locale, '/impact');
}

export default function ImpactPage({params}: {params: {locale: Locale}}) {
  const locale = params.locale;
  const t = content[locale];

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">{locale === 'id' ? 'Dampak Kami' : 'Our Impact'}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{t.dampak.intro}</p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">{t.dampak.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {t.dampak.stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-emerald-950 p-7 text-white">
              <div className="text-3xl font-semibold text-emerald-300">{stat.value}</div>
              <div className="mt-3 leading-7 text-white/90">{stat.label}</div>
              <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-emerald-50/75">{stat.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">{t.impact.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {t.impact.cards.map((card) => (
            <article key={card.title} className="rounded-3xl border p-6 shadow-sm">
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{card.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
