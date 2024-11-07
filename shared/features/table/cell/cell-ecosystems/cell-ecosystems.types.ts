import { CellAvatarProps } from "@/shared/features/table/cell/cell-avatar/cell-avatar.types";

export interface CellEcosystemsProps extends Omit<CellAvatarProps, "avatars"> {
  ecosystems: {
    name: string;
    logoUrl?: string;
  }[];
}
