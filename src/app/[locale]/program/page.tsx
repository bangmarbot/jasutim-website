import {content, type Locale} from '@/lib/content';
import {getMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  return getMetadata(params.locale, '/program');
}

const images = ['/images/bank-sampah.jpg', '/images/eco-candle.jpg', '/images/pelatihan.jpg'];

export default function ProgramPage({params}: {params: {locale: Locale}}) {
  const locale = params.locale;
  const t = content[locale];

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">{locale === 'id' ? 'Yang kami lakukan' : 'What we do'}</p>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">{t.programs.title}</h1>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:mt-16 lg:pb-24">
        <div className="flex flex-col gap-14 lg:gap-24">
          {t.programs.items.map((item, i) => (
            <article key={item.name} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className={`relative aspect-[4/3] overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img src={images[i]} alt={item.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              </div>
              <div>
                <div className="text-sm font-bold tabular-nums text-primary">{`0${i + 1}`}</div>
                <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{item.name}</h2>
                <p className="mt-4 leading-7 text-muted-foreground">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
