"use client";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { ActionableTips } from "./_features/actionable-tips/actionable-tips";

export default function DashboardPage({ params }: { params: { projectSlug: string } }) {
  const { data: project } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: { projectIdOrSlug: params.projectSlug },
    options: {
      enabled: Boolean(params.projectSlug),
    },
  });
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">Left content</div>
      <div className="lg:col-span-1">
        <ActionableTips projectId={project?.id ?? ""} />
      </div>
    </div>
  );
}
