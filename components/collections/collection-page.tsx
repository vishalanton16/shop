import { type ReactNode, Suspense } from "react";

import { BrowseResultsFallback } from "@/components/collections/browse";
import { CollectionBrowseFrame } from "@/components/collections/collection-browse-provider";
import { CollectionFiltersSkeleton } from "@/components/collections/filters";
import { PublishedCollectionFilters } from "@/components/collections/filters-client";
import { BrowseToolbar } from "@/components/collections/toolbar";
import { BreadcrumbSchema } from "@/components/schema/breadcrumb-schema";
import { CollectionSchema } from "@/components/schema/collection-schema";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import type { Collection, SortValue } from "@/lib/collections/types";

interface CollectionLayoutProps {
  children: ReactNode;
  collection: Collection;
  handle: string;
  sortExclude?: SortValue[];
}

export function CollectionLayout({
  children,
  collection,
  handle,
  sortExclude,
}: CollectionLayoutProps) {
  return (
    <>
      <Page className="pt-2.5 md:pt-10">
        <Container>
          <Sections className="gap-5">
            <CollectionHeader collection={collection} handle={handle} homeLabel="Home" />
            <CollectionBrowseFrame handle={handle} path={`/collections/${handle}`}>
              <BrowseToolbar
                filters={<PublishedCollectionFilters fallback={<CollectionFiltersSkeleton />} />}
                sortExclude={sortExclude}
              />
              {children}
            </CollectionBrowseFrame>
          </Sections>
        </Container>
      </Page>
    </>
  );
}

interface CollectionBrowseBoundaryProps {
  children: ReactNode;
}

export function CollectionBrowseBoundary({ children }: CollectionBrowseBoundaryProps) {
  return <Suspense fallback={<BrowseResultsFallback />}>{children}</Suspense>;
}

function CollectionHeader({
  collection,
  handle,
  homeLabel,
}: {
  collection: Collection;
  handle: string;
  homeLabel: string;
}) {
  const { title, description, updatedAt } = collection;

  const breadcrumbItems = [
    { name: homeLabel, path: "/" },
    { name: title, path: `/collections/${handle}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <CollectionSchema collection={{ handle, title, description, updatedAt }} />
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl">
          <Link href={`/collections/${handle}`}>{title}</Link>
        </h1>
        {description && <p className="mt-1 leading-6 text-muted-foreground">{description}</p>}
      </div>
    </>
  );
}
