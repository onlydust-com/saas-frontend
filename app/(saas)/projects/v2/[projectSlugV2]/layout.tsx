import { Metadata } from "next";
import { PropsWithChildren } from "react";

import { GithubPermissionsProvider } from "@/shared/features/github-permissions/github-permissions.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { ContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";

import { ProjectAside } from "./_features/project-aside";

export async function generateMetadata({ params }: { params: { projectSlug: string } }): Promise<Metadata> {
  const projectSlug = params.projectSlug;

  return {
    openGraph: {
      images: [`https://previous.onlydust.com/p/${projectSlug}/opengraph-image`],
    },
  };
}

export default function ProjectDetailLayout({
  params,
  children,
}: PropsWithChildren<{ params: { projectSlugV2: string } }>) {
  return (
    <GithubPermissionsProvider projectSlug={params.projectSlugV2}>
      <PageContainer size="small">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 md:max-w-[200px] lg:max-w-[300px]">
            <ProjectAside projectSlug={params.projectSlugV2} />
          </div>

          <div>{children}</div>
        </div>

        <ContributionsSidepanel />
        <ContributorSidepanel />
      </PageContainer>
    </GithubPermissionsProvider>
  );
}
