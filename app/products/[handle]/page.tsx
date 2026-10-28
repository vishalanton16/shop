import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import {
  ProductDetailSection,
  ProductDetailSkeleton,
} from "@/components/product-detail/product-detail-section";
import { ProductsGrid } from "@/components/product/products-grid";
import { Container } from "@/components/ui/container";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";

import { ProductGrid } from "../../../components/product-card";
import { ProductPurchase } from "../../../components/store-client";
import { products } from "../../../lib/product";
import { toProductDetails } from "../../../lib/product/server";

export function generateStaticParams() {
  return products.map(({ handle }) => ({ handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = products.find((item) => item.handle === handle);
  return product
    ? { description: product.description, title: product.title }
    : { title: "Product not found" };
}

export default function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  return (
    <Page className="pt-0">
      <Container className="bg-background">
        <Sections>
          <Suspense fallback={<ProductDetailSkeleton />}>
            <ProductDetails params={params} />
          </Suspense>
        </Sections>
      </Container>
    </Page>
  );
}

async function ProductDetails({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = products.find((item) => item.handle === handle);
  if (!product) notFound();
  const details = toProductDetails(product);
  return (
    <>
      <ProductDetailSection product={details} purchase={<ProductPurchase product={product} />} />
      <ProductsGrid collectionUrl="/collections/all" title="Related Products">
        <ProductGrid items={products.filter((item) => item.handle !== handle).slice(0, 4)} />
      </ProductsGrid>
    </>
  );
}
