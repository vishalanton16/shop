import { toProductCard } from "./index";
import type { ProductDetails } from "./types";
import type { Product } from "./types";

export function toProductDetails(product: Product): ProductDetails {
  const card = toProductCard(product);
  return {
    ...card,
    currencyCode: "INR",
    description: product.description,
    images: card.featuredImage ? [card.featuredImage] : [],
    priceRange: { maxVariantPrice: card.price, minVariantPrice: card.price },
    sku: `HH-${product.handle}`,
    videos: [],
  };
}
