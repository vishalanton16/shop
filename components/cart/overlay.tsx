"use client";
import { XIcon } from "lucide-react";
import type { ReactNode } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

interface CartOverlayLayoutProps {
  children: ReactNode;
  count: ReactNode;
  description: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  title: string;
}

export function CartOverlayLayout({
  children,
  count,
  description,
  onOpenChange,
  open,
  title,
}: CartOverlayLayoutProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent closeButton={false} overlay={false} side="right" className="gap-0 p-0">
        <div className="flex h-16 shrink-0 items-center justify-between gap-2 px-2.5">
          <div className="flex items-center gap-1.5">
            <SheetTitle className="font-normal text-xl leading-4">{title}</SheetTitle>
            {count}
          </div>
          <SheetClose
            aria-label="Close cart"
            className="flex cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <XIcon className="size-5" />
          </SheetClose>
        </div>
        <SheetDescription className="sr-only">{description}</SheetDescription>
        {children}
      </SheetContent>
    </Sheet>
  );
}
