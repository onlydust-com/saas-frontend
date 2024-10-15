import { ChevronDown } from "lucide-react";
import { InView } from "react-intersection-observer";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { CardContributionKanban } from "@/shared/features/card-contribution-kanban/card-contribution-kanban";
import { ContributionsPopoverProps } from "@/shared/features/contributions/contributions-popover/contributions-popover.types";
import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ContributionsPopover({ rewardId, projectId, labelProps, buttonProps }: ContributionsPopoverProps) {
  const { data, hasNextPage, fetchNextPage, isPending } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams: {
      projectIds: [projectId],
      // TODO activate this filter once backend ready
      // rewardId: [rewardId],
    },
    options: {
      enabled: Boolean(projectId && rewardId),
    },
  });

  const contributions = data?.pages.flatMap(page => page.contributions) || [];
  return (
    <Popover>
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
            >
              <Translate {...labelProps} />
            </Button>
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content>
        {() => (
          <div>
            <ScrollView>
              <div className={"flex flex-col gap-3"}>
                {contributions?.map(contribution => (
                  <CardContributionKanban contribution={contribution} key={contribution.id} />
                ))}
              </div>
              {hasNextPage ? (
                <InView className={cn("flex w-full justify-center")} onChange={fetchNextPage} skip={isPending} />
              ) : null}
            </ScrollView>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
