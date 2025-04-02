"use client";

import { Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { ContributionActivityStatus } from "@/core/domain/contribution/models/contribution.types";

import { CardContributionKanban as Card } from "@/design-system/molecules/cards/card-contribution-kanban";

import { Input } from "@/shared/ui/input";
import { TypographyMuted } from "@/shared/ui/typography";

export function Issues() {
  const { projectSlug } = useParams<{ projectSlug: string }>();

  const { data, isLoading, isError } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams: {
      statuses: [
        ContributionActivityStatus.IN_PROGRESS,
        ContributionActivityStatus.TO_REVIEW,
        ContributionActivityStatus.DONE,
        ContributionActivityStatus.ARCHIVED,
      ],
      projectSlugs: [projectSlug],
    },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  const contributions = useMemo(() => data?.pages.flatMap(page => page.contributions) ?? [], [data]);

  const renderContributions = useCallback(() => {
    if (isLoading) {
      return (
        <section className="flex flex-col gap-4">
          <Skeleton className="h-[90px] w-full" />
          <Skeleton className="h-[90px] w-full" />
          <Skeleton className="h-[90px] w-full" />
        </section>
      );
    }

    if (isError) {
      return <TypographyMuted className="py-16 text-center">Error loading issues</TypographyMuted>;
    }

    if (contributions.length === 0) {
      return <TypographyMuted className="py-16 text-center">No issues found</TypographyMuted>;
    }

    return contributions?.map(contribution => (
      <Link key={contribution.id} href={`/lite/my-projects/${projectSlug}/issues/${contribution.id}`}>
        <Card
          type={contribution.type}
          githubTitle={contribution.githubTitle}
          githubStatus={contribution.githubStatus}
          githubNumber={contribution.githubNumber}
          lastUpdatedAt={contribution.lastUpdatedAt}
          applicants={contribution.applicants}
          linkedIssues={contribution.linkedIssues}
          githubLabels={contribution.githubLabels}
          githubHtmlUrl={contribution.githubHtmlUrl}
        />
      </Link>
    ));
  }, [contributions]);

  return (
    <section className="flex flex-col gap-4 pt-4">
      <Input placeholder="Search issues" />

      {renderContributions()}
    </section>
  );
}
