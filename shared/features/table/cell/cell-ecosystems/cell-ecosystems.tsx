import { CellAvatar } from "@/shared/features/table/cell/cell-avatar/cell-avatar";
import { CellEcosystemsProps } from "@/shared/features/table/cell/cell-ecosystems/cell-ecosystems.types";

export function CellEcosystems({ ecosystems, ...props }: CellEcosystemsProps) {
  return (
    <CellAvatar
      avatars={ecosystems.map(ecosystem => ({
        src: ecosystem.logoUrl,
        name: ecosystem.name,
      }))}
      quantity={3}
      {...props}
    />
  );
}
