import { CellAvatar } from "@/shared/features/table/cell/cell-avatar/cell-avatar";

import { CellProjectsAvatarsProps } from "./cell-projects-avatars.types";

export function CellProjectsAvatars({ projects, ...props }: CellProjectsAvatarsProps) {
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
