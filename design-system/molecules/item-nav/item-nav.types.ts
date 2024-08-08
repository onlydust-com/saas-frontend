import { PropsWithChildren } from "react";

import { IconPort } from "@/design-system/atoms/icon";
import { TypoPort } from "@/design-system/atoms/typo";

import { BaseLinkProps } from "@/shared/components/base-link/base-link.types";
import { TranlateProps } from "@/shared/translation/components/translate/translate";

type _BaseLinkProps = Omit<BaseLinkProps, "children" | "style">;

interface ClassNames {
  base: string;
  label: string;
}

export interface ItemNavPort extends _BaseLinkProps, PropsWithChildren {
  classNames?: Partial<ClassNames>;
  labelProps?: Partial<TypoPort<"span">>;
  icon: IconPort;
  translate?: TranlateProps;
  isDisabled: boolean;
  isFolded: boolean;
}
