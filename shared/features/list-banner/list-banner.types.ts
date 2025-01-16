import { ReactNode } from "react";

import { TypoPort } from "@/design-system/atoms/typo";

export type ListBannerProps = {
  title: TypoPort<"h1">;
  subtitle: TypoPort<"p">;
  logo?: ReactNode;
};
