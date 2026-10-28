import {
  type CollectionState,
  getSortByValue,
  parseCollectionParams,
  type ProductFilter,
  serializeCollectionParams,
} from "@shopify/hydrogen";

import type { BrowseState, SortValue } from "@/lib/collections/types";

export const PRODUCTS_PER_PAGE = 40;

// Shopify `sort_by` values; "manual" means the collection's own order.
export const SORT_VALUES = [
  "manual",
  "best-selling",
  "title-ascending",
  "title-descending",
  "price-ascending",
  "price-descending",
  "created-ascending",
  "created-descending",
] as const;

// Storefront `search` only sorts by RELEVANCE and PRICE.
export const SEARCH_SORT_EXCLUDE: SortValue[] = [
  "best-selling",
  "created-ascending",
  "created-descending",
  "title-ascending",
  "title-descending",
];

export function getBrowseSort(
  state: Pick<CollectionState, "reverse" | "sortKey">,
): string | undefined {
  return state.sortKey ? getSortByValue(state.sortKey, state.reverse) : undefined;
}

export function resolveBrowseParams(search: string | URLSearchParams): BrowseState {
  const state = parseCollectionParams(
    typeof search === "string" ? new URLSearchParams(search) : search,
  );
  return {
    dataSearch: serializeCollectionParams(state).toString(),
    filters: state.filters,
    sort: getBrowseSort(state),
  };
}

export function getBrowseSearch(
  state: Pick<CollectionState, "filters" | "reverse" | "sortKey">,
): string {
  return serializeCollectionParams(state).toString();
}

export function parseFilterInput(input: string): ProductFilter | undefined {
  try {
    return JSON.parse(input) as ProductFilter;
  } catch {
    return undefined;
  }
}
