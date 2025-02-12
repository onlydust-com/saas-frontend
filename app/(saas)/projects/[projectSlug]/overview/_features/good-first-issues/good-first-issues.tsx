import { ThumbsUp } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useApplyIssueSidePanel } from "@/shared/panels/apply-issue-sidepanel/apply-issue-sidepanel.hooks";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3, TypographyMuted, TypographyP, TypographySmall } from "@/shared/ui/typography";

const Emoji = dynamic(() => import("react-emoji-render"));

export function GoodFirstIssues({ projectId = "" }: { projectId?: string }) {
  const dateKernel = bootstrap.getDateKernelPort();
  const { open } = useApplyIssueSidePanel();

  const {
    data: goodFirstIssues,
    isLoading,
    isError,
    hasNextPage,
  } = ProjectReactQueryAdapter.client.useGetProjectGoodFirstIssues({
    pathParams: {
      projectId: projectId,
    },
    queryParams: {
      pageSize: 3,
    },
    options: {
      enabled: Boolean(projectId),
    },
  });

  const { data: availableIssues } = ProjectReactQueryAdapter.client.useGetProjectAvailableIssues({
    pathParams: {
      projectIdOrSlug: projectId,
    },
    queryParams: {
      pageSize: 3,
    },
    options: {
      enabled: Boolean(projectId),
    },
  });

  const flatGoodFirstIssues = useMemo(
    () => goodFirstIssues?.pages.flatMap(page => page.issues) ?? [],
    [goodFirstIssues]
  );
  const totalItemNumber = useMemo(() => {
    const value = availableIssues?.pages[0]?.totalItemNumber ?? 0;
    return value > 0 ? `(${value})` : "";
  }, [availableIssues]);

  const renderGoodFirstIssues = useCallback(() => {
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
        <div className={"flex items-center justify-center py-36"}>
          <TypographyMuted>Error loading Good First Issues</TypographyMuted>
        </div>
      );
    }

    if (flatGoodFirstIssues.length === 0) {
      return (
        <div className={"flex items-center justify-center py-36"}>
          <TypographyMuted>No good first issues found</TypographyMuted>
        </div>
      );
    }

    return (
      <ul className={"flex flex-col gap-3"}>
        {flatGoodFirstIssues.map(issue => (
          <li key={issue.id}>
            <button
              onClick={() => open({ issueId: issue.id, projectId })}
              className={"w-full transition-opacity hover:opacity-80"}
            >
              <Card className={"flex cursor-pointer items-center justify-between gap-3 p-3"}>
                <div className={"flex flex-1 items-center gap-3"}>
                  <ContributionBadge type={"ISSUE"} number={issue.number} githubStatus={issue.status} />

                  <TypographySmall className={"line-clamp-1"}>
                    <Emoji>{issue.title}</Emoji>
                  </TypographySmall>
                </div>

                <TypographyMuted className={"text-xs"}>
                  {dateKernel.format(new Date(issue.createdAt), "dd MMM.")}
                </TypographyMuted>
              </Card>
            </button>
          </li>
        ))}
      </ul>
    );
  }, [flatGoodFirstIssues, isLoading, isError, dateKernel]);

  return (
    <Card className={"flex flex-col gap-4 bg-gradient-to-br from-green-950 to-transparent to-50% p-4"}>
      <header className={"flex items-center gap-2"}>
        <ThumbsUp className={"text-green-700"} />
        <TypographyH3>Good First Issues</TypographyH3>
      </header>

      <TypographyP>This project's Good First Issues, perfect for new contributors.</TypographyP>

      {renderGoodFirstIssues()}

      {hasNextPage ? (
        <div>
          <Button variant={"outline"} asChild>
            <Link href={NEXT_ROUTER.projects.details.issues.root(projectId)}>View all issues {totalItemNumber}</Link>
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
