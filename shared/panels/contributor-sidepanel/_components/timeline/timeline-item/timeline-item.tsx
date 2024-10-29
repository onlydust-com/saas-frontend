import { bootstrap } from "@/core/bootstrap";

import { Typo } from "@/design-system/atoms/typo";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { TimelineItemProps } from "./timeline-item.types";

export function TimelineItem({ contribution }: TimelineItemProps) {
  const dateKernel = bootstrap.getDateKernelPort();
  return (
    <div className={"flex flex-row items-center justify-between gap-2 px-3"}>
      <div className={"flex flex-1 flex-row items-center gap-lg overflow-hidden"}>
        <ContributionBadge
          type={contribution.type}
          number={contribution.githubNumber}
          githubStatus={contribution.githubStatus}
        />
        <Typo
          size={"sm"}
          weight={"medium"}
          classNames={{
            base: "overflow-ellipsis overflow-hidden whitespace-nowrap hover:underline hover:underline-offset-2",
          }}
          as={"a"}
          htmlProps={{
            href: contribution.githubHtmlUrl,
            target: "_blank",
          }}
        >
          {contribution.githubTitle}
        </Typo>
      </div>
      <div>
        <Typo size={"xs"} color={"secondary"}>
          {dateKernel.format(new Date(contribution.createdAt), "dd MMM. yyyy")}
        </Typo>
      </div>
    </div>
  );
}
