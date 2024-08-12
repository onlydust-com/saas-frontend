"use client";

import { useSidePanelGroup } from "@/shared/features/side-panel-group/side-panel-group.context";
import { cn } from "@/shared/helpers/cn";

import { SidePanelProps } from "./side-panel.types";

export function SidePanel({ children, name, className }: SidePanelProps) {
  const { panelWidth, openPanel, closePanel, onBack, onNext } = useSidePanelGroup();

  const renderChildren =
    typeof children === "function"
      ? children({ name, onClose: () => closePanel(name), onOpen: openPanel, onBack, onNext })
      : children;

  return (
    <div className={cn("h-full", className)} style={{ minWidth: panelWidth, width: panelWidth }}>
      {renderChildren}
    </div>
  );
}
