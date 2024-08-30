import { ReactNode } from "react";

import { BadgePort } from "@/design-system/atoms/badge";
import { IconPort } from "@/design-system/atoms/icon";
import { TypoPort } from "@/design-system/atoms/typo";

type ClassNames = Partial<{
  base: string;
  heading: string;
  trigger: string;
  content: string;
  indicator: string;
  label: string;
  startIcon: string;
}>;

export interface AccordionItemProps {
  id: string;
  titleProps: Partial<TypoPort<"span">>;
  content: ReactNode;
  badge?: BadgePort<"div">;
  startIcon?: IconPort;
}

export interface AccordionPort {
  classNames?: ClassNames;
  items: AccordionItemProps[];
  multiple?: boolean;
  defaultSelected?: string[];
}
