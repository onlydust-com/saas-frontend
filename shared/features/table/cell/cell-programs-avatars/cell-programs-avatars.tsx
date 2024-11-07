import { CellBadge } from "@/shared/features/table/cell/cell-badge/cell-badge";

import { CellProgramsAvatarsProps } from "./cell-programs-avatars.types";

export function CellProgramsAvatars({ programs, ...props }: CellProgramsAvatarsProps) {
  return (
    <CellBadge
      items={programs.map(program => program.name)}
      popOverAvatars={programs.map(program => ({
        src: program.logoUrl,
        name: program.name,
      }))}
    />
  );
}
