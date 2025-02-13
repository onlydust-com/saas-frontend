import dynamic from "next/dynamic";
import { useCallback, useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { bootstrap } from "@/core/bootstrap";
import { ContributionAs } from "@/core/domain/contribution/models/contribution.types";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge/variants/contribution-badge-default";

import { useContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.hooks";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH3, TypographyMuted, TypographySmall } from "@/shared/ui/typography";

const Emoji = dynamic(() => import("react-emoji-render"));

export function RecentActivity({ projectId = "" }: { projectId?: string }) {
  const dateKernel = bootstrap.getDateKernelPort();
  const { open } = useContributionsSidepanel();

  const { data, isLoading, isError } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams: {
      pageSize: 10,
      sort: "UPDATED_AT",
      sortDirection: "DESC",
      projectIds: [projectId],
    },
    options: {
      enabled: Boolean(projectId),
    },
  });

  const contributions = useMemo(() => data?.pages.flatMap(page => page.contributions) ?? [], [data]);

  const renderContributions = useCallback(() => {
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

    if (contributions.length === 0) {
      return (
        <div className={"flex items-center justify-center py-36"}>
          <TypographyMuted>No contributions found</TypographyMuted>
        </div>
      );
    }

    return (
      <ul className={"flex flex-col gap-3"}>
        {contributions.map(contribution => (
          <li key={contribution.id}>
            <button
              onClick={() => open({ id: contribution.id, as: ContributionAs.CONTRIBUTOR })}
              className={
                "flex w-full cursor-pointer items-center justify-between gap-3 text-left transition-opacity hover:opacity-80"
              }
            >
              <div className={"flex flex-1 items-center gap-3"}>
                <ContributionBadge
                  type={contribution.type}
                  number={contribution.githubNumber}
                  githubStatus={contribution.githubStatus}
                />

                <TypographySmall className={"line-clamp-1"}>
                  <Emoji>{contribution.githubTitle}</Emoji>
                </TypographySmall>
              </div>

              <TypographyMuted className={"text-xs"}>
                {dateKernel.format(new Date(contribution.createdAt), "dd MMM.")}
              </TypographyMuted>
            </button>
          </li>
        ))}
      </ul>
    );
  }, [contributions, isLoading, isError, dateKernel]);

  return (
    <Card className={"flex flex-col gap-4 p-4"}>
      <TypographyH3>Recent Activity</TypographyH3>

      {renderContributions()}
    </Card>
  );
}
