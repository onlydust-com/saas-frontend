"use client";

import { Circle, CircleCheck } from "lucide-react";
import { useMemo } from "react";

import { IconPort } from "@/design-system/atoms/icon";
import { Accordion, AccordionSinglePort } from "@/design-system/molecules/accordion";

import { cn } from "@/shared/helpers/cn";

import { AccordionFilterProps } from "./accordion-filter.types";

export function AccordionFilter({ selected, children, title, name, classNames }: AccordionFilterProps) {
  const icon: IconPort = useMemo(() => {
    if (selected) {
      return {
        component: CircleCheck,
      };
    }

    return {
      component: Circle,
    };
  }, [selected]);

  const badge: AccordionSinglePort["badgeProps"] = useMemo(() => {
    if (selected) {
      return {
        children: selected.toString(),
      };
    }

    return undefined;
  }, [selected]);

  return (
    <Accordion startIcon={icon} badgeProps={badge} titleProps={title} id={name}>
      <div className={cn("p-lg", classNames?.container)}>{children}</div>
    </Accordion>
  );
}
