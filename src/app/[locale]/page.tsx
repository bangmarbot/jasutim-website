import Link from "next/link";
import {ArrowRight, Droplets, HandHeart, Leaf, Sparkles} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {ContactForm} from "@/components/contact-form";
import {content, siteConfig, type Locale} from "@/lib/content";
import {getMetadata} from "@/lib/seo";

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  return getMetadata(params.locale);
}

const icons = [Leaf, Droplets, HandHeart];

export default function HomePage({params}: {params: {locale: Locale}}) {
  const locale = params.locale;
  const t = content[locale];

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="space-y-8">
            <Badge variant="secondary" className="rounded-full px-4 py-1 text-xs font-medium">{t.hero.eyebrow}</Badge>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{t.hero.title}</h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{t.hero.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/kontak`} className={cn(buttonVariants({size: "lg"}), "rounded-full px-6")}>
                {t.cta.primary}
              </Link>
              <Link href={`/${locale}/dampak`} className={cn(buttonVariants({variant: "outline", size: "lg"}), "rounded-full px-6")}>
                {t.cta.secondary}
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {t.hero.stats.map((stat) => (
                <Card key={stat.label} className="rounded-3xl border-emerald-100 shadow-sm">
                  <CardContent className="p-6">
                    <div className="text-3xl font-semibold text-emerald-700">{stat.value}</div>
                    <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="rounded-[2rem] border-0 bg-emerald-900 text-white shadow-2xl shadow-emerald-200">
            <CardContent className="flex h-full flex-col justify-between p-8">
              <div>
                <div className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm">JASUTIM Eco-Candle Initiative</div>
                <h2 className="text-3xl font-semibold">33× value multiplication from used cooking oil.</h2>
                <p className="mt-4 text-sm leading-7 text-emerald-50/85">
                  Based on the latest pitch deck, JASUTIM is preparing a product-scale initiative that turns used cooking oil into premium eco-candles while creating jobs for women and reducing household pollution.
                </p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/10 p-5">
                  <div className="text-sm text-emerald-50/80">Projected year-1 revenue</div>
                  <div className="mt-2 text-2xl font-semibold">Rp 140.3M</div>
                </div>
                <div className="rounded-3xl bg-white/10 p-5">
                  <div className="text-sm text-emerald-50/80">Potential jobs created</div>
                  <div className="mt-2 text-2xl font-semibold">3–5 women</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">01</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">{t.problem.title}</h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {t.problem.items.map((item, index) => {
            const Icon = icons[index] || Sparkles;
            return (
              <Card key={item} className="rounded-3xl">
                <CardContent className="p-7">
                  <Icon className="h-10 w-10 text-emerald-600" />
                  <p className="mt-5 leading-7 text-muted-foreground">{item}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">02</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">{t.impact.title}</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {t.impact.cards.map((card) => (
              <Card key={card.title} className="rounded-3xl bg-background">
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">{card.body}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">03</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">{t.programs.title}</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {t.programs.items.map((program, index) => (
            <Card key={program.name} className="rounded-3xl border-emerald-100">
              <CardContent className="p-7">
                <div className="text-sm font-semibold text-emerald-700">0{index + 1}</div>
                <h3 className="mt-4 text-xl font-semibold">{program.name}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{program.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-emerald-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">04</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">{t.timeline.title}</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {t.timeline.items.map((item) => (
              <div key={item.year} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm font-semibold text-emerald-300">{item.year}</div>
                <p className="mt-3 text-sm leading-7 text-white/80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">05</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">{t.collaboration.title}</h2>
            <p className="mt-4 text-muted-foreground">{t.contact.description}</p>
            <Separator className="my-6" />
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>{siteConfig.email}</div>
              <div>{siteConfig.phone}</div>
              <div>{siteConfig.location}</div>
            </div>
          </div>
          <div className="grid gap-5">
            {t.collaboration.points.map((point) => (
              <Card key={point} className="rounded-3xl">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="mt-1 rounded-full bg-emerald-100 p-2 text-emerald-700">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <p className="leading-7 text-muted-foreground">{point}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">06</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">{t.contact.title}</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{t.contact.description}</p>
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <div>Email: {siteConfig.email}</div>
              <div>WhatsApp: {siteConfig.phone}</div>
              <div>{t.contact.officeHours}</div>
            </div>
          </div>
          <ContactForm locale={locale} />
        </div>
      </section>
    </main>
  );
}
