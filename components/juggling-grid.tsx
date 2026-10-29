"use client";

import {
  type ReactNode,
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface JugglingGridProps {
  cards: { content: ReactNode; handle: string }[];
  className: string;
}

export function JugglingGrid({ cards, className }: JugglingGridProps) {
  const [order, setOrder] = useState(cards.map(({ handle }) => handle));
  const nodes = useRef(new Map<string, HTMLDivElement>());
  const positions = useRef(new Map<string, DOMRect>());
  const animations = useRef(new Map<string, Animation>());

  function capturePositions() {
    positions.current = new Map(
      [...nodes.current].map(([handle, node]) => [handle, node.getBoundingClientRect()]),
    );
  }

  function shuffle() {
    capturePositions();
    const next = [...order];
    // A single-cycle permutation moves every card without changing its identity.
    for (let index = next.length - 1; index > 0; index--) {
      const target = Math.floor(Math.random() * index);
      [next[index], next[target]] = [next[target]!, next[index]!];
    }
    setOrder(next);
  }

  const tick = useEffectEvent(() => {
    if (document.visibilityState === "visible") shuffle();
  });

  useEffect(() => {
    const timer = window.setInterval(tick, 1800);
    return () => window.clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    for (const animation of animations.current.values()) animation.cancel();
    animations.current.clear();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      positions.current.clear();
      return;
    }

    for (const handle of order) {
      const node = nodes.current.get(handle);
      const previous = positions.current.get(handle);
      if (!node || !previous || typeof node.animate !== "function") continue;
      const current = node.getBoundingClientRect();
      const x = previous.left - current.left;
      const y = previous.top - current.top;
      if (x === 0 && y === 0) continue;

      animations.current.set(
        handle,
        node.animate(
          [{ transform: `translate(${x}px, ${y}px)` }, { transform: "translate(0, 0)" }],
          { duration: 900, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        ),
      );
    }
    positions.current.clear();
  }, [order]);

  useEffect(() => {
    const active = animations.current;
    return () => {
      for (const animation of active.values()) animation.cancel();
    };
  }, []);

  return (
    <div className={className}>
      {order.map((handle) => (
        <div
          className="min-w-0"
          data-product-handle={handle}
          key={handle}
          ref={(node) => {
            if (node) nodes.current.set(handle, node);
            else nodes.current.delete(handle);
          }}
        >
          {cards.find((card) => card.handle === handle)?.content}
        </div>
      ))}
    </div>
  );
}
