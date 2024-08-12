"use client";

import { motion } from "framer-motion";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";

import { SidePanelGroupProvider, useSidePanelGroup } from "@/shared/features/side-panel-group/side-panel-group.context";
import { cn } from "@/shared/helpers/cn";

import { SidePanelGroupProps, SidePanelGroupRef } from "./side-panel-group.types";

export const SafeSidePanelGroup = forwardRef(function SafeSidePanelGroup(
  { children, className }: SidePanelGroupProps,
  ref: ForwardedRef<SidePanelGroupRef>
) {
  const { openPanel, closePanel, panelWidth, getOpendPanelIndex, onBack, onNext } = useSidePanelGroup();

  useImperativeHandle(ref, () => {
    return {
      openPanel,
      closePanel,
      onBack,
      onNext,
    };
  }, [openPanel, closePanel, onNext, onBack]);

  return (
    <div className={cn("h-full w-full overflow-hidden", className?.wrapper)}>
      <motion.div
        className={cn("flex h-full justify-start", className?.mover)}
        style={{ transform: "translateX(0)" }}
        animate={{ transform: `translateX(-${panelWidth * getOpendPanelIndex()}px)` }}
      >
        {children}
      </motion.div>
    </div>
  );
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
