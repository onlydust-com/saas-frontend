import { CellAvatar } from "@/shared/features/table/cell/cell-avatar/cell-avatar";

import { CellEcosystemsAvatarsProps } from "./cell-ecosystems-avatars.types";

export function CellEcosystemsAvatars({ ecosystems, ...props }: CellEcosystemsAvatarsProps) {
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
