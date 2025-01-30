"use client";

import { useCallback, useMemo } from "react";

import {
  BrowseProjectsContextProvider,
  useBrowseProjectsContext,
} from "@/app/(saas)/projects/_features/browse-projects-filters/browse-projects-filters.context";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import {
  CardProjectMarketplace,
  CardProjectMarketplaceLoading,
} from "@/design-system/molecules/cards/card-project-marketplace";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { PROJECT_TAG, PROJECT_TAG_METADATA } from "@/shared/constants/project-tags";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { TypographyH2, TypographySmall } from "@/shared/ui/typography";

import { BrowseProjectsFilters } from "../browse-projects-filters/browse-projects-filters";

const ALL_TAB = {
  id: "ALL",
  children: "All",
} as const;

const TABS: { id: PROJECT_TAG | "ALL"; children: string }[] = [
  ALL_TAB,
  ...Object.values(PROJECT_TAG).map(tag => ({
    id: tag,
    children: PROJECT_TAG_METADATA[tag].label,
  })),
];

function Safe() {
  const { filters, queryParams } = useBrowseProjectsContext();

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProjectReactQueryAdapter.client.useGetProjectsV2({
      queryParams,
    });

  const projects = useMemo(() => data?.pages.flatMap(({ projects }) => projects) ?? [], [data]);
  const count = useMemo(() => data?.pages[0]?.totalItemNumber ?? 0, [data]);

  const renderProjects = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => <CardProjectMarketplaceLoading key={index} />);
    }

    if (isError) {
      return (
        <div className="col-span-full py-40">
          <ErrorState />
        </div>
      );
    }

    if (!projects.length) {
      return (
        <div className="col-span-full py-40">
          <EmptyStateLite />
        </div>
      );
    }

    return projects.map(project => (
      <CardProjectMarketplace
        key={project.id}
        as={BaseLink}
        htmlProps={{
          href: NEXT_ROUTER.projects.details.root(project.slug),
        }}
        name={project.name}
        slug={project.slug}
        description={project.shortDescription}
        logoUrl={project.logoUrl}
        contributorCount={project.contributorCount}
        starCount={project.starCount}
        forkCount={project.forkCount}
        availableIssueCount={project.availableIssueCount}
        goodFirstIssueCount={project.goodFirstIssueCount}
        categories={project.categories}
        languages={project.languages}
        ecosystems={project.ecosystems}
        tags={project.tags}
      />
    ));
  }, [projects, isError, isLoading]);

  return (
    <section className={"flex flex-col gap-3xl"}>
      <header className="flex flex-col gap-md">
        <div className="flex gap-2">
          <TypographyH2>Browse Projects</TypographyH2>
          <TypographyH2 className="text-muted-foreground">({count})</TypographyH2>
        </div>

        <TypographySmall>
          Discover innovative ideas, creative solutions, and detailed work that showcases unique expertise and impactful
          results.
        </TypographySmall>
      </header>

      <div className="flex flex-col gap-3xl">
        <header className="flex flex-row items-start justify-between gap-xl">
          <Tabs
            variant={"flat"}
            tabs={TABS}
            selectedId={filters.values.tags[0] ?? ALL_TAB.id}
            onTabClick={id => {
              filters.set({ tags: id === ALL_TAB.id ? [] : [id as PROJECT_TAG] });
            }}
            classNames={{
              base: "flex-wrap",
            }}
          />

          <BrowseProjectsFilters />
        </header>

        <div className="grid gap-4 mobile:grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4">
          {renderProjects()}
          {hasNextPage ? (
            <div className="col-span-full">
              <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function BrowseProjects() {
  return (
    <BrowseProjectsContextProvider>
      <Safe />
    </BrowseProjectsContextProvider>
  );
}
