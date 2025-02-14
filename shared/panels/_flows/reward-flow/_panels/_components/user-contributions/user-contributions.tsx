import { CircleCheck } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import {
  GetContributionsPortParams,
  GetContributionsQueryParams,
} from "@/core/domain/contribution/contribution-contract.types";
import { ContributionItemDtoInterface } from "@/core/domain/contribution/dto/contribution-item-dto";
import { ContributionFilterType } from "@/core/kernel/filters/filters-facade-port";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";
import {
  CardContributionKanban,
  CardContributionKanbanLoading,
} from "@/design-system/molecules/cards/card-contribution-kanban";
import { TableSearch } from "@/design-system/molecules/table-search";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { FilterData } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/_components/filter-data/filter-data";
import { useUserContributionsFilterDataSidePanel } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/_components/filter-data/filter-data.hooks";
import { UserContributionsProps } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/user-contributions.types";
import { CreateContributionSidepanel } from "@/shared/panels/_flows/reward-flow/_panels/create-contribution-sidepanel/create-contribution-sidepanel";
import { useCreateContributionSidepanel } from "@/shared/panels/_flows/reward-flow/_panels/create-contribution-sidepanel/create-contribution-sidepanel.hooks";
import { LinkContributionSidepanel } from "@/shared/panels/_flows/reward-flow/_panels/link-contribution-sidepanel/link-contribution-sidepanel";
import { useLinkContributionSidepanel } from "@/shared/panels/_flows/reward-flow/_panels/link-contribution-sidepanel/link-contribution-sidepanel.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { TypographyMuted } from "@/shared/ui/typography";

export type UserContributionsFilters = Omit<
  NonNullable<GetContributionsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

