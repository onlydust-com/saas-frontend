import { CellAvatar } from "@/shared/features/table/cell/cell-avatar/cell-avatar";
import { CellProjectsProps } from "@/shared/features/table/cell/cell-projects/cell-projects.types";

export function CellProjects({ projects, ...props }: CellProjectsProps) {
  return (
    <CellAvatar
      avatars={projects.map(project => ({
        src: project.logoUrl,
        name: project.name,
      }))}
      quantity={3}
      {...props}
    />
  );
}
