import { CircleCheck, Filter, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

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
import { Menu } from "@/design-system/molecules/menu";
import { MenuItemPort } from "@/design-system/molecules/menu-item";
import { TableSearch } from "@/design-system/molecules/table-search";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { FilterData } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/_components/filter-data/filter-data";
import { useUserContributionsFilterDataSidePanel } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/_components/filter-data/filter-data.hooks";
import { UserContributionsProps } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/user-contributions.types";
import { CreateContributionSidepanel } from "@/shared/panels/_flows/reward-flow/_panels/create-contribution-sidepanel/create-contribution-sidepanel";
import { useCreateContributionSidepanel } from "@/shared/panels/_flows/reward-flow/_panels/create-contribution-sidepanel/create-contribution-sidepanel.hooks";
import { LinkContributionSidepanel } from "@/shared/panels/_flows/reward-flow/_panels/link-contribution-sidepanel/link-contribution-sidepanel";
import { useLinkContributionSidepanel } from "@/shared/panels/_flows/reward-flow/_panels/link-contribution-sidepanel/link-contribution-sidepanel.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

export type UserContributionsFilters = Omit<
  NonNullable<GetContributionsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

export function UserContributions({ githubUserId, containerHeight = undefined }: UserContributionsProps) {
  const { t } = useTranslation("panels");

  const { getSelectedContributions, addContributions, removeContribution, getOtherWorks } = useRewardFlow();
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

  const filtersCount = Object.keys(filters)?.length;

  const menuItems: MenuItemPort[] = [
    {
      id: "link",
      label: t("rewardFlow.contribution.link"),
    },
    {
      id: "create",
      label: t("rewardFlow.contribution.create"),
    },
  ];

  function handleMenuAction(id: string) {
    if (id === "link") {
      openLinkContributionPanel({
        githubUserId,
      });
    }

    if (id === "create") {
      openCreateContributionPanel({
        githubUserId,
      });
    }
  }

  const queryParams: Partial<GetContributionsQueryParams> = {
    search: debouncedSearch,
    ...filters,
  };

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ContributionReactQueryAdapter.client.useGetContributions({
      queryParams: {
        ...queryParams,
        contributorIds: [githubUserId],
        statuses: ["DONE"],
        hasBeenRewarded: false,
      },
      options: {
        enabled: Boolean(githubUserId),
      },
    });

  const totalItemNumber = useMemo(() => data?.pages.flatMap(page => page.totalItemNumber) ?? undefined, [data]);
  const contributions = useMemo(() => data?.pages.flatMap(page => page.contributions) ?? [], [data]);
  const mixedContributions = useMemo(() => [...otherWorks, ...contributions], [contributions, otherWorks]);

  function handleSelectAll() {
    addContributions(
      contributions.map(contribution => contribution.toItemDto()),
      githubUserId
    );
  }

  function handleSelect(contribution: ContributionItemDtoInterface, isSelected: boolean) {
    if (isSelected) {
      removeContribution(contribution, githubUserId);
    } else {
      addContributions([contribution], githubUserId);
    }
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
        {mixedContributions.map(contribution => {
          const isSelected = !!selectedContributions.find(c => c.isEqualTo(contribution.toItemDto())) || false;
          return (
            <CardContributionKanban
              key={contribution.id}
              type={contribution.type}
              githubTitle={contribution.githubTitle}
              githubStatus={contribution.githubStatus}
              githubNumber={contribution.githubNumber}
              lastUpdatedAt={contribution.lastUpdatedAt}
              // TODO REWARDED AMOUNT
              // rewardUsdAmount={contribution.totalRewardedAmount?.totalAmount}
              contributors={contribution.contributors}
              linkedIssues={contribution.linkedIssues}
              githubLabels={contribution.githubLabels}
              actions={[
                {
                  translate: { token: isSelected ? "common:unselect" : "common:select" },
                  onClick: () => {
                    handleSelect(contribution.toItemDto(), isSelected);
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
            {typeof totalItemNumber !== "undefined" ? (
              <Badge size={"xxs"} color={"grey"} shape={"rounded"}>
                {totalItemNumber}
              </Badge>
            ) : null}
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

            <Menu isPopOver closeOnSelect items={menuItems} onAction={handleMenuAction} placement="bottom-end">
              <Button
                variant={"secondary"}
                size={"xs"}
                iconOnly
                startIcon={{
                  component: Plus,
                }}
              />
            </Menu>
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
