"use client";

import { ProjectsTable } from "@/app/(saas)/programs/[programId]/projects/_features/projects-table/projects-table";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { ProjectSidepanel } from "@/shared/panels/project-sidepanel/project-sidepanel";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ProgramsProjectsPage({ params: { programId } }: { params: { programId: string } }) {
  const { data } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
    options: {
      enabled: Boolean(programId),
    },
  });
  return (
    <>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"programs:list.header.title"} />,
            href: NEXT_ROUTER.programs.root,
          },
          {
            id: "details",
            label: data?.name,
            href: NEXT_ROUTER.programs.projects.root(programId),
          },
          {
            id: "projects",
            label: <Translate token={"programs:details.views.projects"} />,
          },
        ]}
      />
      <ProjectsTable programId={programId} />

      <ProjectSidepanel />
    </>
  );
}

export default withClientOnly(withAuthenticated(ProgramsProjectsPage));
