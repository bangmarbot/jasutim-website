import Link from "next/link";
import {content, siteConfig, type Locale} from "@/lib/content";
import {getMetadata} from "@/lib/seo";

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  return getMetadata(params.locale);
}

export default function HomePage({params}: {params: {locale: Locale}}) {
  const locale = params.locale;
  const t = content[locale];
  const id = locale === "id";

  const alt = {
    hero: id ? "Sampah daur ulang terpilah, siap diangkut bersama Dinas Lingkungan Hidup Kota Bekasi" : "Sorted recyclable waste, ready for collection with the Bekasi City Environmental Agency",
    feature: id ? "Tim pengurus dan warga JASUTIM di depan Bank Sampah JASUTIM" : "JASUTIM team and residents in front of Bank Sampah JASUTIM",
    featureGov: id ? "Audiensi pengurus JASUTIM dengan Pemerintah Kota Bekasi" : "JASUTIM meeting with the Bekasi City Government",
    anchor: id ? "Kegiatan pemilahan sampah di bank sampah komunitas JASUTIM" : "Waste sorting activity at the JASUTIM community waste bank",
  };

  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="border-b border-foreground/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-4 py-12 sm:px-6 lg:order-none lg:py-24 lg:pl-8 lg:pr-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">{t.hero.eyebrow}</p>
            <h1 className="mt-6 text-[2.1rem] font-extrabold uppercase leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.7rem] lg:leading-[1.02]">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">{t.hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/kontak`} className="bg-foreground px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-background transition hover:bg-primary">
                {t.cta.primary}
              </Link>
              <Link href={`/${locale}/dampak`} className="border border-foreground/25 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] transition hover:border-foreground">
                {t.cta.secondary}
              </Link>
            </div>
          </div>
          <div className="relative order-1 min-h-[300px] lg:order-none lg:min-h-[640px]">
            <img src="/images/bottles.jpg" alt={alt.hero} className="absolute inset-0 h-full w-full object-cover" loading="eager" />
          </div>
        </div>
      </section>

      {/* STATS / DAMPAK */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">{t.dampak.title}</p>
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3">
          {t.dampak.stats.map((s) => (
            <div key={s.label} className="border-t-2 border-foreground/80 pt-6">
              <div className="text-4xl font-extrabold tracking-tight tabular-nums sm:text-5xl lg:text-[3.4rem] lg:leading-none">{s.value}</div>
              <div className="mt-4 text-sm font-semibold uppercase tracking-wide text-foreground/70">{s.label}</div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="border-t border-foreground/10 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">{id ? "Yang kami lakukan" : "What we do"}</p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{t.programs.title}</h2>
            </div>
            <div className="divide-y divide-foreground/15">
              {t.programs.items.map((p, i) => (
                <div key={p.name} className="flex gap-6 py-6 first:pt-0">
                  <div className="pt-1 text-sm font-bold tabular-nums text-primary">{`0${i + 1}`}</div>
                  <div>
                    <h3 className="text-xl font-semibold">{p.name}</h3>
                    <p className="mt-2 leading-7 text-muted-foreground">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO FEATURE */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="order-2 grid grid-rows-2 lg:order-none">
          <div className="relative min-h-[220px] lg:min-h-[280px]">
            <img src="/images/feature-gov.jpg" alt={alt.featureGov} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="relative min-h-[220px] lg:min-h-[280px]">
            <img src="/images/feature.jpg" alt={alt.feature} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
        <div className="order-1 flex flex-col justify-center bg-foreground px-4 py-14 text-background sm:px-6 lg:order-none lg:px-14 lg:py-24">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">{t.feature.eyebrow}</p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{t.feature.title}</h2>
          <p className="mt-5 max-w-xl leading-7 text-background/75">{t.feature.text}</p>
        </div>
      </section>

      {/* UVP */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">{t.uvp.title}</p>
        <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">{t.uvp.tagline}</h2>
        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {t.uvp.points.map((p) => (
            <div key={p.title} className="border-t-2 border-foreground/80 pt-6">
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ANCHOR — community */}
      <section className="border-t border-foreground/10 bg-secondary/40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[4/5]">
            <img src="/images/sorting.jpg" alt={alt.anchor} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">{t.anchor.label}</p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{t.anchor.title}</h2>
            <p className="mt-5 leading-7 text-muted-foreground">{t.anchor.text}</p>
            <Link href={`/${locale}/tentang`} className="mt-7 inline-block border-b-2 border-primary pb-1 text-xs font-bold uppercase tracking-[0.12em] transition hover:border-foreground">
              {t.anchor.link}
            </Link>
          </div>
        </div>
      </section>

      {/* GREEN CTA BAND */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.contact.title}</h2>
              <p className="mt-4 max-w-2xl leading-7 text-primary-foreground/85">{t.contact.description}</p>
            </div>
            <div className="lg:text-right">
              <Link href={`/${locale}/kontak`} className="inline-block bg-background px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-foreground transition hover:bg-foreground hover:text-background">
                {t.cta.primary}
              </Link>
              <p className="mt-4 text-sm text-primary-foreground/80">{siteConfig.email}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
