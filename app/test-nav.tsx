"use client";

import { useState } from "react";

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
    // <AnimatedColumn>
    <div
      className="h-screen bg-red-900"
      style={{
        width: navSize,
      }}
      onClick={onNavSizeChange}
    >
      NAV
    </div>
    // </AnimatedColumn>
  );
}
