import { CellBadge } from "@/shared/features/table/cell/cell-badge/cell-badge";
import { CellProgramsProps } from "@/shared/features/table/cell/cell-programs/cell-programs.types";

export function CellPrograms({ programs }: CellProgramsProps) {
  return (
    <CellBadge
      items={programs.map(program => ({
        content: program.name,
      }))}
    />
  );
}
