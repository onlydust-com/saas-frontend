import { AnyType } from "@/core/kernel/types";

import { AvatarLabelGroupPort } from "@/design-system/molecules/avatar-label-group";

export interface CellAvatarProps extends AvatarLabelGroupPort<AnyType> {
  singleProps?: AvatarLabelGroupPort<AnyType>;
  multipleProps?: AvatarLabelGroupPort<AnyType>;
}
