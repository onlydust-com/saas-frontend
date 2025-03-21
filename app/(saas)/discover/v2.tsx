"use client";

import Link from "next/link";

import { GetStartedDialog } from "@/app/(auth)/signup/_features/get-started-dialog/get-started-dialog";
import { PageBanner } from "@/app/(saas)/discover/_components/page-banner/page-banner";

import { RecoReactQueryAdapter } from "@/core/application/react-query-adapter/reco";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { PageInner } from "@/shared/features/page/page-inner/page-inner";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useForcedOnboarding } from "@/shared/hooks/flags/use-forced-onboarding";
import { IssueSidepanel } from "@/shared/panels/issue-sidepanel/issue-sidepanel";

import { IssueCard } from "./_components/issue-card/issue-card";
import { NewProjectCard } from "./_components/new-project-card/new-project-card";
import { PageCarousel } from "./_components/page-carousel/page-carousel";
import { PageHeader } from "./_features/page-header/page-header";

export default function DiscoverPageV2() {
  const { user } = useAuthUser();

  const { data: tailoredDiscoveries } = RecoReactQueryAdapter.client.useGetTailoredDiscoveries({
    pathParams: {
      contributorId: user?.githubUserId ?? undefined,
    },
  });

  return (
    <PageContainer size="full">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Discover",
          },
        ]}
      />
      <GetStartedDialog />

      <div className="flex flex-col gap-16 pt-4">
        <PageHeader />
        <PageInner className="relative z-[1] flex w-full flex-col gap-14">
          {tailoredDiscoveries?.sections.map((section, index) => {
            const resourceType = section.getResourceType();
            const projects = section.getProjects();
            const issues = section.getIssues();
            const count = projects.length ?? issues.length ?? 0;

            return (
              <>
                <PageCarousel
                  key={section.title}
                  title={section.title}
                  count={count}
                  description={section.subtitle}
                  resourceType={resourceType}
                >
                  {projects.map(project => (
                    <Link key={project.id} href={NEXT_ROUTER.projects.details.root(project.id)}>
                      <NewProjectCard
                        className="min-h-full"
                        name={project?.name}
                        logoUrl={project.logoUrl}
                        description={project.shortDescription}
                        categories={project.categories.map(category => category.name)}
                        languages={project.languages}
                        stars={project.starCount}
                        forks={project.forkCount}
                        contributors={project.contributorCount}
                      />
                    </Link>
                  ))}

                  {issues.map(issue => (
                    <IssueSidepanel
                      key={issue.uuid}
                      projectId={issue.project?.id ?? ""}
                      // @ts-expect-error githubId is a string
                      issueId={issue.githubId as number}
                    >
                      <IssueCard
                        key={issue.uuid}
                        title={issue.githubTitle}
                        languages={
                          issue.languages?.map(language => ({
                            name: language.name,
                            logoUrl: language.logoUrl,
                          })) ?? []
                        }
                        project={{
                          logoUrl: issue.project?.logoUrl ?? "",
                          name: issue.repo.owner,
                          repo: issue.repo.name,
                        }}
                        issue={{ number: issue.githubNumber, githubStatus: issue.githubStatus }}
                        createdAt={issue.createdAt}
                        labels={issue.githubLabels?.map(label => label.name) ?? []}
                      />
                    </IssueSidepanel>
                  ))}
                </PageCarousel>

                {index === 0 ? <PageBanner /> : null}
              </>
            );
          })}
        </PageInner>
      </div>
    </PageContainer>
  );
}
