import { useMemo, useState } from "react";

import { EcosystemCard } from "@/app/(saas)/ecosystems/_components/ecosystem-card/ecosystem-card";
import {
  EcosystemsContextProvider,
  useEcosystemsContext,
} from "@/app/(saas)/ecosystems/_features/ecosystems-filters/ecosystems-filters.context";

import { EcosystemReactQueryAdapter } from "@/core/application/react-query-adapter/ecosystem";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { TableSearch } from "@/design-system/molecules/table-search/variants/table-search-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { NEXT_ROUTER } from "@/shared/constants/router";

function Safe() {
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const { queryParams } = useEcosystemsContext();

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    EcosystemReactQueryAdapter.client.useGetEcosystems({
      queryParams: { ...queryParams, search: debouncedSearch },
    });

  const ecosystems = useMemo(() => data?.pages.flatMap(({ ecosystems }) => ecosystems) ?? [], [data]);

  const renderEcosystems = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 9 }).map((_, index) => <Skeleton key={index} className="h-64" />);
    }

    if (isError) {
      return (
        <div className="col-span-full p-lg">
          <ErrorState />
        </div>
      );
    }

    if (!ecosystems.length) {
      return (
        <div className="col-span-full">
          <EmptyStateLite />
        </div>
      );
    }

    return ecosystems.map(ecosystem => (
      <EcosystemCard
        key={ecosystem.id}
        as={BaseLink}
        htmlProps={{ href: NEXT_ROUTER.ecosystems.details.root(ecosystem.slug) }}
        name={ecosystem.name}
        logoUrl={ecosystem.logoUrl}
        usersCount={ecosystem.contributorCount}
        projectsCount={ecosystem.projectCount}
        description={ecosystem.description}
        languages={ecosystem.languages}
      />
    ));
  }, [isLoading, isError, ecosystems]);

  return (
    <div className="flex h-full flex-col gap-4xl overflow-hidden">
      <header className="flex flex-row items-start justify-between gap-xl">
        <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
        {/* <EcosystemsFilters /> */}
      </header>

      <div className="grid w-full grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
        {renderEcosystems}

        {hasNextPage ? (
          <div className="col-span-full">
            <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function EcosystemsList() {
  return (
    <EcosystemsContextProvider>
      <Safe />
    </EcosystemsContextProvider>
  );
}
