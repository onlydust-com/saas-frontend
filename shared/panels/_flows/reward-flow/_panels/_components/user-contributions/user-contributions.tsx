import { CircleCheck, Filter, Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import {
  GetContributionsPortParams,
  GetContributionsQueryParams,
} from "@/core/domain/contribution/contribution-contract.types";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";
import {
  CardContributionKanban,
  CardContributionKanbanLoading,
} from "@/design-system/molecules/cards/card-contribution-kanban";
import { TableSearch } from "@/design-system/molecules/table-search";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { FilterData } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/_components/filter-data/filter-data";
import { FilterDataProvider } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/_components/filter-data/filter-data.context";
import { useUserContributionsFilterDataSidePanel } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/_components/filter-data/filter-data.hooks";
import { UserContributionsProps } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/user-contributions.types";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

export type UserContributionsFilters = Omit<
  NonNullable<GetContributionsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

export function UserContributions({ githubUserId }: UserContributionsProps) {
  const { selectedContributionIds, setSelectedContributionIds } = useRewardFlow();
  const [filters, setFilters] = useState<UserContributionsFilters>({});
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const { open: openFilterPanel } = useUserContributionsFilterDataSidePanel();

  const filtersCount = Object.keys(filters)?.length;

  const queryParams: Partial<GetContributionsQueryParams> = {
    search: debouncedSearch,
    ...filters,
  };

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ContributionReactQueryAdapter.client.useGetContributions({
      queryParams: {
        ...queryParams,
        contributorIds: [githubUserId],
        hasBeenRewarded: false,
      },
      options: {
        enabled: Boolean(githubUserId),
      },
    });

  const totalItemNumber = useMemo(() => data?.pages.flatMap(page => page.totalItemNumber) ?? [], [data]);
  const contributions = useMemo(() => data?.pages.flatMap(page => page.contributions) ?? [], [data]);

  function handleSelectAll() {
    setSelectedContributionIds(contributions.map(contribution => contribution.id));
  }

  function handleSelect(contributionId: string, isSelected: boolean) {
    setSelectedContributionIds((prevState = []) => {
      if (isSelected) {
        return prevState.filter(id => id !== contributionId);
      }

      return [...prevState, contributionId];
    });
  }

  function renderContributions() {
    if (isLoading) {
      return <CardContributionKanbanLoading />;
    }

    if (isError) {
      return <ErrorState />;
    }

    if (!contributions.length) return <EmptyStateLite />;

    return (
      <div className={"grid gap-lg"}>
        {contributions.map(contribution => {
          const isSelected = selectedContributionIds?.includes(contribution.id) ?? false;

          return (
            <CardContributionKanban
              key={contribution.id}
              type={contribution.type}
              githubTitle={contribution.githubTitle}
              githubStatus={contribution.githubStatus}
              githubNumber={contribution.githubNumber}
              lastUpdatedAt={contribution.lastUpdatedAt}
              rewardUsdAmount={contribution.totalRewardedAmount?.totalAmount}
              contributors={contribution.contributors}
              linkedIssues={contribution.linkedIssues}
              githubLabels={contribution.githubLabels}
              actions={[
                {
                  translate: { token: isSelected ? "common:unselect" : "common:select" },
                  onClick: () => {
                    handleSelect(contribution.id, isSelected);
                  },
                },
              ]}
              border={isSelected ? "brand-primary" : undefined}
            />
          );
        })}
        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </div>
    );
  }

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <section className={"flex flex-col gap-lg"}>
        <header className={"flex items-center justify-between gap-lg"}>
          <div className={"flex items-center gap-xs"}>
            <Icon component={CircleCheck} size={"sm"} />
            <Typo
              size={"md"}
              weight={"medium"}
              translate={{
                token: "common:contributions",
              }}
            />
            <Badge size={"xxs"} color={"grey"} shape={"rounded"}>
              {totalItemNumber}
            </Badge>
          </div>

          <div className="flex items-center gap-md">
            <Button
              variant={"secondary"}
              size={"xs"}
              translate={{
                token: "common:selectAll",
              }}
              onClick={handleSelectAll}
            />

            <Button
              variant={"secondary"}
              size={"xs"}
              iconOnly
              startIcon={{
                component: Plus,
              }}
            />
          </div>
        </header>

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

        {renderContributions()}
      </section>

      <FilterData />
    </FilterDataProvider>
  );
}
