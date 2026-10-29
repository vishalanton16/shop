import { resolveBrowseParams } from "@/lib/collections";
import type { BrowseResults } from "@/lib/collections/types";
import { shopConfig } from "@/lib/config";
import type { Facets } from "@/lib/filters/types";

import { categories, products, toProductCard } from "../product";

export function readDemoBrowse(params: Record<string, string | string[] | undefined>) {
  const search = new URLSearchParams();
  for (const [name, value] of Object.entries(params)) {
    if (Array.isArray(value)) value.forEach((item) => search.append(name, item));
    else if (value !== undefined) search.set(name, value);
  }
  const state = resolveBrowseParams(search);
  const query = (search.get("q") ?? "").slice(0, 200).trim();
  const matchingQuery = products.filter((product) =>
    `${product.title} ${product.description} ${product.category}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const productTypes = state.filters.flatMap((filter) =>
    filter.productType ? [filter.productType] : [],
  );
  const priceRanges = state.filters.flatMap((filter) => (filter.price ? [filter.price] : []));
  const matchingPrice = matchingQuery.filter((product) =>
    priceRanges.every(
      (range) =>
        (range.min === undefined || range.min === null || product.price >= range.min) &&
        (range.max === undefined || range.max === null || product.price <= range.max),
    ),
  );
  const items = matchingPrice.filter(
    (product) => productTypes.length === 0 || productTypes.includes(product.category),
  );
  if (state.sort === "price-ascending") items.sort((a, b) => a.price - b.price);
  if (state.sort === "price-descending") items.sort((a, b) => b.price - a.price);
  if (state.sort === "title-ascending") items.sort((a, b) => a.title.localeCompare(b.title));
  if (state.sort === "title-descending") items.sort((a, b) => b.title.localeCompare(a.title));
  const facets: Facets = {
    filters: [
      {
        id: "filter.p.product_type",
        label: "Product type",
        paramKey: "filter.p.product_type",
        type: "list",
        values: categories
          .filter((category) => category !== "All")
          .map((category) => ({
            count: matchingPrice.filter((product) => product.category === category).length,
            id: `filter.p.product_type.${category}`,
            input: JSON.stringify({ productType: category }),
            label: category,
            value: category,
          })),
      },
    ],
    priceRange: {
      currencyCode: shopConfig.currencyCode,
      max: Math.max(...products.map((product) => product.price)),
      min: Math.min(...products.map((product) => product.price)),
    },
  };
  const results: BrowseResults = {
    dataSearch: state.dataSearch,
    facets,
    pageInfo: { endCursor: null, hasNextPage: false, hasPreviousPage: false, startCursor: null },
    products: items.map(toProductCard),
    source: { query: query || undefined, type: "search" },
    total: items.length,
  };
  return { items, query, results, state };
}
