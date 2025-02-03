import { Calendar } from "lucide-react";
import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Accordion } from "@/design-system/molecules/accordion";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";

import { TimelineItem } from "../timeline-item/timeline-item";
import { TimelineAccordionProps } from "./timeline-accordion.types";

function TimelineAccordionContent({ user, end, start, filters, search }: TimelineAccordionProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const { data, hasNextPage, fetchNextPage, isFetching, isLoading } =
    ContributionReactQueryAdapter.client.useGetContributions({
      queryParams: {
        contributorIds: [user.contributor.githubUserId],
        sort: "UPDATED_AT",
        sortDirection: "DESC",
        fromDate: dateKernelPort.format(start, "yyyy-MM-dd"),
        toDate: dateKernelPort.format(end, "yyyy-MM-dd"),
        search,
        ...filters,
      },
    });

  const contributions = useMemo(() => data?.pages.flatMap(contributions => contributions.contributions), [data]);

  if (contributions?.length) {
    return (
      <div className={"flex w-full flex-col gap-3 pt-3"}>
        {contributions?.map(contribution => <TimelineItem key={contribution.id} contribution={contribution} />)}
        {hasNextPage && (
          <Button
            size={"sm"}
            isTextButton={true}
            onClick={() => fetchNextPage()}
            translate={{ token: "panels:contributor.timeline.showMore" }}
            isLoading={isFetching}
          />
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={"flex w-full flex-col gap-3 pt-3"}>
        <Skeleton classNames={{ base: "w-full h-3" }} />
        <Skeleton classNames={{ base: "w-full h-3" }} />
        <Skeleton classNames={{ base: "w-full h-3" }} />
        <Skeleton classNames={{ base: "w-full h-3" }} />
      </div>
    );
  }

  return <EmptyStateLite />;
}

export function TimelineAccordion(props: TimelineAccordionProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const accordionId = useMemo(
    () => `timeline-${props.start.toISOString()}-${props.end.toISOString()}`,
    [props.start, props.end]
  );

  const title = useMemo(() => {
    return dateKernelPort.format(props.start, "MMMM yyyy");
  }, [props.start]);

  return (
    <Accordion
      id={accordionId}
      defaultSelected={props.isFirst ? [accordionId] : []}
      titleProps={{
        children: title,
      }}
      inline={true}
      startContent={
        <Badge size={"xs"} shape={"squared"} color={"grey"} iconOnly={true} icon={{ component: Calendar }} />
      }
    >
      <div className={"flex flex-col gap-md px-md pl-[0.8125rem]"}>
        <div className={"border-l-1 border-l-border-primary"}>
          <TimelineAccordionContent {...props} />
        </div>
      </div>
    </Accordion>
  );
}
