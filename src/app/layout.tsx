import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {getLocale} from "next-intl/server";
import "./globals.css";
import {siteConfig} from "@/lib/content";

const inter = Inter({subsets: ["latin"], variable: "--font-sans"});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: siteConfig.name,
  description: "Community-powered circular economy foundation in Bekasi.",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Yayasan Jalandra Suwara Timu",
  alternateName: "JASUTIM",
  url: siteConfig.domain,
  logo: `${siteConfig.domain}/images/logo.png`,
  image: `${siteConfig.domain}/og.jpg`,
  email: siteConfig.email,
  description:
    "Yayasan berbasis komunitas di Bekasi yang membangun ekonomi sirkular melalui bank sampah, edukasi lingkungan, dan pemberdayaan warga.",
  foundingDate: "2025-12-05",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pondok Melati",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  },
  sameAs: [siteConfig.socials.instagram],
};

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(orgJsonLd)}}
        />
        {children}
      </body>
    </html>
  );
}
