import Image from "next/image";
import type { ReactNode } from "react";

import { DialogTitle } from "@/components/ui/dialog";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Link } from "@/components/ui/link";

interface QuickShopLayoutProps {
  children: ReactNode;
  image: string | null;
  title: string;
}

export function QuickShopLayout({ children, image, title }: QuickShopLayoutProps) {
  return (
    <div className="grid min-h-0 sm:aspect-[2/1] sm:grid-cols-2 sm:grid-rows-[auto_minmax(0,1fr)]">
      <div className="relative aspect-square overflow-hidden sm:row-span-2">
        {image ? (
          <Image alt={title} className="object-cover" fill sizes="100vw" src={image} />
        ) : (
          <ImagePlaceholder className="size-full" />
        )}
      </div>
      {children}
    </div>
  );
}

interface QuickShopPurchasePanelProps {
  children: ReactNode;
  price: ReactNode;
  title: string;
}

export function QuickShopPurchasePanel({ children, price, title }: QuickShopPurchasePanelProps) {
  return (
    <div className="contents">
      <div className="sticky top-0 z-10 order-first grid min-w-0 grid-cols-[minmax(0,1fr)_1.25rem] gap-2.5 bg-background p-5 pb-2.5 sm:static sm:order-none">
        <div className="min-w-0">
          <DialogTitle className="text-2xl leading-snug font-normal break-words">
            {title}
          </DialogTitle>
          {price}
        </div>
      </div>
      <div className="grid min-h-0 min-w-0 content-start gap-4 px-5 pb-5 sm:overflow-y-auto sm:overscroll-contain">
        {children}
      </div>
    </div>
  );
}

interface QuickShopDetailsLinkProps {
  href: string;
  onNavigate: () => void;
}

export function QuickShopDetailsLink({ href, onNavigate }: QuickShopDetailsLinkProps) {
  return (
    <Link
      className="w-fit cursor-pointer text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
      href={href}
      onNavigate={onNavigate}
    >
      View full details
    </Link>
  );
}
