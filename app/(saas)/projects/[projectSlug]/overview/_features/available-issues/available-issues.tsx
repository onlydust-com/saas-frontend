import { CircleDot } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useApplyIssueSidePanel } from "@/shared/panels/apply-issue-sidepanel/apply-issue-sidepanel.hooks";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3, TypographyMuted, TypographyP, TypographySmall } from "@/shared/ui/typography";

const Emoji = dynamic(() => import("react-emoji-render"));

export function AvailableIssues({ projectId = "" }: { projectId?: string }) {
  const dateKernel = bootstrap.getDateKernelPort();
  const { open } = useApplyIssueSidePanel();
  const { capture } = usePosthog();

  const { data, isLoading, isError, hasNextPage } = ProjectReactQueryAdapter.client.useGetProjectAvailableIssues({
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

  const availableIssues = useMemo(() => data?.pages.flatMap(page => page.issues) ?? [], [data]);

  const renderAvailableIssues = useCallback(() => {
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
          <TypographyMuted>Error loading available issues</TypographyMuted>
        </div>
      );
    }

    if (availableIssues.length === 0) {
      return (
        <div className={"flex items-center justify-center py-10"}>
          <TypographyMuted>No available issues found</TypographyMuted>
        </div>
      );
    }

    return (
      <ul className={"flex flex-col gap-3"}>
        {availableIssues.map(issue => (
          <li key={issue.id}>
            <button
              onClick={() => {
                capture("project_overview_click_available_issue", { projectId, issueId: issue.id });
                open({ issueId: issue.id, projectId });
              }}
              className={"w-full text-left transition-opacity hover:opacity-80"}
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
  }, [availableIssues, isLoading, isError, dateKernel]);

  return (
    <Card className={"flex flex-col gap-4 bg-gradient-to-br from-purple-950 to-transparent to-50% p-4"}>
      <header className={"flex items-center gap-2"}>
        <CircleDot className={"text-purple-700"} />
        <TypographyH3>Available Issues</TypographyH3>
      </header>

      <TypographyP>This project&apos;s available issues, ready for contributions.</TypographyP>

      {renderAvailableIssues()}

      {hasNextPage ? (
        <div>
          <Button variant={"outline"} asChild>
            <Link
              href={NEXT_ROUTER.projects.details.issues.root(projectId)}
              onClick={() => capture("project_overview_click_available_issue_view_all", { projectId })}
            >
              View all issues
            </Link>
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
