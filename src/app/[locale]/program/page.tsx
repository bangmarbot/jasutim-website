import {content, type Locale} from '@/lib/content';
import {getMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  return getMetadata(params.locale, '/program');
}

export default function ProgramPage({params}: {params: {locale: Locale}}) {
  const t = content[params.locale];

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">{params.locale === 'id' ? 'Program Kami' : 'Our Programs'}</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {t.programs.items.map((item, index) => (
          <article key={item.name} className="rounded-3xl border bg-background p-6 shadow-sm">
            <div className="text-sm font-semibold text-emerald-700">0{index + 1}</div>
            <h2 className="mt-3 text-xl font-semibold">{item.name}</h2>
            <p className="mt-3 leading-7 text-muted-foreground">{item.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
