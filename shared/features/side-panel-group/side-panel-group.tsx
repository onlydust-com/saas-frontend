"use client";

import { SidePanelGroupProvider } from "@/shared/features/side-panel-group/side-panel-group.context";

import { SidePanelGroupProps } from "./side-panel-group.types";

function SafeSidePanelGroup({ children, defaultPanelName }: SidePanelGroupProps) {
  console.log("DEFAULT KEY", defaultPanelName);
  return <div>{children}</div>;
}

export function SidePanelGroup(props: SidePanelGroupProps) {
  const { children, ...contextProps } = props;
  return (
    <SidePanelGroupProvider {...contextProps}>
      <SafeSidePanelGroup {...props}>{children}</SafeSidePanelGroup>
    </SidePanelGroupProvider>
  );
}
