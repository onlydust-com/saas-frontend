import { CircleCheck, CircleDashed, CircleDollarSign, CircleDotDashed, UserRoundPlus, UserX } from "lucide-react";
import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { bootstrap } from "@/core/bootstrap";
import { ContributionEventType } from "@/core/domain/contribution/models/contribution.types";

import { Badge } from "@/design-system/atoms/badge";
import { IconPort } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

import { TimelineItemProps, TimelineProps } from "./timeline.types";

function TimelineItem({ event, isLast }: TimelineItemProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const Translate: TranslateProps | undefined = useMemo(() => {
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
  }, [event]);

  const BadgeIcon: IconPort | undefined = useMemo(() => {
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
  }, [event]);

  const date = dateKernelPort.format(new Date(event.timestamp), "dd MMM yyyy");
  const showSeparator = !isLast;

  if (!Translate) return null;

  return (
    <div className={"flex w-full items-center justify-between gap-1"}>
      <div className={"flex items-center justify-start gap-3"}>
        <div className={"flex flex-col items-center justify-start"}>
          <Badge size={"xs"} color={"brand"} shape={"squared"} iconOnly={true} icon={BadgeIcon} />
          {showSeparator && <div className={"bg-components-badge-brand-outline-border h-3 w-px"} />}
        </div>
        <div className={"flex flex-col items-center justify-start"}>
          <Typo size={"xs"} weight={"medium"} as={"div"} translate={Translate} />
          {showSeparator && <div className={"h-3"} />}
        </div>
      </div>
      <div className={"flex flex-col items-center justify-start"}>
        <Typo color={"secondary"} size={"xs"} weight={"regular"} as={"div"}>
          {date ?? ""}
        </Typo>
        {showSeparator && <div className={"h-3"} />}
      </div>
    </div>
  );
}

export function Timeline({ id }: TimelineProps) {
  const { data: events } = ContributionReactQueryAdapter.client.useGetContributionEvents({
    pathParams: { contributionId: id },
  });

  return (
    <Paper border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:contribution.timeline.title" }} />
      <div className={"flex flex-col"}>
        {events?.map((event, index) => (
          <TimelineItem key={event.timestamp} event={event} isLast={events?.length === index + 1} />
        ))}
      </div>
    </Paper>
  );
}
