"use client";

import { MinusIcon, PlusIcon } from "lucide-react";

interface QuantityPickerProps {
  onChange: (quantity: number) => void;
  quantity: number;
}

export function QuantityPicker({ onChange, quantity }: QuantityPickerProps) {
  return (
    <div
      aria-label="Item quantity"
      className="grid h-12 w-32 shrink-0 grid-cols-[3rem_2rem_3rem] rounded-lg bg-background ring-1 ring-border ring-inset"
      role="group"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        className="flex size-12 cursor-pointer items-center justify-center p-0 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={quantity === 1}
        onClick={() => onChange(Math.max(1, quantity - 1))}
      >
        <MinusIcon className="size-4 shrink-0" />
      </button>
      <span
        aria-live="polite"
        className="flex h-12 w-8 items-center justify-center text-sm font-medium tabular-nums"
        role="status"
      >
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="flex size-12 cursor-pointer items-center justify-center p-0 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={quantity === 99}
        onClick={() => onChange(Math.min(99, quantity + 1))}
      >
        <PlusIcon className="size-4 shrink-0" />
      </button>
    </div>
  );
}
