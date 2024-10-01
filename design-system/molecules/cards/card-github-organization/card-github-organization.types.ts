import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { AnyType } from "@/core/kernel/types";

import { AvatarPort } from "@/design-system/atoms/avatar";
import { ButtonPort } from "@/design-system/atoms/button/button.types";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface CardGithubOrganizationPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  name?: ReactNode;
  avatar?: AvatarPort;
  action?: ButtonPort<AnyType>;
}
