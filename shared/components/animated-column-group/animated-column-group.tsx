"use client";

import { AnimatedColumnGroupProvider } from "@/shared/components/animated-column-group/animated-column-group.context";

import { AnimatedColumnGroupProps } from "./animated-column-group.types";

export function AnimatedColumnGroup({ children, className }: AnimatedColumnGroupProps) {
  return <AnimatedColumnGroupProvider className={className}>{children}</AnimatedColumnGroupProvider>;
}
