"use client";

import { AnyType } from "ast-types";
import { createContext, useContext, useMemo, useState } from "react";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import {
  SidePanelGroupContextInterface,
  SidePanelGroupContextProps,
  openPanelParams,
} from "@/shared/features/side-panel-group/side-panel-group.types";

function mockGetPannelData<T>() {
  return {} as T;
}

export const SidePanelGroupContext = createContext<SidePanelGroupContextInterface>({
  isPanelOpen: () => false,
  openPanel: () => {},
  closePanel: () => {},
  getOpenedPanelIndex: () => 0,
  getPanelData: mockGetPannelData,
  watch: () => ({ isOpen: false }),
  panelWidth: 0,
  panelGap: 0,
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
  const [panelsData, setPanelsData] = useState<Record<string, AnyType>>({});

  function isPanelOpen(name?: string) {
    if (!name) {
      return openedPanels.length > 0;
    }

    return openedPanels.includes(name);
  }

  function openPanel<T>(p?: openPanelParams<T>) {
    if (p?.name) {
      setOpenedPanels(panels?.slice(0, panels.indexOf(p.name) + 1));
    } else {
      setOpenedPanels([defaultPanelName]);
    }

    if (p?.data) {
      setPanelsData(prev => ({ ...prev, [p.name || defaultPanelName]: p.data as AnyType }));
    }
  }

  function getPanelData<T>(name?: string) {
    return panelsData[name || defaultPanelName] as T;
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
      setOpenedPanels([]);
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

    return config.openedWidth + (config.gap || 0);
  }, [openedPanels, config]);

  function useWatch<T>(name: string) {
    return useMemo(() => {
      return {
        isOpen: isPanelOpen(name),
        data: getPanelData<T>(name),
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openedPanels, panelsData]);
  }

  return (
    <SidePanelGroupContext.Provider
      value={{
        isPanelOpen,
        openPanel,
        closePanel,
        getOpenedPanelIndex,
        getPanelData,
        onBack,
        onNext,
        panelGap: config.gap,
        panelWidth: config.openedWidth,
        watch: useWatch,
      }}
    >
      <AnimatedColumn width={panelSize} initialWidth={config.closedWidth} className="h-full">
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
