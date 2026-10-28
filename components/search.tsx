"use client";

import { useEffect, useState } from "react";

import { SearchDialogContent, SearchTrigger } from "@/components/nav/search-view";
import { Dialog } from "@/components/ui/dialog";

import { products, toProductCard } from "../lib/product";

export function DemoSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQueryState] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);
  function setQuery(value: string) {
    setActiveIndex(-1);
    setQueryState(value);
  }
  const matches = products
    .filter((product) =>
      `${product.title} ${product.description} ${product.category}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
    )
    .slice(0, 3)
    .map(toProductCard);
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <SearchTrigger />
      <SearchDialogContent
        activeIndex={activeIndex}
        isLoading={false}
        onClose={() => setOpen(false)}
        query={query}
        recentlyViewed={[]}
        reset={() => setQuery("")}
        results={query.trim() ? { products: matches, queries: [] } : null}
        setActiveIndex={setActiveIndex}
        setQuery={setQuery}
      />
    </Dialog>
  );
}
