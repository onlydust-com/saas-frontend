import { IconPort } from "@/design-system/atoms/icon";
import { TypoPort } from "@/design-system/atoms/typo";

import { BaseLinkProps } from "@/shared/components/base-link/base-link.types";

type _BaseLinkProps = Omit<BaseLinkProps, "children" | "style">;

interface Variants {
  isDisabled: boolean;
  isFolded: boolean;
}

interface ClassNames {
  base: string;
}

export interface ItemNavPort extends _BaseLinkProps, Partial<Variants> {
  classNames?: Partial<ClassNames>;
  labelProps?: Partial<TypoPort<"span">>;
  icon: IconPort;
}
