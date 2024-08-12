"use client";

import { useSidePanelGroup } from "@/shared/features/side-panel-group/side-panel-group.context";

import { SidePanelProps } from "./side-panel.types";

export function SidePanel({ children, name }: SidePanelProps) {
  const context = useSidePanelGroup();
  console.log("NAME", name);
  return <div>{children}</div>;
}
