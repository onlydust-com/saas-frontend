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
  badgeProps?: BadgePort<"div">;
  startIcon?: IconPort;
}

export interface AccordionBasePort {
  classNames?: ClassNames;
  defaultSelected?: string[];
}

export interface AccordionMultiplePort extends AccordionBasePort {
  items: AccordionItemProps[];
  multiple?: boolean;
}

export interface AccordionSinglePort extends AccordionBasePort, Omit<AccordionItemProps, "content"> {
  classNames?: ClassNames;
  items?: never;
  children: ReactNode;
  multiple?: never;
}

export type AccordionPort = AccordionMultiplePort | AccordionSinglePort;
