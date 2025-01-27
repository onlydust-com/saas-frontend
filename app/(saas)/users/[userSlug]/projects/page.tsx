"use client";

import { useMemo, useState } from "react";

import { ContributorReactQueryAdapter } from "@/core/application/react-query-adapter/contributor";
import { GetContributorProjectsQueryParams } from "@/core/domain/contributor/contributor-contract.types";

import { Typo } from "@/design-system/atoms/typo/variants/typo-default";
import { CardProjectMarketplaceLoading } from "@/design-system/molecules/cards/card-project-marketplace/card-project-marketplace.loading";
import { CardProjectMarketplace } from "@/design-system/molecules/cards/card-project-marketplace/variants/card-project-marketplace-default";
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
import { Translate } from "@/shared/translation/components/translate/translate";

import { FilterData } from "./_components/filter-data/filter-data";
import { useUserProjectsFilterDataSidePanel } from "./_components/filter-data/filter-data.hooks";

export type UserProjectsFilters = Omit<NonNullable<GetContributorProjectsQueryParams>, "pageSize" | "pageIndex">;

export default function UserProjectsPage({ params }: { params: { userSlug: string } }) {
  const [search, setSearch] = useState<string>();
  const { open: openFilterPanel } = useUserProjectsFilterDataSidePanel();
  const [filters, setFilters] = useState<UserProjectsFilters>({});
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const queryParams: Partial<GetContributorProjectsQueryParams> = {
    search: debouncedSearch,
    ...filters,
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    ContributorReactQueryAdapter.client.useGetContributorProjects({
      queryParams,
      pathParams: {
        contributorId: Number(params.userSlug),
      },
      options: {
        enabled: Boolean(params.userSlug),
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
        htmlProps={{ href: NEXT_ROUTER.projects.details.root(project.slug) }}
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
  }, [isLoading, isError, projects]);

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Users",
            href: NEXT_ROUTER.users.root,
          },
          {
            id: "slug",
            label: params.userSlug,
          },
          {
            id: "projects",
            label: <Translate token={"users:details.tabs.projects"} />,
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

        <div className="flex gap-md pb-xl">
          <Typo size={"sm"} color={"secondary"} translate={{ token: "users:details.projects.projectsCount" }} />
          <Typo size={"sm"} color={"primary"}>
            {totalItemNumber}
          </Typo>
        </div>
      </div>
      <FilterData />
    </FilterDataProvider>
  );
}
