import { cn } from "cn";
import type { ReactNode } from "react";

import { ProductCardSkeleton } from "@/components/product-card/product-card";
import { Link } from "@/components/ui/link";

interface ProductsGridSkeletonProps {
  count: number;
  className?: string;
}

export function ProductsGridSkeleton({ count, className }: ProductsGridSkeletonProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-5 lg:grid-cols-4", className)}>
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

interface ProductsGridProps {
  children: ReactNode;
  collectionUrl?: string;
  title: string;
}

export function ProductsGrid({ children, collectionUrl, title }: ProductsGridProps) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl">{title}</h2>
        {collectionUrl && (
          <Link
            href={collectionUrl}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View All
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