export function UserContributions({ githubUserId, containerHeight = undefined }: UserContributionsProps) {
  const { getSelectedContributions, addContributions, removeContribution, removeAllContributions, getOtherWorks } =
    useRewardFlow();
  const [filters, setFilters] = useState<UserContributionsFilters>({
    types: [ContributionFilterType.ISSUE, ContributionFilterType.PULL_REQUEST],
  });
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const selectedContributions = getSelectedContributions(githubUserId);
  const otherWorks = getOtherWorks(githubUserId);
  const { open: openFilterPanel } = useUserContributionsFilterDataSidePanel();
  const { open: openLinkContributionPanel } = useLinkContributionSidepanel();
  const { open: openCreateContributionPanel } = useCreateContributionSidepanel();

  const queryParams: Partial<GetContributionsQueryParams> = {
    search: debouncedSearch,
    ...filters,
  };

  const { data: selectedContributionData, isLoading: isLoadingSelectedContributions } =
    ContributionReactQueryAdapter.client.useGetContributions({
      queryParams: {
        ...queryParams,
        contributorIds: [githubUserId],
        statuses: ["DONE"],
        hasBeenRewarded: false,
        ids: selectedContributions.filter(c => !!c.uuid).map(contribution => contribution.uuid) as string[],
        pageSize: 50,
        dataSource: "ALL",
      },
      options: {
        enabled: Boolean(githubUserId),
      },
    });

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ContributionReactQueryAdapter.client.useGetContributions({
      queryParams: {
        ...queryParams,
        contributorIds: [githubUserId],
        statuses: ["DONE"],
        hasBeenRewarded: false,
        dataSource: "ALL",
      },
      options: {
        enabled: Boolean(githubUserId),
      },
    });

  const totalContributionsNumber = useMemo(() => data?.pages[0].totalItemNumber ?? 0, [data]);
  const totalMixedContributionsNumber = useMemo(
    () => totalContributionsNumber + otherWorks.length,
    [totalContributionsNumber, otherWorks]
  );

  const contributions = useMemo(() => data?.pages.flatMap(page => page.contributions) ?? [], [data]);
  const selected = useMemo(
    () => selectedContributionData?.pages.flatMap(page => page.contributions) ?? [],
    [selectedContributionData]
  );

  const mixedContributions = useMemo(() => {
    const filteredContributions = contributions?.filter(contribution => !selected.find(c => c.id === contribution.id));

    return [...selected, ...filteredContributions];
  }, [contributions, selected]);

  const canClearSelection = useMemo(() => selectedContributions.length > 0, [selectedContributions]);

  function handleToggleSelectAll() {
    if (canClearSelection) {
      removeAllContributions(githubUserId);
    } else {
      addContributions(
        mixedContributions.map(contribution => contribution.toItemDto()),
        githubUserId
      );
    }
  }

  function handleSelect(contribution: ContributionItemDtoInterface, isSelected: boolean) {
    if (isSelected) {
      removeContribution(contribution, githubUserId);
    } else {
      addContributions([contribution], githubUserId);
    }
  }

  function renderContributions() {
    if (isLoading || isLoadingSelectedContributions) {
      return <CardContributionKanbanLoading />;
    }

    if (isError) {
      return <ErrorState />;
    }

    if (!contributions.length && !otherWorks.length) {
      return (
        <div className="flex flex-col items-center gap-md py-10">
          <TypographyMuted className="text-center">
            This contributor doesn't seem to have any contributions.
            <br />
            You can link or create a contribution to reward them.
          </TypographyMuted>

          {renderActions()}
        </div>
      );
    }

    return (
      <div className={"grid gap-lg"}>
        {otherWorks.map(contribution => {
          const isSelected = !!selectedContributions.find(c => c.isEqualTo(contribution.toItemDto())) || false;

          function selectContribution() {
            handleSelect(contribution.toItemDto(), isSelected);
          }

          return (
            <CardContributionKanban
              key={contribution.id}
              type={contribution.type}
              githubTitle={contribution.title}
              githubStatus={contribution.status}
              githubNumber={contribution.number}
              actions={[
                {
                  translate: { token: isSelected ? "common:unselect" : "common:select" },
                  onClick: selectContribution,
                },
              ]}
              border={isSelected ? "brand-primary" : undefined}
              githubHtmlUrl={contribution.htmlUrl}
              onClick={selectContribution}
            />
          );
        })}
        {mixedContributions.map(contribution => {
          const isSelected = !!selectedContributions.find(c => c.isEqualTo(contribution.toItemDto())) || false;

          function selectContribution() {
            handleSelect(contribution.toItemDto(), isSelected);
          }

          return (
            <CardContributionKanban
              key={contribution.id}
              type={contribution.type}
              githubTitle={contribution.githubTitle}
              githubStatus={contribution.githubStatus}
              githubNumber={contribution.githubNumber}
              lastUpdatedAt={contribution.lastUpdatedAt}
              rewardUsdAmount={contribution.totalRewardedUsdAmount}
              contributors={contribution.contributors}
              linkedIssues={contribution.linkedIssues}
              githubLabels={contribution.githubLabels}
              actions={[
                {
                  translate: { token: isSelected ? "common:unselect" : "common:select" },
                  onClick: selectContribution,
                },
              ]}
              border={isSelected ? "brand-primary" : undefined}
              githubHtmlUrl={contribution.githubHtmlUrl}
              onClick={selectContribution}
            />
          );
        })}
        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </div>
    );
  }

  const renderActions = useCallback(() => {
    return (
      <div className="flex gap-md">
        <Button variant={"secondary"} size={"xs"} onClick={() => openLinkContributionPanel({ githubUserId })}>
          Link other PR, issues
        </Button>

        <Button variant={"secondary"} size={"xs"} onClick={() => openCreateContributionPanel({ githubUserId })}>
          Create a contribution
        </Button>
      </div>
    );
  }, [openLinkContributionPanel, openCreateContributionPanel, githubUserId]);

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <section className={"flex flex-col gap-lg"}>
        <header className={"flex items-center gap-xs"}>
          <Icon component={CircleCheck} size={"sm"} />
          <Typo
            size={"md"}
            weight={"medium"}
            translate={{
              token: "common:contributions",
            }}
          />

          {!isLoading ? (
            <Badge size={"xxs"} color={"grey"} shape={"rounded"}>
              {totalMixedContributionsNumber}
            </Badge>
          ) : null}
        </header>

        <div className="flex justify-between gap-md">
          <Button
            variant={"secondary"}
            size={"xs"}
            translate={{
              token: canClearSelection ? "common:clearSelection" : "common:selectAll",
            }}
            onClick={handleToggleSelectAll}
          />

          {renderActions()}
        </div>

        <nav className={"flex gap-md"}>
          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />

          <FilterButton onClick={openFilterPanel} />
        </nav>

        {containerHeight ? (
          <div className={"overflow-hidden"} style={{ maxHeight: containerHeight }}>
            <ScrollView style={{ maxHeight: containerHeight }}>{renderContributions()}</ScrollView>
          </div>
        ) : (
          renderContributions()
        )}
      </section>

      <FilterData />
      <LinkContributionSidepanel />
      <CreateContributionSidepanel />
    </FilterDataProvider>
  );
}
