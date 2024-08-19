"use client";

import { useState } from "react";

import { AnimatedColumnGroup } from "@/shared/components/animated-column-group/animated-column-group";
import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";

export default function TestPage() {
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
    <div className={"flex h-full w-full flex-col gap-3 overflow-hidden"}>
      <AnimatedColumnGroup>
        <AnimatedColumn className="h-full flex-1 overflow-auto bg-container-2">
          <div className={"h-[5000px] bg-pink-900"}></div>
        </AnimatedColumn>
        <AnimatedColumn width={panelSize} initialWidth={200} className="h-full bg-green-900" onClick={onSizeChange}>
          SIDE PANEL
        </AnimatedColumn>
      </AnimatedColumnGroup>
    </div>
  );
}
