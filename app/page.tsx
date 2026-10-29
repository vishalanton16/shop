import { ProductsGrid } from "@/components/product/products-grid";
import { Container } from "@/components/ui/container";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";

import { ProductGrid } from "../components/product-card";
import { products } from "../lib/product";

export default function HomePage() {
  return (
    <Page className="pt-0">
      <Sections className="gap-6">
        <section className="flex items-center justify-center px-5 pt-10 pb-4 lg:px-10">
          <div className="flex flex-col items-center text-center gap-2.5">
            <h1 className="text-3xl md:text-5xl max-w-3xl text-foreground">
              A little spooky. A lot of autumn.
            </h1>
            <p className="text-sm md:text-base max-w-xl text-foreground">
              Pumpkins, lanterns, and a few good ghosts. Halloween starts here.
            </p>
          </div>
        </section>
        <Container>
          <ProductsGrid collectionUrl="/collections/all" title="Products">
            <ProductGrid eagerCount={4} items={products} juggle />
          </ProductsGrid>
        </Container>
      </Sections>
    </Page>
  );
}
