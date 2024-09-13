import { PropsWithChildren } from "react";

import { IconPort } from "@/design-system/atoms/icon";
import { TabItemPort } from "@/design-system/molecules/tabs/tab-item";

import { BaseLinkProps } from "@/shared/components/base-link/base-link.types";
import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

type _BaseLinkProps = Omit<BaseLinkProps, "children" | "style">;

interface ClassNames {
  base: string;
  label: string;
  item: TabItemPort<"button">["classNames"];
}

export interface ItemNavPort extends PropsWithChildren {
  linkProps?: _BaseLinkProps;
  classNames?: Partial<ClassNames>;
  iconProps: IconPort;
  translate?: TranslateProps;
  isDisabled?: boolean;
  isFolded?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  isComingSoon?: boolean;
}
