"use client";

import { Paper } from "@/design-system/atoms/paper";

import { useSidePanelGroup } from "@/shared/features/side-panel-group/side-panel-group.context";
import { cn } from "@/shared/helpers/cn";

import { SidePanelProps } from "./side-panel.types";

export function SidePanel({ children, name, classNames }: SidePanelProps) {
  const { panelWidth, openPanel, closePanel, onBack, onNext } = useSidePanelGroup();

  const renderChildren =
    typeof children === "function"
      ? children({ name, onClose: () => closePanel(name), onOpen: openPanel, onBack, onNext })
      : children;

  return (
    <div className={cn("h-full", classNames?.container)} style={{ minWidth: panelWidth, width: panelWidth }}>
      <Paper
        size={"s"}
        border={"none"}
        classNames={{ base: cn("h-full w-full flex flex-col gap-3", classNames?.content) }}
        container={"2"}
      >
        {renderChildren}
      </Paper>
    </div>
  );
}
