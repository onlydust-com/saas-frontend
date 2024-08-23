import { LucideIcon, LucideProps } from "lucide-react";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { AvatarPort } from "@/design-system/atoms/avatar";
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
  avatarProps?: AvatarPort;
  titleProps?: TypoPort<"p">;
  icon?: LucideIcon;
  iconProps?: LucideProps;
  descriptionProps?: TypoPort<"p">;
  tags?: Array<TagPort<"div">>;
  endContent?: ReactNode;
  onClick?: () => void;
}
