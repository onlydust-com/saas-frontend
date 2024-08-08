"use client";

import { motion, spring } from "framer-motion";

import { TAnimatedColumns } from "./animated-columns.types";

export function AnimatedColumns({ children }: TAnimatedColumns.Props) {
  return (
    <motion.div layout layoutRoot className="flex h-full flex-row items-stretch justify-start" transition={spring}>
      {children}
    </motion.div>
  );
}
