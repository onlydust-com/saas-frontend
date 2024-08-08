import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { AvatarPort } from "@/design-system/atoms/avatar";
import { ButtonPort } from "@/design-system/atoms/button/button.types";
import { TypoPort } from "@/design-system/atoms/typo";

interface Variants {
  container:
    | "brand-1"
    | "brand-2"
    | "brand-3"
    | "brand-4"
    | "container-1"
    | "container-2"
    | "container-3"
    | "container-4"
    | "danger";
  size: "m";
  layout: "horizontal" | "vertical";
}

interface ClassNames {
  base: string;
  endContainer: string;
}

export interface HelperPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  avatar?: AvatarPort;
  title?: TypoPort<"span">;
  text?: TypoPort<"span">;
  startButton?: ButtonPort<"button">;
  endButton?: ButtonPort<"button">;
  endContent?: ReactNode;
  startContent?: ReactNode;
}
