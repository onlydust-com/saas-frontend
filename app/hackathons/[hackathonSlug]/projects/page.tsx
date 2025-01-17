"use client";

import { useMemo, useState } from "react";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";
import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";
import { GetHackathonProjectsV2QueryParams } from "@/core/domain/hackathon/hackathon-contract.types";

import { Typo } from "@/design-system/atoms/typo";
import {
  CardProjectMarketplace,
  CardProjectMarketplaceLoading,
} from "@/design-system/molecules/cards/card-project-marketplace";
import { TableSearch } from "@/design-system/molecules/table-search/variants/table-search-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { FilterData } from "./_components/filter-data/filter-data";
import { useHackathonProjectsFilterDataSidePanel } from "./_components/filter-data/filter-data.hooks";

export type HackathonProjectsFilters = Omit<NonNullable<GetHackathonProjectsV2QueryParams>, "pageSize" | "pageIndex">;

const mockProjects = Array.from({ length: 9 }).map((_, index) => ({
  id: `mock-project-${index}`,
  name: "Why did you unblur me?",
  slug: `mock-project-${index}`,
  shortDescription:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius voluptates aliquid eligendi et vero, optio temporibus dolores deserunt, deleniti minima quaerat voluptatum placeat quidem? Veritatis quidem hic incidunt in est!",
  contributorCount: 6,
  starCount: 6,
  forkCount: 6,
  odhackIssueCount: 42,
}));

export default function HackathonProjectsPage({ params }: { params: { hackathonSlug: string } }) {
  const [search, setSearch] = useState<string>();
  const { open: openFilterPanel } = useHackathonProjectsFilterDataSidePanel();
  const [filters, setFilters] = useState<HackathonProjectsFilters>({});
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const queryParams: Partial<GetHackathonProjectsV2QueryParams> = {
    search: debouncedSearch,
    ...filters,
  };

  const { data: hackathon } = HackathonReactQueryAdapter.client.useGetHackathonBySlug({
    pathParams: {
      hackathonSlug: params.hackathonSlug,
    },
    options: {
      enabled: Boolean(params.hackathonSlug),
    },
  });

  const { data: hackathonRegistration } = MeReactQueryAdapter.client.useGetMyHackathonRegistration({
    pathParams: { hackathonId: hackathon?.id ?? "" },
    options: {
      enabled: Boolean(hackathon?.id),
    },
  });

  const isRegistered = hackathonRegistration?.isRegistered ?? false;
  const canAccessProjects = hackathon?.isPast() || isRegistered;

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    HackathonReactQueryAdapter.client.useGetHackathonProjects({
      pathParams: {
        hackathonSlug: params.hackathonSlug,
      },
      queryParams,
      options: {
        enabled: Boolean(params.hackathonSlug) && canAccessProjects,
      },
    });

  const projects = useMemo(() => data?.pages.flatMap(({ projects }) => projects) ?? [], [data]);
  const totalItemNumber = useMemo(() => data?.pages[0]?.totalItemNumber ?? 0, [data]);

  const renderProjects = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => <CardProjectMarketplaceLoading key={index} />);
    }

    if (isError) {
      return (
        <div className="col-span-full p-lg">
          <ErrorState />
        </div>
      );
    }

    if (!projects.length) {
      return (
        <div className="col-span-full p-lg">
          <EmptyStateLite />
        </div>
      );
    }

    return projects.map(project => (
      <CardProjectMarketplace
        key={project.id}
        as={BaseLink}
        htmlProps={{
          href: NEXT_ROUTER.projects.details.issues.root(project.slug),
        }}
        name={project.name}
        slug={project.slug}
        description={project.shortDescription}
        logoUrl={project.logoUrl}
        contributorCount={project.contributorCount}
        starCount={project.starCount}
        forkCount={project.forkCount}
        odhackIssueCount={project.odHackStats?.issueCount}
        categories={project.categories}
        languages={project.languages}
        ecosystems={project.ecosystems}
      />
    ));
  }, [isLoading, isError, projects]);

  const renderMockProjects = useMemo(() => {
    return mockProjects.map(project => (
      <CardProjectMarketplace
        key={project.id}
        name={project.name}
        slug={project.slug}
        description={project.shortDescription}
        contributorCount={project.contributorCount}
        starCount={project.starCount}
        forkCount={project.forkCount}
        odhackIssueCount={project.odhackIssueCount}
      />
    ));
  }, [isLoading, isError, projects]);

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Hackathons",
            href: NEXT_ROUTER.hackathons.root,
          },
          {
            id: "slug",
            label: params.hackathonSlug,
          },
          {
            id: "projects",
            label: <Translate token={"hackathon:details.tabs.projects"} />,
          },
        ]}
      />
      <div className="flex h-full flex-col gap-lg overflow-hidden p-lg pb-0">
        {canAccessProjects ? (
          <nav className={"flex gap-md"}>
            <FilterButton onClick={openFilterPanel} />
            <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
          </nav>
        ) : null}

        <div className="relative h-full">
          <ScrollView
            className={cn("max-h-[calc(100%-2rem)]", {
              "blur-xl": !canAccessProjects,
            })}
          >
            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {canAccessProjects ? renderProjects : renderMockProjects}

              {hasNextPage ? (
                <div className="col-span-full">
                  <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} />
                </div>
              ) : null}
            </div>
          </ScrollView>

          {!canAccessProjects ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <Typo>Register now to access the full project list</Typo>
            </div>
          ) : null}
        </div>

        {canAccessProjects ? (
          <div className="flex gap-md">
            <Typo size={"sm"} color={"secondary"} translate={{ token: "hackathon:details.projects.projectsCount" }} />
            <Typo size={"sm"} color={"primary"}>
              {totalItemNumber}
            </Typo>
          </div>
        ) : null}
      </div>
      <FilterData />
    </FilterDataProvider>
  );
}
