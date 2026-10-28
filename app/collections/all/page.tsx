import type { Metadata } from "next";

import { CollectionBrowseBoundary } from "@/components/collections/collection-page";

import { DemoCollectionResults } from "../../../components/browse";

export const metadata: Metadata = { title: "Products" };

export default function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <CollectionBrowseBoundary>
      <DemoCollectionResults searchParams={searchParams} />
    </CollectionBrowseBoundary>
  );
}
