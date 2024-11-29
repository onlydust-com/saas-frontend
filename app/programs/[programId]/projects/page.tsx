"use client";

import { ProjectsTable } from "@/app/programs/[programId]/projects/_features/projects-table/projects-table";

import { ProjectSidepanel } from "@/shared/panels/project-sidepanel/project-sidepanel";

export default function ProgramsProjectsPage({ params: { programId } }: { params: { programId: string } }) {
  return (
    <>
      <ProjectsTable programId={programId} />

      <ProjectSidepanel />
    </>
  );
}
