import { Filter } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { GetBiContributorsPortParams, GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Accordion } from "@/design-system/molecules/accordion";
import { TableSearch } from "@/design-system/molecules/table-search";

import { ShowMore } from "@/shared/components/show-more/show-more";
import { ContributorProfileCheckbox } from "@/shared/features/contributors/contributor-profile-checkbox/contributor-profile-checkbox";
import { ContributorProfileCheckboxLoading } from "@/shared/features/contributors/contributor-profile-checkbox/contributor-profile-checkbox.loading";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { FilterData } from "@/shared/panels/_flows/reward-flow/_panels/_components/selectable-contributors-accordion/_components/filter-data/filter-data";
import { useSelectableContributorsFilterDataSidePanel } from "@/shared/panels/_flows/reward-flow/_panels/_components/selectable-contributors-accordion/_components/filter-data/filter-data.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

export type SelectableContributorsFilters = Omit<
  NonNullable<GetBiContributorsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

export function SelectableContributorsAccordion() {
  const { selectedGithubUserIds, addContributorId, removeContributorId } = useRewardFlow();
  const [filters, setFilters] = useState<SelectableContributorsFilters>({});
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const localSelectedContributorsIds = useRef(selectedGithubUserIds);

  const { open: openFilterPanel } = useSelectableContributorsFilterDataSidePanel();

  const filtersCount = Object.keys(filters)?.length;

  const queryParams: Partial<GetBiContributorsQueryParams> = {
    search: debouncedSearch,
    contributorIds: localSelectedContributorsIds.current,
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

    return (
      <>
        {contributors?.map(contributor => (
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

          <Button
            variant={"secondary"}
            size="sm"
            startIcon={{ component: Filter }}
            iconOnly={!filtersCount}
            onClick={() => openFilterPanel()}
            classNames={{
              content: "w-fit",
            }}
            endContent={filtersCount ? <Badge size={"xxs"}>{filtersCount}</Badge> : undefined}
          />
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
