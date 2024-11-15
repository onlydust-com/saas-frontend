import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { CardContributionKanban } from "@/design-system/molecules/cards/card-contribution-kanban";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { ContributionsPopoverProps } from "@/shared/features/contributions/contributions-popover/contributions-popover.types";

export function ContributionsPopover({
  rewardId,
  contributionIds,
  contributionsCount,
  buttonProps,
}: ContributionsPopoverProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    ContributionReactQueryAdapter.client.useGetContributions({
      queryParams: {
        rewardIds: rewardId ? [rewardId] : undefined,
        ids: contributionIds ?? undefined,
      },
      options: {
        enabled: Boolean(isPopoverOpen && (rewardId || contributionIds?.length)),
      },
    });

  const contributions = data?.pages.flatMap(page => page.contributions) || [];

  const renderContributions = useMemo(() => {
    if (isLoading) {
      return (
        <div className={"flex max-h-lg w-lg flex-col gap-3"}>
          <Skeleton
            classNames={{
              base: "w-full h-24",
            }}
          />
          <Skeleton
            classNames={{
              base: "w-full h-24",
            }}
          />
        </div>
      );
    }

    if (contributions.length === 0) {
      return <EmptyStateLite message={"features:contributionPopover.empty.description"} />;
    }

    return (
      <ScrollView>
        <div className={"flex max-h-lg w-lg flex-col gap-3"}>
          {contributions?.map(contribution => (
            <CardContributionKanban
              key={contribution.id}
              type={contribution.type}
              githubTitle={contribution.githubTitle}
              githubStatus={contribution.githubStatus}
              githubNumber={contribution.githubNumber}
              lastUpdatedAt={contribution.lastUpdatedAt}
              rewardUsdAmount={contribution.totalRewardedUsdAmount}
              applicants={contribution.isNotAssigned() ? contribution.applicants : []}
              contributors={contribution.contributors}
              linkedIssues={contribution.linkedIssues}
              githubLabels={contribution.githubLabels}
            />
          ))}
        </div>
        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </ScrollView>
    );
  }, [contributions, hasNextPage, isFetchingNextPage]);

  return (
    <Popover controlled={{ isOpen: isPopoverOpen, setIsOpen: setIsPopoverOpen }}>
      <Popover.Trigger>
        {() => (
          <div>
            <Button
              as={"div"}
              variant={"secondary"}
              size={"md"}
              endIcon={{ component: ChevronDown }}
              classNames={{
                base: "max-w-xs overflow-hidden",
                label: "whitespace-nowrap text-ellipsis overflow-hidden",
              }}
              {...buttonProps}
              translate={{
                token: "common:contributionsCount",
                count: contributionsCount,
              }}
            />
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content>{() => <div>{renderContributions}</div>}</Popover.Content>
    </Popover>
  );
}
