import { cn } from "@/shared/helpers/cn";

import { IconPort } from "../../icon.types";
import { IconLucideVariants } from "./lucide.variants";

export function IconLucideAdapter({ component: Icon, classNames, size = 16, strokeWidth = 2 }: IconPort) {
  const { base } = IconLucideVariants();

  return <Icon size={size} strokeWidth={strokeWidth} className={cn(base(), classNames?.base)} />;
}
