import { Metadata } from "next";
import { ReactNode } from "react";

import { sharedMetadata } from "@/app/shared-metadata";

import { GithubPermissionsProvider } from "@/shared/features/github-permissions/github-permissions.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { ContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";

import { PageHeader } from "./_features/page-header/page-header";

export async function generateMetadata({ params }: { params: { projectSlug: string } }): Promise<Metadata> {
  try {
    const projectData = await fetch(
      `https://${process.env.NEXT_PUBLIC_ONLYDUST_API_BASEPATH}/api/v1/projects/slug/${params.projectSlug}`
    ).then(res => res.json());

    return {
      ...sharedMetadata,
      title: `${projectData.name} - OnlyDust`,
      openGraph: {
        ...sharedMetadata.openGraph,
        title: `${projectData.name} - OnlyDust`,
      },
      twitter: {
        ...sharedMetadata.twitter,
      },
    };
  } catch {
    return sharedMetadata;
  }
}

export default function ProjectsLayout({ params, children }: { params: { projectSlug: string }; children: ReactNode }) {
  return (
    <GithubPermissionsProvider projectSlug={params.projectSlug}>
      <PageContainer size="small" className="flex-1">
        <PageHeader projectSlug={params.projectSlug} />
        <div>{children}</div>
        <ContributionsSidepanel />
        <ContributorSidepanel />
      </PageContainer>
    </GithubPermissionsProvider>
  );
}
