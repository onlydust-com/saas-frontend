"use client";

import { useState } from "react";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";

export function TestNav() {
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
    <AnimatedColumn
      controlled={true}
      width={navSize}
      initialWidth={200}
      className="h-full bg-green-900"
      onClick={onNavSizeChange}
    >
      NAV
    </AnimatedColumn>
  );
}
