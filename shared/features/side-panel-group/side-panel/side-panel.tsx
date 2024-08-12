"use client";

import { useSidePanelGroup } from "@/shared/features/side-panel-group/side-panel-group.context";

import { SidePanelProps } from "./side-panel.types";

export function SidePanel({ children, name }: SidePanelProps) {
  const { panelWidth } = useSidePanelGroup();

  const renderChildren = typeof children === "function" ? children({ name }) : children;

  return (
    <div className="h-full bg-red-500" style={{ minWidth: panelWidth, width: panelWidth }}>
      {renderChildren}
    </div>
  );
}
