import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { BreadcrumbsPort } from "@/design-system/atoms/breadcrumbs";

interface Variants {}

interface ClassNames {
  base: string;
  breadcrumbs: BreadcrumbsPort["classNames"];
  title: string;
}

export interface PageHeaderPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  title?: ReactNode;
  breadcrumbs?: BreadcrumbsPort["items"];
  endContent?: ReactNode;
  startContent?: ReactNode;
}
