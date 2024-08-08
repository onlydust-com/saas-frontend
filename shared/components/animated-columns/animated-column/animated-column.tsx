"use client";

import { motion, spring } from "framer-motion";

import { TAnimatedColumn } from "./animated-column.types";

export function AnimatedColumn({ children }: TAnimatedColumn.Props) {
  return (
    <motion.div layout className="origin-top" transition={spring}>
      {children}
    </motion.div>
  );
}
