"use client";

import { PageBack } from "@/app/(lite)/_shared/components/page/page-back";
import { PageContainer } from "@/app/(lite)/_shared/components/page/page-container";
import { PageHeader } from "@/app/(lite)/_shared/components/page/page-header";
import { PageTitle } from "@/app/(lite)/_shared/components/page/page-title";
import { Applications } from "@/app/(lite)/maintainer/projects/[projectSlug]/_local/applications";
import { Issues } from "@/app/(lite)/maintainer/projects/[projectSlug]/_local/issues";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

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
    <PageContainer>
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
          },
        ]}
      />
      <div className="flex flex-col gap-6">
        <PageHeader>
          <PageBack href={NEXT_ROUTER.maintainer.projects.root}>My projects</PageBack>

          <div className="flex items-center gap-2">
            <Avatar className="size-10 rounded-xl">
              <AvatarImage src={project.logoUrl} />
              <AvatarFallback className="rounded-xl">{project.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <PageTitle>{project.name}</PageTitle>
          </div>
        </PageHeader>

        <Tabs defaultValue="applications">
          <TabsList>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <Applications projectId={project.id} />
          </TabsContent>

          <TabsContent value="issues">
            <Issues />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
