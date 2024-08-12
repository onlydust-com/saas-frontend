import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { AvatarPort } from "@/design-system/atoms/avatar";
import { IconPort } from "@/design-system/atoms/icon";
import { TagPort } from "@/design-system/atoms/tag";
import { TypoPort } from "@/design-system/atoms/typo";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface CardTemplatePort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  avatarProps?: Partial<AvatarPort>;
  titleProps?: Partial<TypoPort<"p">>;
  iconProps?: IconPort;
  descriptionProps?: Partial<TypoPort<"p">>;
  tags?: Array<TagPort<"div">>;
  endContent?: ReactNode;
}
