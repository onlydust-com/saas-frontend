import { ProjectsTable } from "@/app/programs/[programId]/_views/projects/projects-table/projects-table";
import { ProjectsProps } from "@/app/programs/[programId]/_views/projects/projects.types";

export function Projects({ programId }: ProjectsProps) {
  return <ProjectsTable programId={programId} />;
}
