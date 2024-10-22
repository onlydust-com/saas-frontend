import { useMemo, useRef, useState } from "react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { GetBiContributorsPortParams, GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";

import { Accordion } from "@/design-system/molecules/accordion";
import { TableSearch } from "@/design-system/molecules/table-search";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { ContributorProfileCheckbox } from "@/shared/features/contributors/contributor-profile-checkbox/contributor-profile-checkbox";
import { ContributorProfileCheckboxLoading } from "@/shared/features/contributors/contributor-profile-checkbox/contributor-profile-checkbox.loading";
import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { FilterData } from "@/shared/panels/_flows/reward-flow/_panels/_components/selectable-contributors-accordion/_components/filter-data/filter-data";
import { useSelectableContributorsFilterDataSidePanel } from "@/shared/panels/_flows/reward-flow/_panels/_components/selectable-contributors-accordion/_components/filter-data/filter-data.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

export type SelectableContributorsFilters = Omit<
  NonNullable<GetBiContributorsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

export function SelectableContributorsAccordion() {
  const { selectedGithubUserIds, addContributorId, removeContributorId, projectId } = useRewardFlow();
  const [filters, setFilters] = useState<SelectableContributorsFilters>({});
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const localSelectedContributorsIds = useRef(selectedGithubUserIds);

  const { open: openFilterPanel } = useSelectableContributorsFilterDataSidePanel();

  const queryParams: Partial<GetBiContributorsQueryParams> = {
    search: debouncedSearch,
    contributorIds: localSelectedContributorsIds.current,
    projectIds: projectId ? [projectId] : undefined,
    ...filters,
  };

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    BiReactQueryAdapter.client.useGetBiContributors({
      queryParams: {
        ...queryParams,
      },
      options: {
        enabled: Boolean(selectedGithubUserIds),
      },
    });

  const contributors = useMemo(() => data?.pages.flatMap(page => page.contributors) ?? [], [data]);

  function handleSelectedContributors(contributorId: number, checked: boolean) {
    if (checked) {
      addContributorId(contributorId);
    } else {
      removeContributorId(contributorId);
    }
  }

  const renderContributors = useMemo(() => {
    if (isLoading) {
      return (
        <>
          <ContributorProfileCheckboxLoading />
          <ContributorProfileCheckboxLoading />
          <ContributorProfileCheckboxLoading />
          <ContributorProfileCheckboxLoading />
        </>
      );
    }

    if (!contributors.length) {
      return <EmptyStateLite />;
    }

    return (
      <>
        {contributors.map(contributor => (
          <ContributorProfileCheckbox
            key={contributor.contributor.githubUserId}
            contributor={contributor}
            value={selectedGithubUserIds?.includes(contributor.contributor.githubUserId)}
            onChange={checked => handleSelectedContributors(contributor.contributor.githubUserId, checked)}
          />
        ))}
        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </>
    );
  }, [contributors, isLoading, selectedGithubUserIds]);

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <section className={"flex flex-col gap-lg"}>
        <nav className={"flex gap-md"}>
          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
          <FilterButton onClick={openFilterPanel} />
        </nav>
      </section>
      <Accordion
        classNames={{ base: "flex flex-col gap-3" }}
        id={"contributors"}
        titleProps={{
          translate: { token: "panels:bulkContributorsSelection.contributorsAccordion.title" },
          size: "xs",
          weight: "medium",
        }}
        defaultSelected={["contributors"]}
      >
        <div className="flex flex-col gap-2">{renderContributors}</div>
      </Accordion>
      <FilterData />
    </FilterDataProvider>
  );
}
