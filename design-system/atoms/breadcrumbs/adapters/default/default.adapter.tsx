"use client";

import { ChevronRight } from "lucide-react";
import { Fragment } from "react";

import { Typo } from "@/design-system/atoms/typo";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { cn } from "@/shared/helpers/cn";

import { BreadcrumbsPort, Item } from "../../breadcrumbs.types";
import { BreadcrumbsDefaultVariants } from "./default.variants";

function Segment({ label, href, onClick, className }: Item) {
  const styles = cn("text-inherit hover:underline", className);

  if (href) {
    return (
      <BaseLink href={href} className={styles}>
        {label}
      </BaseLink>
    );
  }

  if (onClick) {
    return (
      <button type={"button"} onClick={onClick} className={styles}>
        {label}
      </button>
    );
  }

  return <span className={styles}>{label}</span>;
}

function Breadcrumbs({ items }: { items: Item[] }) {
  return items.map((item, index) => {
    if (index === items.length - 1) {
      return <Segment key={item.id} {...item} className={"text-text-1 hover:no-underline"} />;
    }

    return (
      <Fragment key={item.id}>
        <Segment {...item} />
        <ChevronRight size={16} />
      </Fragment>
    );
  });
}

export function BreadcrumbsDefaultAdapter({ classNames, items }: BreadcrumbsPort) {
  const slots = BreadcrumbsDefaultVariants();

  return (
    <Typo as={"div"} size={"m"} color={"text-2"} classNames={{ base: cn(slots.base(), classNames?.base) }}>
      <Breadcrumbs items={items} />
    </Typo>
  );
}
