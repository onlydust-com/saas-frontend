import { ElementType } from "react";

import { Breadcrumbs } from "@/design-system/atoms/breadcrumbs";

import { cn } from "@/shared/helpers/cn";

import { PageHeaderPort } from "../../page-header.types";
import { PageHeaderDefaultVariants } from "./default.variants";

export function PageHeaderDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  breadcrumbs,
  endContent,
  startContent,
}: PageHeaderPort<C>) {
  const Component = as || "div";
  const slots = PageHeaderDefaultVariants();

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      <div className={"flex flex-row items-start justify-start gap-2"}>
        {startContent}
        <Breadcrumbs items={breadcrumbs} classNames={classNames?.breadcrumbs} />
      </div>
      {endContent ? <div>{endContent}</div> : null}
    </Component>
  );
}
