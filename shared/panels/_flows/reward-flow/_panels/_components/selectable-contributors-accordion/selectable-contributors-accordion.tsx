import { useMemo, useRef, useState } from "react";

import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";
import { GetBiContributorsPortParams, GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";

import { Accordion } from "@/design-system/molecules/accordion";
import { TableSearch } from "@/design-system/molecules/table-search";

import { ContributorProfileCheckbox } from "@/shared/features/contributors/contributor-profile-checkbox/contributor-profile-checkbox";
import { ContributorProfileCheckboxLoading } from "@/shared/features/contributors/contributor-profile-checkbox/contributor-profile-checkbox.loading";
import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { FilterData } from "@/shared/panels/_flows/reward-flow/_panels/_components/selectable-contributors-accordion/_components/filter-data/filter-data";
import { useSelectableContributorsFilterDataSidePanel } from "@/shared/panels/_flows/reward-flow/_panels/_components/selectable-contributors-accordion/_components/filter-data/filter-data.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { TypographyMuted } from "@/shared/ui/typography";

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

  const queryParams: Partial<GetBiContributorsQueryParams> = {
    search: debouncedSearch,
    contributorIds: localSelectedContributorsIds.current,
    ...filters,
  };

  const { data, isLoading } = UserReactQueryAdapter.client.useSearchUser({
    queryParams: {
      login: debouncedSearch,
    },
    options: {
      enabled: Boolean(selectedGithubUserIds),
    },
  });

  const contributors = useMemo(
    () => [...(data?.internalContributors ?? []), ...(data?.externalContributors ?? [])],
    [data]
  );

  function handleSelectedContributors(checked: boolean, contributorId: number, avatarUrl?: string, login?: string) {
    if (checked) {
      addContributorId(contributorId, avatarUrl, login);
    } else {
      removeContributorId(contributorId);
    }
  }

  const renderContributors = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, index) => <ContributorProfileCheckboxLoading key={index} />);
    }

    if (!contributors.length) {
      return (
        <TypographyMuted className="py-10 text-center">
          We could't find the contributor you're looking for.
          <br />
          To reward them, you can invite them to join OnlyDust.
        </TypographyMuted>
      );
    }

    return (
      <>
        {contributors.map(contributor => (
          <ContributorProfileCheckbox
            key={contributor.githubUserId}
            avatarUrl={contributor.avatarUrl}
            login={contributor.login}
            value={selectedGithubUserIds?.includes(contributor.githubUserId)}
            onChange={checked =>
              handleSelectedContributors(checked, contributor.githubUserId, contributor.avatarUrl, contributor.login)
            }
          />
        ))}
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
