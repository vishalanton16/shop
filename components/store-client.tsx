"use client";

import { MinusIcon, PlusIcon, Trash2Icon, XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { CartPageLayout } from "@/components/cart/cart-page";
import { CartLineItemLayout } from "@/components/cart/line-item";
import { CartOverlayLayout } from "@/components/cart/overlay";
import { CartButton } from "@/components/nav/cart-client";
import { BuyWithShopLogo } from "@/components/product-detail/buy-with-shop-logo";
import { QuantityPicker } from "@/components/product-detail/quantity-picker";
import { Price } from "@/components/product/price";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { shopConfig } from "@/lib/config";

import { useDemoCart } from "../lib/cart/client";
import { formatPrice, products } from "../lib/product";
import type { Product } from "../lib/product/types";

export function DemoCartIcon() {
  const { lines, setPanel } = useDemoCart();
  return (
    <CartButton
      cartLabel="Cart"
      onOpen={() => setPanel("cart")}
      quantity={lines.reduce((sum, line) => sum + line.quantity, 0)}
    />
  );
}

export function ProductPurchase({ onAdd, product }: { onAdd?: () => void; product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { lines, setPanel, update } = useDemoCart();
  function add(checkout = false) {
    update(
      product.handle,
      (lines.find((line) => line.handle === product.handle)?.quantity ?? 0) + quantity,
    );
    onAdd?.();
    setPanel(checkout ? "checkout" : "cart");
  }
  return (
    <div className="grid gap-2.5">
      <div className="flex flex-wrap gap-2.5">
        <QuantityPicker onChange={setQuantity} quantity={quantity} />
        <Button
          aria-label={`Add to Cart: ${product.title}`}
          className="h-12 min-w-40 flex-1 justify-center"
          onClick={() => add()}
        >
          Add to Cart
        </Button>
      </div>
      <button
        aria-label="Buy with Shop Pay, demo preview"
        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-shop px-4 text-white transition-colors hover:bg-shop/85"
        onClick={() => add(true)}
      >
        <span className="sr-only">Buy with</span>
        <BuyWithShopLogo aria-hidden className="h-auto w-24.5" />
      </button>
      <p className="text-xs text-muted-foreground">Local demo. No payment or order is submitted.</p>
    </div>
  );
}

export function DemoOverlays() {
  const { lines, panel, setPanel } = useDemoCart();
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  return (
    <>
      <CartOverlayLayout
        count={
          count > 0 ? (
            <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-xs text-background">
              {count}
            </span>
          ) : null
        }
        description="Review your cart items and proceed to checkout"
        onOpenChange={(open) => setPanel(open ? "cart" : null)}
        open={panel === "cart"}
        title="Cart"
      >
        <CartDrawerContents />
      </CartOverlayLayout>
      <Dialog
        onOpenChange={(open) => setPanel(open ? "checkout" : null)}
        open={panel === "checkout"}
      >
        <DialogContent>
          <DialogTitle>Demo checkout</DialogTitle>
          <DialogDescription>
            This local demo stops before payment. No order will be placed.
          </DialogDescription>
          <CheckoutContents />
        </DialogContent>
      </Dialog>
    </>
  );
}

function CartDrawerContents() {
  const { lines, setPanel } = useDemoCart();
  if (lines.length === 0)
    return (
      <div className="flex h-full flex-col gap-5 px-2.5">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h3 className="mb-6 text-2xl">Your cart is empty</h3>
          <Button className="h-12 px-8" render={<Link href="/" onClick={() => setPanel(null)} />}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  return (
    <div className="flex h-full flex-col">
      <div className="grid flex-1 content-start gap-5 overflow-y-auto px-2.5 py-5">
        <CartLineItems />
      </div>
      <footer className="px-2.5 pt-5 pb-2.5">
        <CartSummary />
      </footer>
    </div>
  );
}

export function CartContents() {
  const { lines } = useDemoCart();
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  if (!count)
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-10 px-5">
        <h2 className="text-2xl sm:text-3xl">Your cart is empty</h2>
        <Button className="h-12 px-8" render={<Link href="/" />}>
          Continue Shopping
        </Button>
      </div>
    );
  return (
    <CartPageLayout
      count={
        <span className="flex size-7 items-center justify-center rounded-full bg-foreground text-sm text-background">
          {count}
        </span>
      }
      summary={<CartSummary />}
    >
      <CartLineItems />
    </CartPageLayout>
  );
}

function CartLineItems() {
  const { lines, setPanel, update } = useDemoCart();
  return (
    <ul aria-label="Cart items" className="grid gap-5">
      {lines.map((line) => {
        const product = products.find((item) => item.handle === line.handle)!;
        return (
          <CartLineItemLayout
            key={line.handle}
            title={product.title}
            image={
              <Link
                className="relative size-18 shrink-0 cursor-pointer self-start overflow-hidden transition-opacity hover:opacity-80"
                href={`/products/${product.handle}`}
                onClick={() => setPanel(null)}
              >
                <Image
                  alt={product.alt}
                  className="object-cover"
                  fill
                  sizes="100vw"
                  src={product.image}
                />
              </Link>
            }
            price={
              <div className="grid gap-0.5 self-start py-0.5 text-right font-mono text-sm tabular-nums tracking-tight">
                <span className="font-medium text-foreground">{formatPrice(product.price)}</span>
              </div>
            }
          >
            <div className="grid min-h-18 min-w-0 flex-1 gap-2.5 pt-0.5">
              <Link
                className="cursor-pointer transition-opacity hover:opacity-70"
                href={`/products/${product.handle}`}
                onClick={() => setPanel(null)}
              >
                <h3 className="line-clamp-1 text-sm font-medium text-foreground">
                  {product.title}
                </h3>
              </Link>
              <div className="flex items-center gap-1.5 self-end">
                <div
                  aria-label="Item quantity"
                  className="grid h-6 grid-cols-[1.75rem_1.5rem_1.75rem] rounded-full ring-1 ring-border ring-inset"
                  role="group"
                >
                  <button
                    aria-label={`Decrease quantity: ${product.title}`}
                    className="flex h-6 cursor-pointer items-center justify-center p-0 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={line.quantity <= 1}
                    onClick={() => update(line.handle, line.quantity - 1)}
                  >
                    <MinusIcon className="size-3 shrink-0" />
                  </button>
                  <input
                    aria-label={`Quantity: ${product.title}`}
                    className="h-6 w-6 rounded-full bg-transparent text-center text-xs font-medium tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    inputMode="numeric"
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      if (Number.isInteger(value) && value >= 0 && value <= 99)
                        update(line.handle, value);
                    }}
                    value={line.quantity}
                  />
                  <button
                    aria-label={`Increase quantity: ${product.title}`}
                    className="flex h-6 cursor-pointer items-center justify-center p-0 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={line.quantity >= 99}
                    onClick={() => update(line.handle, line.quantity + 1)}
                  >
                    <PlusIcon className="size-3 shrink-0" />
                  </button>
                </div>
                <button
                  aria-label={`Remove item: ${product.title}`}
                  className="flex cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => update(line.handle, 0)}
                >
                  <Trash2Icon className="size-4" />
                </button>
              </div>
            </div>
          </CartLineItemLayout>
        );
      })}
    </ul>
  );
}

