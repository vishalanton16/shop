import { cn } from "cn";

import { ProductCard } from "@/components/product-card/product-card";

import { toProductCard } from "../lib/product";
import type { Product } from "../lib/product/types";
import { DemoQuickShop } from "./quick-shop";

interface ProductGridProps {
  className?: string;
  eagerCount?: number;
  items: Product[];
}

export function ProductGrid({ className, eagerCount = 0, items }: ProductGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-5 lg:grid-cols-4", className)}>
      {items.map((product, index) => (
        <DemoProductCard eager={index < eagerCount} key={product.handle} product={product} />
      ))}
    </div>
  );
}

export function DemoProductCard({ eager = false, product }: { eager?: boolean; product: Product }) {
  return (
    <ProductCard
      loading={eager ? "eager" : "lazy"}
      product={toProductCard(product)}
      quickShop={<DemoQuickShop product={product} />}
    />
  );
}
