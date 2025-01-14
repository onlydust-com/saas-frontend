"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useMemo, useState } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GetProjectsV2QueryParams } from "@/core/domain/project/project-contract.types";

import { Typo } from "@/design-system/atoms/typo";
import { CardProjectMarketplaceLoading } from "@/design-system/molecules/cards/card-project-marketplace/card-project-marketplace.loading";
import { CardProjectMarketplace } from "@/design-system/molecules/cards/card-project-marketplace/variants/card-project-marketplace-default";
import { TableSearch } from "@/design-system/molecules/table-search/variants/table-search-default";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";

import { FilterData } from "./_components/filter-data/filter-data";
import { useEcosystemProjectsFilterDataSidePanel } from "./_components/filter-data/filter-data.hooks";

export type EcosystemProjectsFilters = Omit<NonNullable<GetProjectsV2QueryParams>, "pageSize" | "pageIndex">;

function EcosystemProjectsPage({ params }: { params: { ecosystemSlug: string } }) {
  const [search, setSearch] = useState<string>();
  const { open: openFilterPanel } = useEcosystemProjectsFilterDataSidePanel();
  const [filters, setFilters] = useState<EcosystemProjectsFilters>({});
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const queryParams: Partial<GetProjectsV2QueryParams> = {
    // TODO activate once backend is ready
    // ecosystemSlugs: [params.ecosystemSlug],
    search: debouncedSearch,
    ...filters,
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    ProjectReactQueryAdapter.client.useGetProjectsV2({
      queryParams,
      options: {
        enabled: Boolean(params.ecosystemSlug),
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
      return <EmptyStateLite />;
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
        availableIssueCount={project.availableIssueCount}
        goodFirstIssueCount={project.goodFirstIssueCount}
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
            label: params.ecosystemSlug,
          },
        ]}
      />
      <div className="flex h-full flex-col gap-lg overflow-hidden p-lg pb-0">
        <nav className={"flex gap-md"}>
          <FilterButton onClick={openFilterPanel} />
          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
        </nav>
        <ScrollView>
          <div className="grid w-full grid-cols-1 gap-lg overflow-hidden sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {renderProjects}
            {hasNextPage ? (
              <div className="col-span-full">
                <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} />
              </div>
            ) : null}
          </div>
        </ScrollView>
        <div className="flex gap-md">
          <Typo size={"sm"} color={"secondary"} translate={{ token: "ecosystems:details.projects.projectsCount" }} />
          <Typo size={"sm"} color={"primary"}>
            {totalItemNumber}
          </Typo>
        </div>
      </div>
      <FilterData />
    </FilterDataProvider>
  );
}

export default withClientOnly(withAuthenticationRequired(EcosystemProjectsPage));
