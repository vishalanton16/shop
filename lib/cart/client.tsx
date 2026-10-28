"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

import { products } from "../product";

interface CartLine {
  handle: string;
  quantity: number;
}

type Panel = "cart" | "checkout" | null;
interface DemoCartContextValue {
  discount: boolean;
  lines: CartLine[];
  panel: Panel;
  setDiscount: (discount: boolean) => void;
  setPanel: (panel: Panel) => void;
  update: (handle: string, quantity: number) => void;
}

const STORAGE_KEY = "hollow-harvest-cart-v1";
const listeners = new Set<() => void>();
const DemoCartContext = createContext<DemoCartContextValue | null>(null);

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function readLines(value: string): CartLine[] {
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    const quantities = new Map<string, number>();
    for (const line of parsed) {
      if (
        line &&
        typeof line.handle === "string" &&
        products.some((product) => product.handle === line.handle) &&
        Number.isInteger(line.quantity) &&
        line.quantity > 0
      )
        quantities.set(line.handle, Math.min(99, line.quantity));
    }
    return [...quantities].map(([handle, quantity]) => ({ handle, quantity }));
  } catch {
    return [];
  }
}

export function useDemoCart() {
  const context = useContext(DemoCartContext);
  if (!context) throw new Error("DemoCartProvider is required");
  return context;
}

export function DemoCartProvider({ children }: { children: ReactNode }) {
  const serialized = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  const lines = useMemo(() => readLines(serialized), [serialized]);
  const [panel, setPanel] = useState<Panel>(null);
  const [discount, setDiscount] = useState(false);
  const [storageError, setStorageError] = useState(false);
  function update(handle: string, quantity: number) {
    const next = readLines(getSnapshot()).filter((line) => line.handle !== handle);
    if (quantity > 0 && products.some((product) => product.handle === handle))
      next.push({ handle, quantity: Math.min(99, quantity) });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setStorageError(false);
      listeners.forEach((listener) => listener());
    } catch {
      setStorageError(true);
    }
  }
  return (
    <DemoCartContext value={{ discount, lines, panel, setDiscount, setPanel, update }}>
      {children}
      {storageError && (
        <p
          className="fixed bottom-5 left-5 right-5 z-100 rounded-lg bg-background p-4 text-sm text-destructive shadow-lg"
          role="alert"
        >
          Your browser could not save the cart. Enable browser storage and try again.
        </p>
      )}
    </DemoCartContext>
  );
}
