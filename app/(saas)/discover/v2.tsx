"use client";

import { PageBanner } from "@/app/(saas)/discover/_components/page-banner/page-banner";

import { RecoReactQueryAdapter } from "@/core/application/react-query-adapter/reco";

import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { PageInner } from "@/shared/features/page/page-inner/page-inner";

import { IssueCard } from "./_components/issue-card/issue-card";
import { NewProjectCard } from "./_components/new-project-card/new-project-card";
import { PageCarousel } from "./_components/page-carousel/page-carousel";
import { PageHeader } from "./_features/page-header/page-header";

export default function DiscoverPageV2() {
  const { data: tailoredDiscoveries } = RecoReactQueryAdapter.client.useGetTailoredDiscoveries({});

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
                    <NewProjectCard
                      key={project.id}
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
                  ))}

                  {issues.map(issue => (
                    <IssueCard
                      key={issue.id}
                      title={issue.title}
                      languages={issue.languages}
                      project={{
                        logoUrl: "",
                        name: issue.repo.owner,
                        repo: issue.repo.name,
                      }}
                      issue={{ number: issue.number, githubStatus: issue.status }}
                      createdAt={issue.createdAt}
                      labels={issue.labels.map(label => label.name)}
                    />
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
