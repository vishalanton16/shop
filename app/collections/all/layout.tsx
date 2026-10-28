import type { ReactNode } from "react";

import { CollectionLayout } from "@/components/collections/collection-page";
import { SEARCH_SORT_EXCLUDE } from "@/lib/collections";

export default function AllProductsLayout({ children }: { children: ReactNode }) {
  return (
    <CollectionLayout
      collection={{
        description: "",
        handle: "all",
        image: null,
        path: "/collections/all",
        seo: { description: "Browse our Halloween collection.", title: "Products" },
        title: "Products",
      }}
      handle="all"
      sortExclude={SEARCH_SORT_EXCLUDE}
    >
      {children}
    </CollectionLayout>
  );
}
