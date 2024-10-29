import { Clock } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";

import { Icon } from "@/design-system/atoms/icon";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { UserGroup } from "@/shared/features/user/user-group/user-group";

import { TimelineItemProps } from "./timeline-item.types";

export function TimelineItem({ contribution }: TimelineItemProps) {
  const dateKernel = bootstrap.getDateKernelPort();

  function tooltipContent() {
    return (
      <div className={"grid gap-lg"}>
        <header className={"flex w-full items-start justify-between gap-lg overflow-hidden"}>
          <Typo
            size={"xs"}
            weight={"medium"}
            classNames={{
              base: "text-wrap line-clamp-2",
            }}
          >
            {contribution.githubTitle}
          </Typo>

          <div>
            <ContributionBadge
              type={contribution.type}
              githubStatus={contribution.githubStatus}
              number={contribution.githubNumber}
            />
          </div>
        </header>

        <div className={"grid gap-xl"}>
          <div className={"flex items-center gap-md empty:hidden"}>
            {contribution.lastUpdatedAt && (
              <Typo size={"xs"} classNames={{ base: "flex gap-sm" }} color={"tertiary"}>
                <Icon component={Clock} />
                {dateKernel.formatDistanceToNow(new Date(contribution.lastUpdatedAt))}
              </Typo>
            )}
          </div>

          <div className="flex">
            <UserGroup
              avatarProps={{ size: "xs" }}
              users={contribution.contributors}
              maxUsers={2}
              label={{
                size: "xs",
                weight: "regular",
                color: "tertiary",
                translate: {
                  token: "cards:cardContributionKanban.contributors",
                  count: contribution.contributors.length,
                },
              }}
            />
          </div>

          <footer className={"flex flex-wrap justify-between gap-lg overflow-hidden"}>
            {/*{renderGithubLabels()}*/}
            labels
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className={"flex flex-row items-center justify-between gap-2 px-3"}>
      <div className={"flex flex-1 flex-row items-center gap-lg overflow-hidden"}>
        <ContributionBadge
          type={contribution.type}
          number={contribution.githubNumber}
          githubStatus={contribution.githubStatus}
        />
        <Tooltip content={tooltipContent()} background={"primary"}>
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
        </Tooltip>
      </div>
      <div>
        <Typo size={"xs"} color={"secondary"}>
          {dateKernel.format(new Date(contribution.createdAt), "dd MMM. yyyy")}
        </Typo>
      </div>
    </div>
  );
}
