import { Book, Clock } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { Accordion } from "@/design-system/molecules/accordion";

import { Markdown } from "@/shared/features/markdown/markdown";
import { cn } from "@/shared/helpers/cn";

import { SummaryProps } from "./summary.types";

function Labels({ issue }: SummaryProps) {
  if (!issue.labels?.length) return null;

  return (
    <div className={cn("flex flex-row items-center gap-1")}>
      {issue.labels.map(({ name, description }) =>
        description ? (
          <Tooltip key={name} content={description}>
            <Badge size="xs" color="grey">
              {name}
            </Badge>
          </Tooltip>
        ) : (
          <Badge size="xs" key={name} color="grey">
            {name}
          </Badge>
        )
      )}
    </div>
  );
}

function Stats({ issue }: SummaryProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const createdSince = issue?.createdAt ? dateKernelPort.formatDistanceToNow(new Date(issue.createdAt)) : null;
  const createdBy = {
    login: issue.author.login,
    avatarUrl: issue.author.avatarUrl,
  };
  const repo = {
    name: issue.repo.name,
    url: issue.repo.htmlUrl,
  };

  return (
    <div className="flex flex-row items-center justify-start gap-2">
      {!!createdSince && (
        <div className="flex flex-row items-center justify-start gap-1">
          <Icon component={Clock} />
          <Typo size="xs" weight="medium" color="secondary">
            {createdSince}
          </Typo>
        </div>
      )}
      {!!createdBy && (
        <div className="flex flex-row items-center justify-start gap-1">
          <Avatar shape="squared" size="xs" src={createdBy.avatarUrl} />
          <Typo size="xs" weight="medium" color="secondary">
            <Typo as="span" size="xs" weight="medium" color="tertiary">
              By &nbsp;
            </Typo>
            {createdBy.login}
          </Typo>
        </div>
      )}
      {!!repo && (
        <div className="flex flex-row items-center justify-start gap-1">
          <Icon component={Book} />
          <Typo size="xs" weight="medium" color="secondary" as="a" htmlProps={{ href: repo.url, target: "_blank" }}>
            {repo.name}
          </Typo>
        </div>
      )}
    </div>
  );
}

export function Summary({ issue }: SummaryProps) {
  return (
    <>
      <Accordion
        inline={true}
        classNames={{ heading: "after:hidden", base: "p-0", content: "py-4" }}
        id={"summary"}
        titleProps={{ size: "md", weight: "medium", translate: { token: "panels:applyIssue.summary.title" } }}
      >
        <div className="flex w-full flex-col gap-4">{issue.body && <Markdown content={issue.body} />}</div>
      </Accordion>
      <Labels issue={issue} />
      <Stats issue={issue} />
    </>
  );
}
