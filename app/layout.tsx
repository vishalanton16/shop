import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

import { DemoSearch } from "../components/search";
import { DemoCartIcon, DemoOverlays } from "../components/store-client";
import { DemoCartProvider } from "../lib/cart/client";

import "./globals.css";

export const ensureStatic = "prefetch";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  description:
    "Pumpkins, lanterns, and Halloween decorations. A local Hollow & Harvest storefront demo.",
  title: { default: "Hollow & Harvest | Halloween at home", template: "%s | Hollow & Harvest" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-dvh flex-col font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-background focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg focus:ring-2 focus:ring-foreground focus:outline-none"
        >
          Skip to content
        </a>
        <DemoCartProvider>
          <Nav cart={<DemoCartIcon />} name="Hollow & Harvest" search={<DemoSearch />} />
          <main className="flex min-w-0 flex-1 flex-col" id="main-content">
            {children}
          </main>
          <Footer policies={[{ handle: "privacy-policy", title: "Privacy Policy" }]} />
          <DemoOverlays />
        </DemoCartProvider>
      </body>
    </html>
  );
}
