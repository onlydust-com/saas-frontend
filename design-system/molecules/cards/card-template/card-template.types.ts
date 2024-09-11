import { ElementType, ReactNode } from "react";

import { AvatarPort } from "@/design-system/atoms/avatar";
import { PaperPort } from "@/design-system/atoms/paper";
import { TypoPort } from "@/design-system/atoms/typo";

interface Variants {}

export interface CardTemplatePort<C extends ElementType> extends Partial<Variants>, PaperPort<C> {
  avatarProps?: AvatarPort;
  titleProps: TypoPort<"span">;
  descriptionProps?: TypoPort<"span">;
  actionSlot?: ReactNode;
  contentSlot?: ReactNode;
}
