import { ElementType } from "react";

import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { ChartLegendPort } from "../../chart-legend.types";
import { ChartLegendDefaultVariants } from "./default.variants";

export function ChartLegendDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  children,
  ...props
}: ChartLegendPort<C>) {
  const Component = as || "div";
  const { size, colors } = props;
  const slots = ChartLegendDefaultVariants({ size, colors });

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      <div className={cn(slots.square(), classNames?.square)}></div>

      <Typo as={"div"} size={"xs"} classNames={{ base: cn(slots.label(), classNames?.label) }}>
        {children}
      </Typo>
    </Component>
  );
}
