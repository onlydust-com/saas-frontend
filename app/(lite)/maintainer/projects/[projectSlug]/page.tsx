"use client";

import Link from "next/link";
import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ContributionActivityStatus } from "@/core/domain/contribution/models/contribution.types";

import { CardContributionKanban as Card } from "@/design-system/molecules/cards/card-contribution-kanban";

import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { TypographyH3 } from "@/shared/ui/typography";

export default function MyProjectDetailPage({ params }: { params: { projectSlug: string } }) {
  const { data: project } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: params.projectSlug,
    },
    options: {
      enabled: Boolean(params.projectSlug),
    },
  });

  if (!project) return null;

  return (
    <PageContainer size="small" className="flex flex-col gap-4 py-6">
      <header className="flex items-center gap-2">
        <Avatar className="size-12 rounded-xl">
          <AvatarImage src={project.logoUrl} />
          <AvatarFallback className="rounded-xl">{project.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <TypographyH3>{project.name}</TypographyH3>
      </header>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending applications</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <PendingApplications projectSlug={params.projectSlug} />
        </TabsContent>
        <TabsContent value="issues">
          <Issues projectSlug={params.projectSlug} />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}

function PendingApplications({ projectSlug }: { projectSlug: string }) {
  const { data } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams: {
      statuses: [ContributionActivityStatus.NOT_ASSIGNED],
      projectSlugs: [projectSlug],
    },
    options: {
      enabled: !!projectSlug,
    },
  });

  const contributions = useMemo(() => data?.pages.flatMap(page => page.contributions) ?? [], [data]);

  return (
    <div className="flex flex-col gap-3">
      {contributions?.map(contribution => (
        <Link key={contribution.id} href={`/lite/my-projects/${projectSlug}/issues/${contribution.id}`}>
          <Card
            classNames={{
              base: "bg-stack",
            }}
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
      ))}
    </div>
  );
}

function Issues({ projectSlug }: { projectSlug: string }) {
  const { data } = ContributionReactQueryAdapter.client.useGetContributions({
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
      enabled: !!projectSlug,
    },
  });

  const contributions = useMemo(() => data?.pages.flatMap(page => page.contributions) ?? [], [data]);

  return (
    <div className="flex flex-col gap-3">
      {contributions?.map(contribution => (
        <Link key={contribution.id} href={`/lite/my-projects/${projectSlug}/issues/${contribution.id}`}>
          <Card
            classNames={{
              base: "bg-stack",
            }}
            type={contribution.type}
            githubTitle={contribution.githubTitle}
            githubStatus={contribution.githubStatus}
            githubNumber={contribution.githubNumber}
            lastUpdatedAt={contribution.lastUpdatedAt}
            contributors={contribution.contributors}
            linkedIssues={contribution.linkedIssues}
            githubLabels={contribution.githubLabels}
            githubHtmlUrl={contribution.githubHtmlUrl}
          />
        </Link>
      ))}
    </div>
  );
}
