"use client";

import { createContext, useContext, useMemo, useState } from "react";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import {
  SidePanelGroupContextInterface,
  SidePanelGroupContextProps,
} from "@/shared/features/side-panel-group/side-panel-group.types";

export const SidePanelGroupContext = createContext<SidePanelGroupContextInterface>({
  isPanelOpen: () => false,
  openPanel: () => {},
  closePanel: () => {},
  getOpenedPanelIndex: () => 0,
  panelWidth: 0,
  onBack: () => {},
  onNext: () => {},
});

export function SidePanelGroupProvider({
  children,
  defaultPanelName,
  defaultOpen,
  config,
  panels,
}: SidePanelGroupContextProps) {
  const [openedPanels, setOpenedPanels] = useState<string[]>(defaultOpen ? [defaultPanelName] : []);

  function isPanelOpen(name: string) {
    return openedPanels.includes(name);
  }

  function openPanel(name?: string) {
    if (name) {
      setOpenedPanels(panels?.slice(0, panels.indexOf(name) + 1));
    } else {
      setOpenedPanels([defaultPanelName]);
    }
  }

  function closePanel(name?: string) {
    if (name) {
      setOpenedPanels(panels?.slice(0, panels.indexOf(name)));
    } else {
      setOpenedPanels([]);
    }
  }

  function getOpenedPanelIndex() {
    return (openedPanels?.length || 0) - 1;
  }

  function onBack() {
    if (openedPanels.length === 1) {
      return;
    }
    setOpenedPanels(prev => prev.slice(0, prev.length - 1));
  }

  function onNext() {
    if (openedPanels.length > panels.length - 1) {
      return;
    }
    setOpenedPanels(prev => [...prev, panels[panels.indexOf(prev[prev.length - 1]) + 1]]);
  }

  const panelSize = useMemo(() => {
    if (openedPanels.length === 0) {
      return config.closedWidth;
    }

    return config.openedWidth;
  }, [openedPanels, config]);

  return (
    <SidePanelGroupContext.Provider
      value={{
        isPanelOpen,
        openPanel,
        closePanel,
        getOpenedPanelIndex,
        onBack,
        onNext,
        panelWidth: config.openedWidth,
      }}
    >
      <AnimatedColumn autoWidth={false} width={panelSize} initialWidth={config.closedWidth} className="h-full">
        {children}
      </AnimatedColumn>
    </SidePanelGroupContext.Provider>
  );
}

export function useSidePanelGroup() {
  const context = useContext(SidePanelGroupContext);
  if (!context) {
    throw new Error("SidePanel must be used inside a SidePanelGroup");
  }
  return context;
}
