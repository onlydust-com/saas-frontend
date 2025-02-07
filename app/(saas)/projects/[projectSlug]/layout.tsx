import { Metadata } from "next";
import { ReactNode } from "react";

import { ProjectNavigation } from "@/app/(saas)/projects/[projectSlug]/_features/project-navigation/project-navigation";

import { Paper } from "@/design-system/atoms/paper/variants/paper-default";

import { GithubPermissionsProvider } from "@/shared/features/github-permissions/github-permissions.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { ApplyIssueSidepanel } from "@/shared/panels/apply-issue-sidepanel/apply-issue-sidepanel";

import { ProjectOverviewSummary } from "./_features/project-details/project-overview-summary/project-overview-summary";
import { SimilarProjects } from "./_features/project-details/similar-projects/similar-projects";

export async function generateMetadata({ params }: { params: { projectSlug: string } }): Promise<Metadata> {
  const projectSlug = params.projectSlug;

  return {
    openGraph: {
      images: [`https://previous.onlydust.com/hackathons/${projectSlug}/opengraph-image`],
    },
  };
}

export default function ProjectsLayout({ params, children }: { params: { projectSlug: string }; children: ReactNode }) {
  return (
    <GithubPermissionsProvider projectSlug={params.projectSlug}>
      <PageContainer size="medium" className="flex-1">
        <div className="flex flex-col items-start justify-start gap-4 pt-4 laptop:h-full laptop:flex-row">
          <div className="flex w-full flex-col gap-4 laptop:sticky laptop:top-20 laptop:w-[440px] laptop:min-w-[440px]">
            <ProjectOverviewSummary projectIdOrSlug={params.projectSlug} />
            <SimilarProjects projectIdOrSlug={params.projectSlug} />
          </div>

          <Paper
            background="primary"
            border="primary"
            classNames={{ base: "w-full overflow-hidden tablet:h-full flex flex-col" }}
            px="none"
          >
            <div className={"flex w-full flex-row items-center justify-between gap-1"}>
              <ProjectNavigation params={params} />
            </div>
            {children}
          </Paper>
        </div>

        <ApplyIssueSidepanel />
      </PageContainer>
    </GithubPermissionsProvider>
  );
}
