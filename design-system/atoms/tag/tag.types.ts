import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";

import { AvatarPort } from "@/design-system/atoms/avatar";
import { IconPort } from "@/design-system/atoms/icon";
import { TypoPort } from "@/design-system/atoms/typo";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

interface Variants {
  size: "xs" | "s" | "m";
  shape: "round" | "square";
  hideText: boolean;
  style: "fill" | "outline";
  isDeletable: boolean;
  color: "black" | "white" | "red" | "pink" | "grey" | "green" | "yellow" | "orange" | "purple" | "blue";
}

interface ClassNames {
  base: string;
  content: string;
  label: string;
  deletableIcon: string;
  dropDownIcon: string;
}

export interface TagBasePort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  translate?: TranslateProps;
  startContent?: ReactNode;
  endContent?: ReactNode;
  labelProps?: Partial<TypoPort<"span">>;
  deletableIconProps?: Partial<IconPort>;
  clickable?: boolean;
  hasDropdown?: boolean;
}

export interface TagIconPort<C extends ElementType> extends TagBasePort<C> {
  icon: IconPort;
}

export interface TagAvatarPort<C extends ElementType> extends TagBasePort<C> {
  avatar: AvatarPort;
}

export type TagPort<C extends ElementType> = TagBasePort<C> | TagIconPort<C> | TagAvatarPort<C>;
