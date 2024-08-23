"use client";

import { Slash } from "lucide-react";
import { ComponentProps, Fragment } from "react";

import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { cn } from "@/shared/helpers/cn";

import { BreadcrumbItemPort, BreadcrumbsPort } from "../../breadcrumbs.types";
import { BreadcrumbsDefaultVariants } from "./default.variants";

function BreadcrumbItem({ label, href, onClick, selected = false, iconProps, iconOnly }: BreadcrumbItemPort) {
  const canHover = !selected;
  const showIconOnly = iconProps && iconOnly;
  const typoProps: Partial<ComponentProps<typeof Typo>> = {};

  if (href) {
    typoProps.as = BaseLink;
    typoProps.htmlProps = { href };
    typoProps.canHover = canHover;
  }

  if (onClick) {
    typoProps.as = "button";
    typoProps.htmlProps = { type: "button", onClick };
    typoProps.canHover = canHover;
  }

  return (
    <Typo
      {...typoProps}
      size={"xs"}
      color={selected ? "primary" : "tertiary"}
      classNames={{
        base: cn("py-1 px-2 rounded-md flex items-center gap-2", {
          "hover:bg-background-primary-alt-hover focus:effect-ring-brand-spaced outline-none": canHover,
          "pl-1.5": iconProps,
          "p-1": showIconOnly,
        }),
      }}
    >
      {iconProps ? <Icon {...iconProps} /> : null}
      {showIconOnly ? null : label}
    </Typo>
  );
}

function Breadcrumbs({ items }: { items: BreadcrumbItemPort[] }) {
  return items.map((item, index) => {
    if (index === items.length - 1) {
      return <BreadcrumbItem key={item.id} {...item} selected />;
    }

    return (
      <Fragment key={item.id}>
        <BreadcrumbItem {...item} />
        <Icon component={Slash} classNames={{ base: "scale-x-50 text-foreground-quinary" }} />
      </Fragment>
    );
  });
}

export function BreadcrumbsDefaultAdapter({ items, classNames }: BreadcrumbsPort) {
  const slots = BreadcrumbsDefaultVariants();

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      <Breadcrumbs items={items} />
    </div>
  );
}
