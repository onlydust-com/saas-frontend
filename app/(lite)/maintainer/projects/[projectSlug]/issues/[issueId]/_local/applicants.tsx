"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";

import { ApplicantCard } from "@/app/(lite)/_shared/components/cards/applicant-card";
import { ApplicationPanel } from "@/app/(lite)/maintainer/projects/[projectSlug]/_local/application-panel";

import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";

import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyMuted } from "@/shared/ui/typography";

export function Applicants({ onSuccess }: { onSuccess?: () => void }) {
  const { issueId } = useParams<{ issueId: string }>();

  const { data, isLoading, isError } = IssueReactQueryAdapter.client.useGetIssueApplicants({
    pathParams: { contributionUuid: issueId },
    queryParams: {
      isIgnored: false,
    },
    options: {
      enabled: Boolean(issueId),
    },
  });

  const applicants = useMemo(() => data?.pages.flatMap(page => page.applicants) ?? [], [data]);

  if (isLoading) {
    return (
      <section className="flex flex-col gap-4">
        <Skeleton className="h-[118px] w-full" />
        <Skeleton className="h-[118px] w-full" />
        <Skeleton className="h-[118px] w-full" />
      </section>
    );
  }

  if (isError) {
    return <TypographyMuted className="py-16 text-center">Error loading applicants</TypographyMuted>;
  }

  if (applicants.length === 0) {
    return <TypographyMuted className="py-16 text-center">No applicants found</TypographyMuted>;
  }

  return (
    <div className="flex flex-col gap-4">
      {applicants.map(applicant => (
        <ApplicationPanel
          key={applicant.applicationId}
          contributorId={applicant.contributor.githubUserId}
          applicationId={applicant.applicationId}
          onSuccess={onSuccess}
        >
          <ApplicantCard
            avatarUrl={applicant.contributor.avatarUrl}
            login={applicant.contributor.login}
            rank={applicant.contributor.rank.getTitle().wording}
            appliedAt={applicant.appliedAt}
            languages={applicant.languages}
          />
        </ApplicationPanel>
      ))}
    </div>
  );
}
