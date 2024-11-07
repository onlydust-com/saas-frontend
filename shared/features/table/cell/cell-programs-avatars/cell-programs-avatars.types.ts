import { CellAvatarProps } from "@/shared/features/table/cell/cell-avatar/cell-avatar.types";

export interface CellProgramsAvatarsProps extends Omit<CellAvatarProps, "avatars"> {
  programs: {
    name: string;
    logoUrl?: string;
  }[];
}
