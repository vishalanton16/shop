"use client";
import { HandbagIcon } from "lucide-react";

interface CartButtonProps {
  cartLabel: string;
  onOpen: () => void;
  quantity: number;
}

export function CartButton({ cartLabel, onOpen, quantity }: CartButtonProps) {
  return (
    <button
      onClick={onOpen}
      className="flex cursor-pointer items-center justify-center gap-1.5 text-foreground hover:text-foreground/80 transition-colors"
      type="button"
    >
      <span className="relative">
        <HandbagIcon className="size-5" />
        {quantity > 0 && (
          <span className="absolute -top-2 -right-1 flex size-4 items-center justify-center rounded-full bg-foreground text-xxs leading-none text-background">
            {quantity}
          </span>
        )}
      </span>
      <span className="sr-only">{cartLabel}</span>
    </button>
  );
}
