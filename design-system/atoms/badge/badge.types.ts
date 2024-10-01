import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";

import { AnyType } from "@/core/kernel/types";

import { AvatarPort } from "@/design-system/atoms/avatar";
import { BadgeClosePort } from "@/design-system/atoms/badge-close/badge-close.types";
import { IconPort } from "@/design-system/atoms/icon";
import { TypoPort } from "@/design-system/atoms/typo";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

interface Variants {
  size: "xxs" | "xs" | "sm" | "md";
  color: "grey" | "brand" | "error" | "warning" | "success";
  shape: "rounded" | "squared";
  isDeletable: boolean;
}

interface ClassNames {
  base: string;
  content: string;
  label: string;
  deletableIcon: string;
}

export interface BadgeBasePort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  translate?: TranslateProps;
  startContent?: ReactNode;
  endContent?: ReactNode;
  labelProps?: Partial<TypoPort<"span">>;
  closeProps?: Partial<BadgeClosePort<AnyType>>;
}

export interface BadgeIconPort<C extends ElementType> extends BadgeBasePort<C> {
  icon: IconPort;
}

export interface BadgeAvatarPort<C extends ElementType> extends BadgeBasePort<C> {
  avatar: AvatarPort;
}

export type BadgePort<C extends ElementType> = BadgeBasePort<C> | BadgeIconPort<C> | BadgeAvatarPort<C>;
