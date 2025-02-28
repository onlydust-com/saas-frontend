"use client";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { ProjectActivityGraph } from "@/shared/features/project-activity-graph/project-activity-graph";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { Translate } from "@/shared/translation/components/translate/translate";

import { AcquisitionFunnel } from "./_features/acquisition-funnel/acquisition-funnel";
import { ActionableTips } from "./_features/actionable-tips/actionable-tips";
import { LeaderBoard } from "./_features/leader-board/leader-board";
import { ProjectVisitors } from "./_features/project-visitors/project-visitors";

function DashboardPage({ params }: { params: { projectSlug: string } }) {
  const { data: project } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: { projectIdOrSlug: params.projectSlug },
    options: {
      enabled: Boolean(params.projectSlug),
    },
  });
  return (
    <>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"manageProjects:list.header.title"} />,
            href: NEXT_ROUTER.manageProjects.root,
          },
          {
            id: "details",
            label: project?.name ?? "",
            href: NEXT_ROUTER.manageProjects.default.root(params.projectSlug),
          },
          {
            id: "dashboard",
            label: <Translate token={"manageProjects:detail.views.dashboard"} />,
          },
        ]}
      />
      <ScrollView direction={"all"}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <ProjectVisitors projectId={project?.id ?? ""} />
            <AcquisitionFunnel projectId={project?.id ?? ""} />
            <ProjectActivityGraph projectIdOrSlug={params.projectSlug} />
          </div>
          <div className="flex flex-col gap-4 lg:col-span-1">
            <ActionableTips projectId={project?.id ?? ""} />
            <LeaderBoard projectId={project?.id ?? ""} />
          </div>
        </div>
      </ScrollView>
    </>
  );
}

export default withClientOnly(withAuthenticated(DashboardPage));
