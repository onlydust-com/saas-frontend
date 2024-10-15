import { Filter } from "lucide-react";
import { useMemo, useState } from "react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { GetBiContributorsPortParams, GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Accordion } from "@/design-system/molecules/accordion";
import { TableSearch } from "@/design-system/molecules/table-search";

import { FilterData } from "@/shared/panels/_flows/reward-flow/_panels/_components/selectable-contributors-accordion/_components/filter-data/filter-data";
import { FilterDataProvider } from "@/shared/panels/_flows/reward-flow/_panels/_components/selectable-contributors-accordion/_components/filter-data/filter-data.context";
import { useSelectableContributorsFilterDataSidePanel } from "@/shared/panels/_flows/reward-flow/_panels/_components/selectable-contributors-accordion/_components/filter-data/filter-data.hooks";
import { SelectableContributorsAccordionProps } from "@/shared/panels/_flows/reward-flow/_panels/_components/selectable-contributors-accordion/selectable-contributors-accordion.types";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

export type SelectableContributorsFilters = Omit<
  NonNullable<GetBiContributorsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

export function SelectableContributorsAccordion({ selectableContributors }: SelectableContributorsAccordionProps) {
  const { selectedGithubUserIds, setSelectedGithubUserIds } = useRewardFlow();
  const [filters, setFilters] = useState<SelectableContributorsFilters>({});
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const { open: openFilterPanel } = useSelectableContributorsFilterDataSidePanel();

  const filtersCount = Object.keys(filters)?.length;

  const queryParams: Partial<GetBiContributorsQueryParams> = {
    search: debouncedSearch,
    // contributorIds: selectedGithubUserIds,
    ...filters,
  };

  const {
    data,
    isLoading: isLoadingBiContributors,
    isError: isErrorBiContributors,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = BiReactQueryAdapter.client.useGetBiContributors({
    queryParams: {
      ...queryParams,
    },
    options: {
      enabled: Boolean(selectedGithubUserIds),
    },
  });

  const contributors = useMemo(() => data?.pages.flatMap(page => page.contributors) ?? [], [data]);

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
        id={"period"}
        titleProps={{
          translate: { token: "panels:bulkContributorsSelection.contributorsAccordion.title" },
          size: "xs",
          weight: "medium",
        }}
        defaultSelected={["period"]}
      >
        {contributors?.map(contributor => <div>{contributor.contributor.login}</div>)}
      </Accordion>
      <FilterData />
    </FilterDataProvider>
  );
}
