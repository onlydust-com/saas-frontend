import { useCallback } from "react";
import Emoji from "react-emoji-render";

import { bootstrap } from "@/core/bootstrap";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3, TypographyMuted, TypographyP, TypographySmall } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { AmountOfWorkBadge } from "../amount-of-work-badge/amount-of-work-badge";
import { IssueListProps } from "./issue-list.types";

export function IssueList({
  containerClassName,
  title,
  emptyMessage,
  errorMessage,
  description,
  issues,
  isError,
  isLoading,
}: IssueListProps) {
  const dateKernel = bootstrap.getDateKernelPort();

  const renderIssues = useCallback(() => {
    if (isLoading) {
      return (
        <ul className={"flex flex-col gap-3"}>
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index}>
              <Skeleton className={"h-12 w-full"} />
            </li>
          ))}
        </ul>
      );
    }

    if (isError) {
      return (
        <div className={"flex items-center justify-center py-10"}>
          <TypographyMuted>{errorMessage}</TypographyMuted>
        </div>
      );
    }

    if (issues.length === 0) {
      return (
        <div className={"flex items-center justify-center py-10"}>
          <TypographyMuted>{emptyMessage}</TypographyMuted>
        </div>
      );
    }

    return (
      <ul className={"flex flex-col gap-3"}>
        {issues.map(issue => (
          <li key={issue.number}>
            <a
              target="_blank"
              rel="noreferrer"
              href={issue.url}
              className={"w-full text-left transition-opacity hover:opacity-80"}
            >
              <Card className={"flex cursor-pointer flex-col items-start justify-start gap-2 p-3"}>
                <div className="flex w-full items-center justify-between gap-px">
                  <div className={"flex flex-1 items-center gap-3"}>
                    <ContributionBadge type={issue.type} number={issue.number} githubStatus={issue.githubStatus} />

                    <TypographySmall className={"line-clamp-1"}>
                      <Emoji>{issue.title}</Emoji>
                    </TypographySmall>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 first:pl-0">
                    <div className="flex flex-col gap-1">
                      <AmountOfWorkBadge value={issue.score} />
                    </div>
                  </div>
                </div>
                <TypographyMuted className={"line-clamp-1"}>
                  <Emoji>
                    {issue.justifications?.length > 100
                      ? `${issue.justifications.slice(0, 100)}...`
                      : issue.justifications}
                  </Emoji>
                </TypographyMuted>
              </Card>
            </a>
          </li>
        ))}
      </ul>
    );
  }, [issues, isLoading, isError, dateKernel]);

  return (
    <Card className={cn("flex flex-col gap-4 p-4", containerClassName)}>
      <header className={"flex items-center gap-2"}>
        <TypographyH3>{title}</TypographyH3>
      </header>

      <TypographyP>{description}</TypographyP>

      {renderIssues()}
    </Card>
  );
}
