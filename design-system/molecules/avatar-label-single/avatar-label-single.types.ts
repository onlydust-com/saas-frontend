import { ComponentPropsWithoutRef, ElementType } from "react";

import { AvatarPort } from "@/design-system/atoms/avatar";
import { TypoPort } from "@/design-system/atoms/typo";

interface Variants {
  size: AvatarPort["size"];
}

interface ClassNames {
  base: string;
}

export interface AvatarLabelSinglePort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  avatar: Pick<AvatarPort, "src" | "alt" | "fallback" | "name">;
  title?: TypoPort<"span">;
  description?: TypoPort<"span">;
  shape?: AvatarPort["shape"];
  truncate?: boolean;
}
