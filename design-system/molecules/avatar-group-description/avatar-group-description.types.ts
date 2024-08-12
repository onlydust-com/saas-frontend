import { ComponentProps, ElementType } from "react";

import { Typo } from "@/design-system/atoms/typo";
import { AvatarGroupPort } from "@/design-system/molecules/avatar-group";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface AvatarGroupDescriptionPort<C extends ElementType> extends Partial<Variants> {
  avatarGroupProps: AvatarGroupPort<C>;
  labelProps: ComponentProps<typeof Typo>;
  descriptionProps?: ComponentProps<typeof Typo>;
  classNames?: Partial<ClassNames>;
}
