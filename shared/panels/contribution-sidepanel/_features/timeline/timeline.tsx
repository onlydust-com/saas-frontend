import { CircleCheck, CircleDashed, CircleDollarSign, CircleDotDashed, UserRoundPlus, UserX } from "lucide-react";
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
import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

import { TimelineProps } from "./timeline.types";

export function Timeline({ id }: TimelineProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const { data: events } = ContributionReactQueryAdapter.client.useGetContributionEvents({
    pathParams: { contributionId: id },
  });

  function getTranslate(event: ContributionEventInterface): TranslateProps | undefined {
    const type = event.getEventType();
    switch (type) {
      case ContributionEventType.CONTRIBUTOR_ASSIGNED:
        return { token: "panels:contribution.timeline.items.contributorAssigned" };
      case ContributionEventType.PR_CREATED:
        return { token: "panels:contribution.timeline.items.prCreated" };
      case ContributionEventType.CONTRIBUTOR_REMOVED:
        return { token: "panels:contribution.timeline.items.contributorRemoved" };
      case ContributionEventType.ISSUE_CREATED:
        return { token: "panels:contribution.timeline.items.issueCreated" };
      case ContributionEventType.TO_REVIEW:
        return { token: "panels:contribution.timeline.items.toReview" };
      case ContributionEventType.CLOSED:
        return { token: "panels:contribution.timeline.items.closed" };
      case ContributionEventType.REWARDED:
        return { token: "panels:contribution.timeline.items.rewarded" };
      default:
        return undefined;
    }
  }

  function getIcon(event: ContributionEventInterface) {
    const type = event.getEventType();
    switch (type) {
      case ContributionEventType.CONTRIBUTOR_ASSIGNED:
        return { component: UserRoundPlus };
      case ContributionEventType.PR_CREATED:
        return { component: CircleDashed };
      case ContributionEventType.CONTRIBUTOR_REMOVED:
        return { component: UserX };
      case ContributionEventType.ISSUE_CREATED:
        return { component: CircleDashed };
      case ContributionEventType.TO_REVIEW:
        return { component: CircleDotDashed };
      case ContributionEventType.CLOSED:
        return { component: CircleCheck };
      case ContributionEventType.REWARDED:
        return { component: CircleDollarSign };
      default:
        return undefined;
    }
  }

  const timelineItems: TimelinePort<AnyType>["items"] = useMemo(() => {
    return (events || [])
      .map(event => {
        const translate = getTranslate(event);
        const icon = getIcon(event);
        if (!translate?.token || !icon) return null;

        return {
          label: translate?.token ? <Translate token={translate.token} /> : undefined,
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
