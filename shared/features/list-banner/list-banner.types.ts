import { PropsWithChildren, ReactNode } from "react";

import { TypoPort } from "@/design-system/atoms/typo";

export interface ListBannerProps extends PropsWithChildren {
  title: TypoPort<"h1">;
  subtitle: TypoPort<"p">;
  logo?: ReactNode;
  classNames?: {
    base?: string;
  };
}
