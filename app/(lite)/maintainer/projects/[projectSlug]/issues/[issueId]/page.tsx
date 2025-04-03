"use client";

import { Github } from "lucide-react";
import dynamic from "next/dynamic";

import { PageBack } from "@/app/(lite)/_shared/components/page/page-back";
import { PageHeader } from "@/app/(lite)/_shared/components/page/page-header";
import { PageTitle } from "@/app/(lite)/_shared/components/page/page-title";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { Button } from "@/shared/ui/button";
import { TypographyMuted } from "@/shared/ui/typography";

import { Applicants } from "./_local/applicants";

const Emoji = dynamic(() => import("react-emoji-render"));

export default function IssueDetailPage({ params }: { params: { projectSlug: string; issueId: string } }) {
  const { data: project } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: params.projectSlug,
    },
    options: {
      enabled: Boolean(params.projectSlug),
    },
  });

  const { data: issue } = ContributionReactQueryAdapter.client.useGetContributionById({
    pathParams: { contributionUuid: params.issueId },
    options: { enabled: Boolean(params.issueId) },
  });

  if (!project || !issue) return null;

  return (
    <PageContainer size="small" className="flex flex-col gap-4 py-6">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            label: "Maintainer",
          },
          {
            label: "Projects",
            href: NEXT_ROUTER.maintainer.projects.root,
          },
          {
            label: project.name,
            href: NEXT_ROUTER.maintainer.projects.details.root(project.slug),
          },
          {
            label: `Issue #${issue.githubNumber}`,
          },
        ]}
      />

      <div className="flex flex-col gap-6">
        <PageHeader>
          <PageBack href={NEXT_ROUTER.maintainer.projects.details.root(project.slug)}>{project.name}</PageBack>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ContributionBadge type={issue.type} githubStatus={issue.githubStatus} number={issue.githubNumber} />

              <PageTitle>
                <span className="text-muted-foreground">{project.name} / </span>
                Issue #{issue.githubNumber}
              </PageTitle>
            </div>

            <Button variant="outline" asChild>
              <a href={issue.githubHtmlUrl} target="_blank" rel="noopener noreferrer">
                <Github />
                See on Github
              </a>
            </Button>
          </div>

          <Emoji>
            <TypographyMuted>{issue.githubTitle}</TypographyMuted>
          </Emoji>
        </PageHeader>

        <Applicants />
      </div>
    </PageContainer>
  );
}
