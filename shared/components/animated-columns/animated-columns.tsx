"use client";

import { motion, spring } from "framer-motion";
import { useState } from "react";

import { AnimatedColumn } from "@/shared/components/animated-columns/animated-column/animated-column";

import { TAnimatedColumns } from "./animated-columns.types";

export function AnimatedColumns({ children }: TAnimatedColumns.Props) {
  const [navSize, setNavSize] = useState(200);
  function onNavSizeChange() {
    if (navSize === 200) {
      setNavSize(400);
    } else if (navSize === 400) {
      setNavSize(100);
    } else {
      setNavSize(200);
    }
  }

  return (
    <motion.div
      layout="position"
      layoutRoot={true}
      className="flex h-full flex-row items-stretch justify-start"
      transition={spring}
    >
      <AnimatedColumn
        controlled={true}
        width={navSize}
        initialWidth={200}
        className="h-screen bg-green-900"
        onClick={onNavSizeChange}
      >
        <div>NAV</div>
      </AnimatedColumn>
      <AnimatedColumn controlled={false} className="h-screen w-full bg-blue-900">
        <div>content</div>
      </AnimatedColumn>
    </motion.div>
  );
}
