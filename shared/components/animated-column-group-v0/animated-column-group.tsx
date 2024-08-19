"use client";

import { motion, spring } from "framer-motion";

import { cn } from "@/shared/helpers/cn";

import { AnimatedColumnGroupProps } from "./animated-column-group.types";

export function AnimatedColumnGroup({ children, className }: AnimatedColumnGroupProps) {
  return (
    <motion.div
      layout="position"
      layoutRoot={true}
      className={cn("flex h-full flex-row items-start justify-start", className)}
      transition={spring}
    >
      {children}
    </motion.div>
  );
}
