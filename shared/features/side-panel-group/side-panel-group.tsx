"use client";

import { ForwardedRef, forwardRef, useImperativeHandle } from "react";

import { SidePanelGroupProvider, useSidePanelGroup } from "@/shared/features/side-panel-group/side-panel-group.context";

import { SidePanelGroupProps, SidePanelGroupRef } from "./side-panel-group.types";

export const SafeSidePanelGroup = forwardRef(function SafeSidePanelGroup(
  { children }: SidePanelGroupProps,
  ref: ForwardedRef<SidePanelGroupRef>
) {
  const { openPanel, closePanel } = useSidePanelGroup();

  useImperativeHandle(ref, () => {
    return {
      openPanel,
      closePanel,
    };
  }, [openPanel, closePanel]);

  return <div>{children}</div>;
});

export const SidePanelGroup = forwardRef(function SidePanelGroup(
  props: SidePanelGroupProps,
  ref: ForwardedRef<SidePanelGroupRef>
) {
  const { children, ...contextProps } = props;
  return (
    <SidePanelGroupProvider {...contextProps}>
      <SafeSidePanelGroup {...props} ref={ref}>
        {children}
      </SafeSidePanelGroup>
    </SidePanelGroupProvider>
  );
});
