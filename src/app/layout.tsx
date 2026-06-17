import type {Metadata} from "next";
import {siteConfig} from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: siteConfig.name,
  description: "Community-powered circular economy foundation in Bekasi.",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return children;
}
