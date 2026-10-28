import type { ComponentProps } from "react";

interface ProductInfoDescriptionProps extends ComponentProps<"div"> {
  description: string;
}
export function ProductInfoDescription({ description, ...props }: ProductInfoDescriptionProps) {
  if (!description) return null;
  return (
    <div data-slot="product-info-description" {...props}>
      <div className="prose prose-sm text-foreground/80">
        <p>{description}</p>
      </div>
    </div>
  );
}
