"use client";

import { motion } from "framer-motion";

import { AnimatedColumnProps } from "./animated-column.types";

export function AnimatedColumn({ width, controlled, initialWidth, children, className, onClick }: AnimatedColumnProps) {
  if (!controlled) {
    return (
      <motion.div onClick={onClick} layout="position" className={className}>
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
