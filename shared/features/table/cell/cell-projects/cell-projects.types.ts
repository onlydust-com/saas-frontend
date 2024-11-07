import { CellAvatarProps } from "@/shared/features/table/cell/cell-avatar/cell-avatar.types";

export interface CellProjectsProps extends Omit<CellAvatarProps, "avatars"> {
  projects: {
    name: string;
    logoUrl?: string;
  }[];
}
