import { CellAvatarProps } from "@/shared/features/table/cell/cell-avatar/cell-avatar.types";

export interface CellLanguagesAvatarsProps extends Omit<CellAvatarProps, "avatars"> {
  languages: {
    name: string;
    logoUrl?: string;
  }[];
}
