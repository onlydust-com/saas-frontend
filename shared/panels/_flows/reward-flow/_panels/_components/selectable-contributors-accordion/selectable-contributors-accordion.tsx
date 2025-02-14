import { useMemo, useState } from "react";

import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";
import { GetBiContributorsPortParams } from "@/core/domain/bi/bi-contract.types";

import { Accordion } from "@/design-system/molecules/accordion";
import { TableSearch } from "@/design-system/molecules/table-search";

import { ContributorProfileCheckbox } from "@/shared/features/contributors/contributor-profile-checkbox/contributor-profile-checkbox";
import { ContributorProfileCheckboxLoading } from "@/shared/features/contributors/contributor-profile-checkbox/contributor-profile-checkbox.loading";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { TypographyMuted } from "@/shared/ui/typography";

export type SelectableContributorsFilters = Omit<
  NonNullable<GetBiContributorsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

export function SelectableContributorsAccordion() {
  const { selectedGithubUserIds, addContributorId, removeContributorId } = useRewardFlow();
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

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

  function handleSelectedContributors({
    checked,
    contributorId,
    avatarUrl,
    login,
  }: {
    checked: boolean;
    contributorId: number;
    avatarUrl?: string;
    login?: string;
  }) {
    if (checked) {
      addContributorId({ contributorId, avatarUrl, login });
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
              handleSelectedContributors({
                checked,
                contributorId: contributor.githubUserId,
                avatarUrl: contributor.avatarUrl,
                login: contributor.login,
              })
            }
          />
        ))}
      </>
    );
  }, [contributors, isLoading, selectedGithubUserIds]);

  return (
    <>
      <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />

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
    </>
  );
}
