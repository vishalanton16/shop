"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { PlusIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";

import {
  QuickShopDetailsLink,
  QuickShopLayout,
  QuickShopPurchasePanel,
} from "@/components/product-card/quick-shop";
import { Price } from "@/components/product/price";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { shopConfig } from "@/lib/config";

import type { Product } from "../lib/product/types";
import { ProductPurchase } from "./store-client";

export function DemoQuickShop({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [cartHandoff, setCartHandoff] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <Dialog
      onOpenChange={(next) => {
        if (next) setCartHandoff(false);
        setOpen(next);
      }}
      open={open}
    >
      <DialogTrigger
        render={
          <button
            aria-label={`Choose: ${product.title}`}
            className="absolute right-2.5 bottom-2.5 z-10 hidden size-9 cursor-pointer items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background lg:flex"
            type="button"
          >
            <PlusIcon className="size-4" />
          </button>
        }
      />
      <DialogContent
        aria-describedby={undefined}
        className="flex max-h-[calc(100dvh-2.5rem)] w-[calc(100%-2.5rem)] max-w-3xl flex-col gap-0 overflow-clip p-0 sm:max-w-[min(48rem,calc(200dvh-5rem-2px))]"
        finalFocus={cartHandoff ? false : undefined}
        initialFocus={closeButtonRef}
        showCloseButton={false}
      >
        <div className="min-h-0 overflow-y-auto overscroll-contain sm:overflow-visible">
          <QuickShopLayout image={product.image} title={product.title}>
            <QuickShopPurchasePanel
              price={
                <Price amount={String(product.price)} currencyCode={shopConfig.currencyCode} />
              }
              title={product.title}
            >
              <ProductPurchase
                onAdd={() => {
                  setCartHandoff(true);
                  setOpen(false);
                }}
                product={product}
              />
              <QuickShopDetailsLink
                href={`/products/${product.handle}`}
                onNavigate={() => setOpen(false)}
              />
            </QuickShopPurchasePanel>
          </QuickShopLayout>
        </div>
        <DialogPrimitive.Close
          aria-label="Close quick shop"
          className="absolute top-6.5 right-5 z-10 flex size-5 cursor-pointer items-center justify-center text-foreground transition-colors hover:text-foreground/80 focus-visible:outline-2 focus-visible:outline-offset-2"
          ref={closeButtonRef}
        >
          <XIcon className="size-5" />
        </DialogPrimitive.Close>
      </DialogContent>
    </Dialog>
  );
}
