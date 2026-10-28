import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import type { MenuItem } from "@/lib/menu/types";

import { MobileMenu } from "./mobile-menu";
import { QuickLinks } from "./quick-links";

interface NavProps {
  account?: ReactNode;
  cart: ReactNode;
  items?: MenuItem[];
  name: string;
  search: ReactNode;
}

export function Nav({
  account,
  cart,
  items = [{ id: "nav-shop", items: [], title: "Shop", url: "/collections/all" }],
  name,
  search,
}: NavProps) {
  return (
    <nav
      className="sticky top-0 z-30 w-full bg-background pt-[env(safe-area-inset-top,0px)] transition-shadow duration-250"
      id="nav-outer"
    >
      <Container className="flex h-16 items-center gap-2.5 md:gap-5">
        <MobileMenu items={items} />

        <Link className="flex items-center shrink-0" href="/">
          <span className="text-xl leading-4">{name}</span>
        </Link>

        <QuickLinks items={items} />

        <div className="flex items-center gap-5 ml-auto">
          {search}
          {account}
          {cart}
        </div>
      </Container>
    </nav>
  );
}
