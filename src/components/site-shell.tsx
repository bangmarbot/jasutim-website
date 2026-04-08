"use client";

import Link from "next/link";
import {useLocale} from "next-intl";
import {Menu, Recycle, Languages} from "lucide-react";
import {Button, buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {navigation, siteConfig} from "@/lib/content";

export function SiteShell({children}: {children: React.ReactNode}) {
  const locale = useLocale() as "id" | "en";
  const items = navigation[locale];
  const switchTo = locale === "id" ? "en" : "id";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}`} className="flex items-center gap-3 font-semibold">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Recycle className="h-5 w-5" />
            </div>
            <div>
              <div>{siteConfig.shortName}</div>
              <div className="text-xs font-normal text-muted-foreground">Yayasan Jalandra Suwara Timu</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {items.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href === "/" ? "" : item.href}`} className="text-sm text-muted-foreground transition hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href={`/${switchTo}`} className={cn(buttonVariants({variant: "outline", size: "sm"}))}>
              <Languages className="mr-2 h-4 w-4" />
              {switchTo.toUpperCase()}
            </Link>
            <Link href={`/${locale}/kontak`} className={cn(buttonVariants({size: "sm"}))}>
              {locale === "id" ? "Hubungi Kami" : "Contact Us"}
            </Link>
          </div>

          <Sheet>
            <SheetTrigger>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="mt-8 flex flex-col gap-4">
                {items.map((item) => (
                  <Link key={item.href} href={`/${locale}${item.href === "/" ? "" : item.href}`} className="text-base font-medium">
                    {item.label}
                  </Link>
                ))}
                <Link href={`/${switchTo}`} className="pt-2 text-sm text-muted-foreground">
                  Switch to {switchTo.toUpperCase()}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      {children}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold">{siteConfig.name}</div>
            <div className="mt-1 text-muted-foreground">{siteConfig.location}</div>
          </div>
          <div className="text-muted-foreground">© 2026 {siteConfig.shortName}. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
