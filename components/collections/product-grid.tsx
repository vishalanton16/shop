"use client";
import { useCollection } from "@shopify/hydrogen/react";
import type { ReactNode } from "react";

export function BrowseProductGrid({ children }: { children: ReactNode }) {
  const isPending = useCollection((state) => state.status === "loading");
  return (
    <div
      className="transition-opacity duration-200 data-[pending=true]:pointer-events-none data-[pending=true]:opacity-50"
      data-pending={isPending}
    >
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {children}
      </div>
    </div>
  );
}
