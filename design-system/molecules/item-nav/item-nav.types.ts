import { LucideIcon } from "lucide-react";
import { PropsWithChildren } from "react";

import { TypoPort } from "@/design-system/atoms/typo";

import { BaseLinkProps } from "@/shared/components/base-link/base-link.types";
import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

type _BaseLinkProps = Omit<BaseLinkProps, "children" | "style">;

interface ClassNames {
  base: string;
  label: string;
}

export interface ItemNavPort extends PropsWithChildren {
  linkProps?: _BaseLinkProps;
  classNames?: Partial<ClassNames>;
  labelProps?: Partial<TypoPort<"span">>;
  icon: LucideIcon;
  translate?: TranslateProps;
  isDisabled?: boolean;
  isFolded?: boolean;
  onClick?: () => void;
}
