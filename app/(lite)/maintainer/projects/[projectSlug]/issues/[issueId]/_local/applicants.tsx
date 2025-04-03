"use client";

import { ArrowRight } from "lucide-react";
import { useMemo } from "react";

import { ApplicationPanel } from "@/app/(lite)/maintainer/projects/[projectSlug]/_local/application-panel";

import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";
import { bootstrap } from "@/core/bootstrap";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyMuted, TypographyP } from "@/shared/ui/typography";
import { useParams } from "next/navigation";

export function Applicants() {
  const dateKernelPort = bootstrap.getDateKernelPort();

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
        >
          <Card className="flex flex-col gap-3 p-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="size-10">
                  <AvatarImage src={applicant.contributor.avatarUrl} />
                  <AvatarFallback>{applicant.contributor.login.charAt(0)}</AvatarFallback>
                </Avatar>

                <div>
                  <TypographyP>{applicant.contributor.login}</TypographyP>
                  <TypographyMuted>{applicant.contributor.rank.getTitle().wording}</TypographyMuted>
                </div>
              </div>

              <TypographyMuted>
                {applicant.appliedAt ? dateKernelPort.formatDistanceToNow(new Date(applicant.appliedAt)) : null}
              </TypographyMuted>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {applicant.languages?.map(language => (
                  <Avatar key={language.id} className="size-5">
                    <AvatarImage src={language.logoUrl} />
                    <AvatarFallback>{language.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>

              <Button variant="secondary" size="sm">
                View
                <ArrowRight />
              </Button>
            </div>
          </Card>
        </ApplicationPanel>
      ))}
    </div>
  );
}
