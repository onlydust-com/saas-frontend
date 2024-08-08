"use client";

import { motion, spring } from "framer-motion";

import { cn } from "@/shared/helpers/cn";

import { AnimatedColumnsGroupProps } from "./animated-columns-group.types";

export function AnimatedColumnsGroup({ children, className }: AnimatedColumnsGroupProps) {
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
