import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { AvatarPort } from "@/design-system/atoms/avatar";

interface Variants {
  size: "md" | "lg";
}

interface ClassNames {
  base: string;
}

interface AvatarItem extends Pick<AvatarPort, "src" | "alt" | "fallback"> {}

export interface AvatarLabelGroupPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  avatars: AvatarItem[];
  title?: ReactNode;
  description?: ReactNode;
}
