import type { Image, Video } from "@/lib/media/types";
import type { Money } from "@/lib/money/types";
import type { PageInfo } from "@/lib/pagination/types";

export interface Product {
  alt: string;
  category: string;
  description: string;
  handle: string;
  height: number;
  image: string;
  price: number;
  title: string;
  width: number;
}

export interface ProductCard {
  availableForSale: boolean;
  compareAtPrice?: Money;
  featuredImage: Image | null;
  handle: string;
  id: string;
  isGiftCard: boolean;
  maxPrice: Money;
  price: Money;
  title: string;
  vendor?: string;
}

export interface ProductDetails extends ProductCard {
  currencyCode: string;
  description: string;
  images: Image[];
  priceRange: { maxVariantPrice: Money; minVariantPrice: Money };
  sku: string;
  videos: Video[];
}

export interface ProductPage {
  pageInfo: PageInfo;
  products: ProductCard[];
}
export interface OptionValueSwatch {
  color?: string;
  image?: string;
}
