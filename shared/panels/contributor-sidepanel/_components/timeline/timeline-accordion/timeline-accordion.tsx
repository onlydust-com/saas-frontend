import { Calendar } from "lucide-react";
import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/design-system/atoms/badge";
import { Accordion } from "@/design-system/molecules/accordion";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { TimelineItem } from "@/shared/panels/contributor-sidepanel/_components/timeline/timeline-item/timeline-item";

import { TimelineAccordionProps } from "./timeline-accordion.types";

function TimelineAccordionContent({ user }: TimelineAccordionProps) {
  const { data } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams: {
      contributorIds: [user.contributor.githubUserId],
      sort: "UPDATED_AT",
      sortDirection: "DESC",
      // add start and end date
    },
  });

  const contributions = useMemo(() => data?.pages.flatMap(contributions => contributions.contributions), [data]);

  if (contributions?.length) {
    return contributions?.map(contribution => <TimelineItem key={contribution.id} contribution={contribution} />);
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
      // titleProps={{ translate: { token: "panels:contributor.publicRepo.title", count: repos?.length || 0 } }}
      titleProps={{
        children: title,
      }}
      inline={true}
      startContent={
        <Badge size={"xs"} shape={"squared"} color={"grey"} iconOnly={true} icon={{ component: Calendar }} />
      }
    >
      <div className={"flex flex-col gap-md px-md pl-[0.875rem]"}>
        <div className={"border-l-1 border-l-components-badge-grey-border"}>
          <div className={"flex w-full flex-col gap-3 py-3"}>
            <TimelineAccordionContent {...props} />
          </div>
        </div>
      </div>
    </Accordion>
  );
}
