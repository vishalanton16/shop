"use client";
import type { ReactNode } from "react";

interface CartLineItemLayoutProps {
  children: ReactNode;
  image: ReactNode;
  pending?: boolean;
  price: ReactNode;
  title: string;
}

export function CartLineItemLayout({
  children,
  image,
  pending,
  price,
  title,
}: CartLineItemLayoutProps) {
  return (
    <li className="flex gap-2.5" aria-busy={pending || undefined} aria-label={title}>
      {image}
      {children}
      {price}
    </li>
  );
}
