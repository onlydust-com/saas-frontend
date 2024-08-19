"use client";

import { motion } from "framer-motion";

import { cn } from "@/shared/helpers/cn";

import { AnimatedColumnProps } from "./animated-column.types";

export function AnimatedColumn({ width, autoWidth, initialWidth, children, className, onClick }: AnimatedColumnProps) {
  if (autoWidth) {
    return (
      <motion.div onClick={onClick} layout="position" className={cn("flex-1", className)}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div onClick={onClick} className={className} style={{ width: initialWidth }} animate={{ width }}>
      {children}
    </motion.div>
  );
}
