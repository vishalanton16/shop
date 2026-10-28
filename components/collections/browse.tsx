import type { ReactNode } from "react";

import { ProductsGridSkeleton } from "@/components/product/products-grid";
import { PRODUCTS_PER_PAGE } from "@/lib/collections";
import type { BrowseResults } from "@/lib/collections/types";

import { BrowsePublisher } from "./collection-browse-provider";
import { BrowseProductGrid } from "./product-grid";

export function BrowseResultsFallback() {
  return (
    <ProductsGridSkeleton
      count={PRODUCTS_PER_PAGE}
      className="sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    />
  );
}
export function CollectionResults({
  children,
  results,
}: {
  children: ReactNode;
  results: BrowseResults;
}) {
  const query = results.source.type === "search" ? results.source.query : undefined;
  return (
    <>
      <BrowsePublisher dataSearch={results.dataSearch} facets={results.facets} />
      {results.products.length ? (
        <BrowseProductGrid>{children}</BrowseProductGrid>
      ) : (
        <div className="py-10 text-center">
          <h2 className="mb-2 text-2xl">No products found</h2>
          <p className="text-muted-foreground">
            {query ? `We couldn't find any products matching "${query}"` : "No products available"}
          </p>
        </div>
      )}
    </>
  );
}
