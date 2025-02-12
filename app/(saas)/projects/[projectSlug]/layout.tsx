import { Metadata } from "next";
import { ReactNode } from "react";

import { GithubPermissionsProvider } from "@/shared/features/github-permissions/github-permissions.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { ApplyIssueSidepanel } from "@/shared/panels/apply-issue-sidepanel/apply-issue-sidepanel";

import { PageHeader } from "./_features/page-header/page-header";

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
      <PageContainer size="small" className="flex-1">
        <PageHeader projectSlug={params.projectSlug} />
        <div>{children}</div>
        <ApplyIssueSidepanel />
      </PageContainer>
    </GithubPermissionsProvider>
  );
}
