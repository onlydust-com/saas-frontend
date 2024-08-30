import { ComponentPropsWithoutRef, ElementType } from "react";

import { AvatarPort } from "@/design-system/atoms/avatar";

interface Variants {
  size: "xs" | "sm" | "md";
  outsideBorder?: boolean;
}

interface ClassNames {
  base: string;
}

interface AvatarItem extends Pick<AvatarPort, "src" | "alt" | "fallback"> {}

export interface AvatarGroupPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  avatars: AvatarItem[];
  quantity?: number;
  totalAvatarsCount?: number;
  shape?: AvatarPort["shape"];
}
