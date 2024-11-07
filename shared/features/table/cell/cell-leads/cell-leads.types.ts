import { CellAvatarProps } from "@/shared/features/table/cell/cell-avatar/cell-avatar.types";

export interface CellLeadsProps extends Omit<CellAvatarProps, "avatars"> {
  leads: {
    login: string;
    avatarUrl?: string;
  }[];
}
