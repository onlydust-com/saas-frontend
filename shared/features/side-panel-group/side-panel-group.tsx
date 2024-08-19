"use client";

import { motion } from "framer-motion";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";

import { SidePanelGroupProvider, useSidePanelGroup } from "@/shared/features/side-panel-group/side-panel-group.context";
import { cn } from "@/shared/helpers/cn";

import { SidePanelGroupProps, SidePanelGroupRef } from "./side-panel-group.types";

export const SafeSidePanelGroup = forwardRef(function SafeSidePanelGroup(
  { children, classNames }: SidePanelGroupProps,
  ref: ForwardedRef<SidePanelGroupRef>
) {
  const {
    openPanel,
    closePanel,
    getPanelData,
    panelWidth,
    isPanelOpen,
    getOpenedPanelIndex,
    onBack,
    onNext,
    panelGap,
    watch,
  } = useSidePanelGroup();

  useImperativeHandle(ref, () => {
    return {
      openPanel,
      closePanel,
      onBack,
      onNext,
      isPanelOpen,
      getPanelData,
      watch,
    };
  }, [openPanel, closePanel, onNext, onBack, isPanelOpen, getPanelData, watch]);

  const translationGap = getOpenedPanelIndex() ? panelGap || 0 : 0;

  return (
    <div
      className={cn("h-full w-full overflow-hidden", classNames?.wrapper)}
      style={{
        paddingLeft: panelGap || 0,
      }}
    >
      <motion.div
        className={cn("flex h-full justify-start", classNames?.mover)}
        style={{ transform: "translateX(0)", gap: `${panelGap || 0}px` }}
        animate={{ transform: `translateX(-${panelWidth * getOpenedPanelIndex() + translationGap}px)` }}
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
