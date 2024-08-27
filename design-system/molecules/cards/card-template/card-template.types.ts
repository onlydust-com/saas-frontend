import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { AvatarPort } from "@/design-system/atoms/avatar";
import { BadgePort } from "@/design-system/atoms/badge";
import { IconPort } from "@/design-system/atoms/icon";
import { TypoPort } from "@/design-system/atoms/typo";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface CardTemplatePort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  avatarProps?: AvatarPort;
  titleProps?: TypoPort<"p">;
  iconProps?: IconPort;
  descriptionProps?: TypoPort<"p">;
  tags?: Array<BadgePort<"div">>;
  endContent?: ReactNode;
  onClick?: () => void;
}
