"use client";
import type { ComponentProps, ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";

interface CartPageLayoutProps extends ComponentProps<"div"> {
  count: ReactNode;
  summary: ReactNode;
  warnings?: ReactNode;
}

export function CartPageLayout({
  children,
  count,
  summary,
  warnings,
  ...props
}: CartPageLayoutProps) {
  return (
    <Page {...props}>
      <Container>
        <Sections>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl">Cart</h1>
            {count}
          </div>
          {warnings}
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="lg:col-span-8 xl:col-span-9">{children}</div>
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="lg:sticky lg:top-20">{summary}</div>
            </aside>
          </div>
        </Sections>
      </Container>
    </Page>
  );
}
