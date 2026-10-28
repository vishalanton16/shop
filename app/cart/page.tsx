import type { Metadata } from "next";

import { CartContents } from "../../components/store-client";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return <CartContents />;
}
