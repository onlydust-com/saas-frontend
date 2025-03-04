import { bootstrap } from "@/core/bootstrap";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { TypographyMuted } from "@/shared/ui/typography";

import { IssueCardProps } from "./issue-card.types";

export function IssueCard({ title, project, languages, createdAt, labels, issue }: IssueCardProps) {
  const limitedLabels = labels?.slice(0, 2) ?? [];

  const dateKernelPort = bootstrap.getDateKernelPort();
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex w-full flex-row items-center justify-start gap-2">
          <ContributionBadge type="ISSUE" githubStatus={issue.githubStatus} number={issue.number} />
          <div className="line-clamp-1 flex-1">{title}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex flex-row items-center gap-1">
          <Avatar className="size-5">
            <AvatarImage src={project.logoUrl} />
            <AvatarFallback>{project.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex w-full flex-row items-center justify-between gap-1">
            <TypographyMuted>
              {project.name}/{project.repo}
            </TypographyMuted>
            <div className="flex flex-row items-center justify-end gap-1">
              {languages.map(language => (
                <Avatar className="size-5">
                  <AvatarImage src={language.logoUrl} />
                </Avatar>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between gap-1">
        <div className="flex flex-row items-center justify-end gap-1">
          {limitedLabels.map(label => (
            <Badge variant={"secondary"} key={label}>
              {label}
            </Badge>
          ))}
        </div>
        <TypographyMuted>{dateKernelPort.formatDistanceToNow(new Date(createdAt))}</TypographyMuted>
      </CardFooter>
    </Card>
  );
}
