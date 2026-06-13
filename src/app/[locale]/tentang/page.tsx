import {content, type Locale} from '@/lib/content';
import {getMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  return getMetadata(params.locale, '/tentang');
}

export default function AboutPage({params}: {params: {locale: Locale}}) {
  const locale = params.locale;
  const t = content[locale];

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">{locale === 'id' ? 'Tentang JASUTIM' : 'About JASUTIM'}</h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">{t.hero.description}</p>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">{t.uvp.title}</h2>
        <p className="mt-2 text-lg font-medium text-emerald-700">{t.uvp.tagline}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {t.uvp.points.map((point) => (
            <div key={point.title} className="rounded-3xl border border-emerald-100 p-6">
              <h3 className="text-lg font-semibold">{point.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{point.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">{t.theoryOfChange.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {t.theoryOfChange.steps.map((step, index) => (
            <div key={step.label} className="rounded-3xl border p-6">
              <div className="text-sm font-semibold text-emerald-700">{`0${index + 1} · ${step.label}`}</div>
              <p className="mt-3 leading-7 text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">{t.org.title}</h2>
        <p className="mt-2 text-muted-foreground">{t.org.intro}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.org.members.map((member) => (
            <div key={member.name} className="rounded-3xl border p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{member.organ}</div>
              <div className="mt-2 font-semibold">{member.name}</div>
              <div className="mt-1 text-sm text-muted-foreground">{member.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="rounded-3xl bg-emerald-950 p-8 text-white sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight">{t.legal.title}</h2>
          <p className="mt-3 leading-7 text-emerald-50/85">{t.legal.intro}</p>
          <ul className="mt-6 space-y-3">
            {t.legal.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-7 text-emerald-50/90">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">{t.timeline.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {t.timeline.items.map((item) => (
            <div key={item.year} className="rounded-3xl border p-6">
              <div className="text-sm font-semibold text-emerald-700">{item.year}</div>
              <p className="mt-3 text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
