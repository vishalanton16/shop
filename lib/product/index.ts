import { formatPrice as formatMoney } from "@/lib/money";
import type { ProductCard } from "@/lib/product/types";

import catalog from "./catalog.json";
import type { Product } from "./types";

export const products: Product[] = catalog;
export const categories = ["All", "Pumpkins", "Lights & Lanterns", "Porch Decor", "Table Decor"];

export function formatPrice(amount: number) {
  return formatMoney({ amount: String(amount), currencyCode: "INR" });
}

export function toProductCard(product: Product): ProductCard {
  const price = { amount: String(product.price), currencyCode: "INR" };
  return {
    availableForSale: true,
    featuredImage: {
      altText: product.alt,
      height: product.height,
      url: product.image,
      width: product.width,
    },
    handle: product.handle,
    id: `demo-${product.handle}`,
    isGiftCard: false,
    maxPrice: price,
    price,
    title: product.title,
    vendor: "Hollow & Harvest",
  };
}

export function isMarkedDown(
  amount: string,
  compareAtAmount: string | undefined,
): compareAtAmount is string {
  return compareAtAmount !== undefined && Number(compareAtAmount) > Number(amount);
}

// A markdown under 0.5% rounds to 0, which would render a "0% OFF" badge.
export function getDiscountPercent(
  amount: string,
  compareAtAmount: string | undefined,
): number | null {
  if (!isMarkedDown(amount, compareAtAmount)) return null;
  const compareAt = Number(compareAtAmount);
  const percent = Math.round(((compareAt - Number(amount)) / compareAt) * 100);
  return percent >= 1 ? percent : null;
}
