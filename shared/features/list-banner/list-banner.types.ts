import { ReactNode } from "react";

import { AnyType } from "@/core/kernel/types";

import { TypoPort } from "@/design-system/atoms/typo";

export type ListBannerProps = {
  title: TypoPort<AnyType>;
  subtitle: TypoPort<AnyType>;
  logo?: ReactNode;
};
