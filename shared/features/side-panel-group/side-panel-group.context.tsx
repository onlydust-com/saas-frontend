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
});

export function SidePanelGroupProvider({
  children,
  defaultPanelName,
  defaultOpen,
  config,
}: SidePanelGroupContextProps) {
  const [openedPanels, setOpenedPanels] = useState<string[]>(defaultOpen ? [defaultPanelName] : []);

  function isPanelOpen(name: string) {
    return openedPanels.includes(name);
  }

  function openPanel(name?: string) {
    if (name) {
      setOpenedPanels(prev => [...prev, name]);
    } else {
      setOpenedPanels([defaultPanelName]);
    }
  }

  function closePanel(name?: string) {
    if (name) {
      setOpenedPanels(prev => prev.filter(panelName => panelName !== name));
    } else {
      setOpenedPanels([]);
    }
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
