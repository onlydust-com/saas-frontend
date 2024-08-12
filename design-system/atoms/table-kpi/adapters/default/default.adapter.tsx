import { Icon, IconPort } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { TableKpiPort } from "../../table-kpi.types";
import { TableKpiDefaultVariants } from "./default.variants";

export function TableKpiDefaultAdapter({ classNames, state, children }: TableKpiPort) {
  const slots = TableKpiDefaultVariants({ state });

  let iconName: IconPort["name"] | null = null;

  if (state === "positive") {
    iconName = "ri-arrow-up-line";
  }

  if (state === "negative") {
    iconName = "ri-arrow-down-line";
  }

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      <Typo size={"s"} weight={"medium"} color={"text-2"}>
        {children}
      </Typo>
      {iconName ? <Icon name={iconName} className={cn(slots.icon())} /> : null}
    </div>
  );
}
