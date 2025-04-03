"use client";

import { ArrowRight, Github } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { PageBack } from "@/app/(lite)/_shared/components/page/page-back";
import { PageHeader } from "@/app/(lite)/_shared/components/page/page-header";
import { PageTitle } from "@/app/(lite)/_shared/components/page/page-title";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Markdown } from "@/shared/features/markdown/markdown";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TypographyMuted, TypographyP } from "@/shared/ui/typography";

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
                <span className="hidden text-muted-foreground md:inline">{project.name} / </span>
                Issue #{issue.githubNumber}
              </PageTitle>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="md:hidden" asChild>
                <a href={issue.githubHtmlUrl} target="_blank" rel="noopener noreferrer">
                  <Github />
                </a>
              </Button>

              <Button variant="outline" className="hidden md:flex" asChild>
                <a href={issue.githubHtmlUrl} target="_blank" rel="noopener noreferrer">
                  <Github />
                  See on Github
                </a>
              </Button>
            </div>
          </div>

          <Emoji>
            <TypographyMuted>{issue.githubTitle}</TypographyMuted>
          </Emoji>
        </PageHeader>

        {issue.contributors.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div>
              <TypographyP>Assignees</TypographyP>
              <TypographyMuted>Designated contributors responsible for the issue.</TypographyMuted>
            </div>

            <div className="flex flex-col gap-3">
              {issue.contributors.map(contributor => (
                <Link href={NEXT_ROUTER.users.details.root(contributor.login)} key={contributor.githubUserId}>
                  <Card className="flex items-center justify-between gap-3 p-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-10">
                        <AvatarImage src={contributor.avatarUrl} />
                        <AvatarFallback>{contributor.login.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <TypographyP>{contributor.login}</TypographyP>
                    </div>

                    <Button variant="secondary" size="sm">
                      View
                      <ArrowRight />
                    </Button>
                  </Card>
                </Link>
              ))}
            </div>

            {issue.githubBody ? (
              <div>
                <TypographyP>Description</TypographyP>

                <div className="text-muted-foreground">
                  <Emoji>
                    <Markdown content={issue.githubBody} />
                  </Emoji>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <Applicants />
        )}
      </div>
    </PageContainer>
  );
}
