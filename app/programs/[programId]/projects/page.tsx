"use client";

import { ProjectsTable } from "@/app/programs/[programId]/projects/_features/projects-table/projects-table";

export default function ProgramsProjectsPage({ params: { programId } }: { params: { programId: string } }) {
  return <ProjectsTable programId={programId} />;
}
