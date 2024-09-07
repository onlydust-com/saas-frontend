import { ComponentPropsWithoutRef, ElementType } from "react";

import { AvatarPort } from "@/design-system/atoms/avatar";
import { TypoPort } from "@/design-system/atoms/typo";

interface Variants {
  size: AvatarPort["size"];
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
  title?: TypoPort<"span">;
  description?: TypoPort<"span">;
  quantity?: number;
  shape?: AvatarPort["shape"];
}
