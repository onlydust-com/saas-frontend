import { CellAvatar } from "@/shared/features/table/cell/cell-avatar/cell-avatar";

import { CellProgramsAvatarsProps } from "./cell-programs-avatars.types";

export function CellProgramsAvatars({ programs, ...props }: CellProgramsAvatarsProps) {
  return (
    <CellAvatar
      avatars={programs.map(program => ({
        src: program.logoUrl,
        name: program.name,
      }))}
      quantity={3}
      {...props}
    />
  );
}
