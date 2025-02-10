import { Metadata } from "next";
import { ReactNode } from "react";

import { GithubPermissionsProvider } from "@/shared/features/github-permissions/github-permissions.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { ApplyIssueSidepanel } from "@/shared/panels/apply-issue-sidepanel/apply-issue-sidepanel";

import { ProjectHeader } from "./_features/project-header/project-header";
import { ProjectNavigation } from "./_features/project-navigation/project-navigation";

export async function generateMetadata({ params }: { params: { projectSlug: string } }): Promise<Metadata> {
  const projectSlug = params.projectSlug;

  return {
    openGraph: {
      images: [`https://previous.onlydust.com/p/${projectSlug}/opengraph-image`],
    },
  };
}

export default function ProjectsLayout({ params, children }: { params: { projectSlug: string }; children: ReactNode }) {
  return (
    <GithubPermissionsProvider projectSlug={params.projectSlug}>
      <PageContainer size="large" className="flex-1">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6">
          {/* Project Header */}
          <ProjectHeader projectSlug={params.projectSlug} />
          <ProjectNavigation params={params} />

          {/* Main Content */}
          <div className="flex-1">{children}</div>
        </div>

        <ApplyIssueSidepanel />
      </PageContainer>
    </GithubPermissionsProvider>
  );
}
