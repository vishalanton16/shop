import { CollectionResults } from "@/components/collections/browse";
import { CollectionBrowseProvider } from "@/components/collections/collection-browse-provider";
import { CollectionFilters } from "@/components/collections/filters";
import { BrowseToolbar } from "@/components/collections/toolbar";
import { SEARCH_SORT_EXCLUDE } from "@/lib/collections";

import { readDemoBrowse } from "../lib/collections/server";
import { DemoProductCard } from "./product-card";

interface DemoResultsProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function DemoCollectionResults({ searchParams }: DemoResultsProps) {
  const { items, results } = readDemoBrowse(await searchParams);
  return (
    <CollectionResults results={results}>
      {items.map((product, index) => (
        <DemoProductCard eager={index < 5} key={product.handle} product={product} />
      ))}
    </CollectionResults>
  );
}

export async function DemoSearchResults({ searchParams }: DemoResultsProps) {
  const { items, query, results, state } = readDemoBrowse(await searchParams);
  return (
    <CollectionBrowseProvider handle={`search:${query}`} path="/search" state={state}>
      <BrowseToolbar
        filters={<CollectionFilters facets={results.facets} />}
        resultCount={`${items.length} ${items.length === 1 ? "Item" : "Items"}`}
        sortExclude={SEARCH_SORT_EXCLUDE}
      />
      <CollectionResults results={results}>
        {items.map((product, index) => (
          <DemoProductCard eager={index < 5} key={product.handle} product={product} />
        ))}
      </CollectionResults>
    </CollectionBrowseProvider>
  );
}
