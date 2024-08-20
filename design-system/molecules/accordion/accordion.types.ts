import { Selection } from "@nextui-org/react";
import { ReactNode } from "react";

import { BadgePort } from "@/design-system/atoms/badge";
import { TypoPort } from "@/design-system/atoms/typo";

type ClassNames = Partial<{
  base: string;
  heading: string;
  trigger: string;
  content: string;
}>;

export interface AccordionItemProps {
  id: string;
  titleProps: Partial<TypoPort<"span">>;
  content: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

export interface AccordionItemWithBadgeProps extends Omit<AccordionItemProps, "endContent"> {
  badgeProps?: BadgePort<"div">;
}

export interface AccordionPort {
  classNames?: ClassNames;
  items: AccordionItemProps[];
  multiple?: boolean;
  defaultSelected?: string[];
  onSelectionChange?: (selectedKeys: Selection) => void;
}

export interface AccordionWithBadgePort extends Omit<AccordionPort, "items"> {
  items: AccordionItemWithBadgeProps[];
}
