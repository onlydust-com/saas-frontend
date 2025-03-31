"use client";

import { Card } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";

import { Markdown } from "@/shared/features/markdown/markdown";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { ApplicationCard } from "@/shared/panels/contribution-sidepanel/_features/application-card/application-card";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";
import { useContributorSidePanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.hooks";
import { Button } from "@/shared/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { TypographyH4, TypographyLarge, TypographyMuted } from "@/shared/ui/typography";

const Emoji = dynamic(() => import("react-emoji-render"));

export default function IssueDetailPage({ params }: { params: { projectSlug: string; issueId: string } }) {
  const { data } = ContributionReactQueryAdapter.client.useGetContributionById({
    pathParams: { contributionUuid: params.issueId },
    options: { enabled: Boolean(params.issueId) },
  });

  if (!data) return null;

  return (
    <PageContainer size="small" className="flex flex-col gap-4 py-6">
      <header className="flex items-center gap-4">
        <Button variant="secondary" size="icon" asChild>
          <Link href={`/lite/my-projects/${params.projectSlug}`}>
            <ArrowLeft />
          </Link>
        </Button>

        <TypographyH4>Issue #{data.githubNumber}</TypographyH4>
      </header>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="flex flex-col gap-4">
          <Emoji>
            <TypographyLarge>{data.githubTitle}</TypographyLarge>
          </Emoji>

          {data.githubBody ? (
            <Emoji>
              <Markdown content={data.githubBody} />
            </Emoji>
          ) : (
            <TypographyMuted>No description provided for this issue.</TypographyMuted>
          )}
        </TabsContent>

        <TabsContent value="applications">
          <Applications contributionId={params.issueId} repoId={data.repo.id} />
        </TabsContent>
      </Tabs>

      <ContributorSidepanel />
    </PageContainer>
  );
}

function Applications({ contributionId, repoId }: { contributionId: string; repoId: number }) {
  const { open } = useContributorSidePanel();

  const { data } = IssueReactQueryAdapter.client.useGetIssueApplicants({
    pathParams: { contributionUuid: contributionId },
    queryParams: {
      isIgnored: false,
    },
    options: {
      enabled: !!contributionId,
    },
  });

  const applicants = useMemo(() => data?.pages.flatMap(page => page.applicants) ?? [], [data]);

  return (
    <div className="flex flex-col gap-3">
      {applicants.length > 0 ? (
        applicants.map(applicant => (
          <Card
            key={applicant.applicationId}
            className="bg-stack"
            onClick={() => open({ githubId: applicant.contributor.githubUserId })}
          >
            <ApplicationCard application={applicant} contributionId={contributionId} repoId={repoId} />
          </Card>
        ))
      ) : (
        <TypographyMuted>No applicants found.</TypographyMuted>
      )}
    </div>
  );
}
