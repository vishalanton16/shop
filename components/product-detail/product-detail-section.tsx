import type { ReactNode } from "react";

import { BreadcrumbSchema } from "@/components/schema/breadcrumb-schema";
import { shopConfig } from "@/lib/config";
import type { ProductDetails } from "@/lib/product/types";

import { ProductOpenGraph } from "./open-graph";
import { ProductInfoDescription } from "./product-info";
import { ProductMedia } from "./product-media";
import { ProductPrice } from "./product-price";
import { ProductSchema } from "./schema";

export function ProductDetailSection({
  product,
  purchase,
}: {
  product: ProductDetails;
  purchase: ReactNode;
}) {
  return (
    <>
      <ProductSchema
        product={{
          handle: product.handle,
          title: product.title,
          description: product.description,
          images: product.images,
          vendor: product.vendor,
          currencyCode: product.currencyCode,
          priceRange: product.priceRange,
          offerCount: 1,
          availableForSale: product.availableForSale,
          sku: product.sku,
        }}
      />
      <ProductOpenGraph availableForSale={product.availableForSale} price={product.price} />
      <BreadcrumbSchema
        items={[
          { name: shopConfig.site.name, path: "/" },
          { name: product.title, path: `/products/${product.handle}` },
        ]}
      />
      <div className="grid gap-10 lg:grid-cols-10 lg:items-start lg:gap-5">
        <ProductMedia
          otherImages={product.images}
          videos={product.videos}
          title={product.title}
          className="lg:col-span-6"
        />
        <div className="grid gap-10 lg:sticky lg:top-20 lg:col-span-4">
          <div className="grid data-[uniform-price=true]:gap-10" data-uniform-price="true">
            <div data-slot="product-info-header">
              <h1 className="text-foreground text-3xl">{product.title}</h1>
              <ProductPrice amount={product.price.amount} currencyCode={product.currencyCode} />
            </div>
            {purchase}
          </div>
          <ProductInfoDescription description={product.description} />
        </div>
      </div>
    </>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div aria-busy="true" className="grid gap-10 lg:grid-cols-10 lg:gap-5">
      <div className="aspect-square animate-pulse bg-muted lg:col-span-6" />
      <div className="grid content-start gap-10 lg:col-span-4">
        <div className="h-9 w-3/4 animate-pulse bg-muted" />
        <div className="h-7 w-24 animate-pulse bg-muted" />
        <div className="h-12 animate-pulse bg-muted" />
      </div>
    </div>
  );
}