function CartSummary() {
  const { discount, lines, setDiscount, setPanel } = useDemoCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const subtotal = lines.reduce(
    (sum, line) =>
      sum + products.find((product) => product.handle === line.handle)!.price * line.quantity,
    0,
  );
  const total = subtotal * (discount ? 0.9 : 1);
  return (
    <div className="grid gap-5">
      <div className="grid gap-2.5">
        <div className="grid gap-2.5">
          <form
            className="flex gap-2.5"
            onSubmit={(event) => {
              event.preventDefault();
              if (code.trim().toUpperCase() === "SPOOKY10") {
                setDiscount(true);
                setCode("");
                setError("");
              } else setError("This demo code is not valid. Try SPOOKY10.");
            }}
          >
            <Input
              aria-label="Discount code"
              className="flex-1"
              onChange={(event) => {
                setCode(event.target.value);
                setError("");
              }}
              placeholder="Discount code"
              value={code}
            />
            <Button disabled={!code.trim()} type="submit">
              Apply
            </Button>
          </form>
          {error && (
            <p className="text-xs text-destructive" role="alert">
              {error}
            </p>
          )}
          {discount && (
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-xs text-primary-foreground">
                SPOOKY10
                <button
                  aria-label="Remove discount: SPOOKY10"
                  className="flex size-4 items-center justify-center"
                  onClick={() => setDiscount(false)}
                >
                  <XIcon className="size-3" />
                </button>
              </span>
            </div>
          )}
        </div>
        <div aria-label="Estimated total" className="grid gap-1" role="group">
          <div className="flex items-baseline justify-between text-base text-foreground">
            <span>Estimated total</span>
            <Price
              amount={String(total)}
              className="font-medium text-xl"
              currencyCode={shopConfig.currencyCode}
            />
          </div>
          <p className="text-xs text-muted-foreground">Local demo. No orders or payments.</p>
        </div>
      </div>
      <Button className="h-12 w-full justify-center" onClick={() => setPanel("checkout")}>
        Go to Checkout
      </Button>
    </div>
  );
}

function CheckoutContents() {
  const { discount, lines, setPanel } = useDemoCart();
  const total =
    lines.reduce(
      (sum, line) =>
        sum + products.find((product) => product.handle === line.handle)!.price * line.quantity,
      0,
    ) * (discount ? 0.9 : 1);
  return (
    <div className="grid gap-5">
      {lines.map((line) => (
        <div className="flex justify-between gap-4 text-sm" key={line.handle}>
          <span>
            {products.find((product) => product.handle === line.handle)!.title} × {line.quantity}
          </span>
          <span className="whitespace-nowrap font-mono">
            {formatPrice(
              products.find((product) => product.handle === line.handle)!.price * line.quantity,
            )}
          </span>
        </div>
      ))}
      <div className="flex justify-between border-t pt-5">
        <span>Total{discount ? " after discount" : ""}</span>
        <Price amount={String(total)} currencyCode={shopConfig.currencyCode} />
      </div>
      <Button onClick={() => setPanel("cart")}>Back to cart</Button>
    </div>
  );
}
