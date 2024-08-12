import { ComponentProps } from "react";

import { AvatarPort } from "@/design-system/atoms/avatar";
import { Typo } from "@/design-system/atoms/typo";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface AvatarDescriptionPort extends Partial<Variants> {
  avatarProps: AvatarPort;
  labelProps: ComponentProps<typeof Typo>;
  descriptionProps?: ComponentProps<typeof Typo>;
  classNames?: Partial<ClassNames>;
}
