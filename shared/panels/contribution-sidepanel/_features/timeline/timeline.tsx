import { CircleCheck, CircleDashed, GitMerge, UserRoundPlus } from "lucide-react";
import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { bootstrap } from "@/core/bootstrap";
import { ContributionEventInterface } from "@/core/domain/contribution/models/contribution-event-model";
import { ContributionEventType } from "@/core/domain/contribution/models/contribution.types";
import { AnyType } from "@/core/kernel/types";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { Timeline as TimelineComponent, TimelinePort } from "@/design-system/organisms/timeline";

import { Translate } from "@/shared/translation/components/translate/translate";

import { TimelineProps } from "./timeline.types";

export function Timeline({ id }: TimelineProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const { data: events } = ContributionReactQueryAdapter.client.useGetContributionEvents({
    pathParams: { contributionUuid: id },
  });

  function getIcon(event: ContributionEventInterface) {
    const type = event.getEventType();
    switch (type) {
      case ContributionEventType.ISSUE_CREATED:
        return { component: CircleDashed };
      case ContributionEventType.LINKED_ISSUE_CREATED:
        return { component: CircleDashed };
      case ContributionEventType.ISSUE_ASSIGNED:
        return { component: UserRoundPlus };
      case ContributionEventType.LINKED_ISSUE_ASSIGNED:
        return { component: UserRoundPlus };
      case ContributionEventType.ISSUE_CLOSED:
        return { component: CircleCheck };
      case ContributionEventType.LINKED_ISSUE_CLOSED:
        return { component: CircleCheck };
      case ContributionEventType.PR_CREATED:
        return { component: CircleDashed };
      case ContributionEventType.PR_MERGED:
        return { component: GitMerge };
      default:
        return undefined;
    }
  }

  const timelineItems: TimelinePort<AnyType>["items"] = useMemo(() => {
    return (events || [])
      .map(event => {
        const eventType = event?.getEventType();
        const icon = getIcon(event);
        if (!eventType || !icon) return null;

        return {
          label: <Translate token={`panels:contribution.timeline.items.${eventType}`} />,
          icon,
          endContent: dateKernelPort.format(new Date(event.timestamp), "dd MMM yyyy"),
        };
      })
      .filter(Boolean) as TimelinePort<AnyType>["items"];
  }, [events]);

  return (
    <Paper border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:contribution.timeline.title" }} />
      <TimelineComponent items={timelineItems} />
    </Paper>
  );
}
