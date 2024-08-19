"use client";

import { useState } from "react";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";

export function TestSidePanel() {
  const [panelSize, setPanelSIze] = useState(200);
  function onSizeChange() {
    if (panelSize === 200) {
      setPanelSIze(400);
    } else if (panelSize === 400) {
      setPanelSIze(100);
    } else {
      setPanelSIze(200);
    }
  }
  return (
    <AnimatedColumn width={panelSize} initialWidth={200} className="h-full bg-container-4" onClick={onSizeChange}>
      SIDE PANEL
    </AnimatedColumn>
  );
}
