import type { Metadata } from "next";
import { Suspense } from "react";

import { BrowseFallback } from "@/components/collections/toolbar";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";

import { DemoSearchResults } from "../../components/browse";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Page className="pt-2.5 md:pt-10">
      <Container>
        <Sections className="gap-5">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl">
              <Link href="/search">Search</Link>
              <Suspense fallback={null}>
                <QueryLabel searchParams={searchParams} />
              </Suspense>
            </h1>
          </div>
          <Suspense fallback={<BrowseFallback />}>
            <DemoSearchResults searchParams={searchParams} />
          </Suspense>
        </Sections>
      </Container>
    </Page>
  );
}

async function QueryLabel({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { q } = await searchParams;
  return typeof q === "string" && q.trim() ? ` for "${q.trim().slice(0, 200)}"` : null;
}
