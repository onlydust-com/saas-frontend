import { AnyType } from "@/core/kernel/types";

import { AvatarLabelGroupPort } from "@/design-system/molecules/avatar-label-group";

export interface CellAvatarProps extends AvatarLabelGroupPort<AnyType> {
  singleProps?: Omit<AvatarLabelGroupPort<AnyType>, "avatars">;
  multipleProps?: Omit<AvatarLabelGroupPort<AnyType>, "avatars">;
}
