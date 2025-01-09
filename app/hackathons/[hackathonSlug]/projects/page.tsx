"use client";

import { useMemo, useState } from "react";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";
import { GetHackathonProjectsV2QueryParams } from "@/core/domain/hackathon/hackathon-contract.types";

import { Typo } from "@/design-system/atoms/typo";
import {
  CardProjectMarketplace,
  CardProjectMarketplaceLoading,
} from "@/design-system/molecules/cards/card-project-marketplace";
import { TableSearch } from "@/design-system/molecules/table-search/variants/table-search-default";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { FilterData } from "./_components/filter-data/filter-data";
import { useHackathonProjectsFilterDataSidePanel } from "./_components/filter-data/filter-data.hooks";

export type HackathonProjectsFilters = Omit<NonNullable<GetHackathonProjectsV2QueryParams>, "pageSize" | "pageIndex">;

export default function HackathonProjectsPage({ params }: { params: { hackathonSlug: string } }) {
  const [search, setSearch] = useState<string>();
  const { open: openFilterPanel } = useHackathonProjectsFilterDataSidePanel();
  const [filters, setFilters] = useState<HackathonProjectsFilters>({});
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const queryParams: Partial<GetHackathonProjectsV2QueryParams> = {
    search: debouncedSearch,
    ...filters,
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    HackathonReactQueryAdapter.client.useGetHackathonProjectsV2({
      pathParams: {
        hackathonSlug: params.hackathonSlug,
      },
      queryParams,
      options: {
        enabled: Boolean(params.hackathonSlug),
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
        name={project.name}
        slug={project.slug}
        description={project.shortDescription}
        logoUrl={project.logoUrl}
        contributorCount={project.contributorCount}
        starCount={project.starCount}
        forkCount={project.forkCount}
        odhackIssueCount={project.odHackStats?.issueCount}
        availableIssueCount={project.odHackStats?.availableIssueCount}
        categories={project.categories}
        languages={project.languages}
        ecosystems={project.ecosystems}
      />
    ));
  }, [isLoading, isError, projects]);

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: params.hackathonSlug,
          },
          {
            id: "projects",
            label: <Translate token={"hackathon:details.tabs.projects"} />,
          },
        ]}
      />
      <div className="flex h-full flex-col gap-lg overflow-hidden p-lg pb-0">
        <nav className={"flex gap-md"}>
          <FilterButton onClick={openFilterPanel} />
          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
        </nav>
        <ScrollView>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {renderProjects}
            {hasNextPage ? (
              <div className="col-span-full">
                <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} />
              </div>
            ) : null}
          </div>
        </ScrollView>
        <div className="flex gap-md">
          <Typo size={"sm"} color={"secondary"} translate={{ token: "hackathon:details.projects.projectsCount" }} />
          <Typo size={"sm"} color={"primary"}>
            {totalItemNumber}
          </Typo>
        </div>
      </div>
      <FilterData />
    </FilterDataProvider>
  );
}
