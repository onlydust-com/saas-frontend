"use client";

import { createContext, useContext, useMemo, useRef, useState } from "react";

import { AnimatedColumnGroup } from "@/shared/components/animated-column-group/animated-column-group";
import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { SIDE_PANEL_GAP, SIDE_PANEL_SIZE } from "@/shared/constants/side-panel-size";
import {
  SidePanelConfig,
  SidePanelsContextInterface,
  SidePanelsContextProps,
} from "@/shared/features/side-panels/side-panels.types";
import { cn } from "@/shared/helpers/cn";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";

const defaultConfig: SidePanelConfig = {
  width: SIDE_PANEL_SIZE.m,
  gap: SIDE_PANEL_GAP.m,
  closedWidth: 0,
};

export const SidePanelsContext = createContext<SidePanelsContextInterface>({
  isOpen: () => false,
  open: () => {},
  close: () => {},
  back: () => {},
  container: { current: null },
  getPanelIndex: () => 0,
  isOpenLast: () => false,
  config: defaultConfig,
});

export function SidePanelsProvider({ children, classNames }: SidePanelsContextProps) {
  const [{ gap, width, closedWidth = 0 }, setConfig] = useState<SidePanelConfig>(defaultConfig);
  const [openedPanels, setOpenedPanels] = useState<string[]>([]);
  const container = useRef(null);
  const isTablet = useIsTablet("lower");

  function closePanel(name: string) {
    if (name) {
      setOpenedPanels([]);
    }
  }

  function onBack() {
    if (openedPanels.length === 1) {
      setOpenedPanels([]);
      return;
    }

    setOpenedPanels(openedPanels.slice(0, openedPanels.length - 1));
  }

  function isOpen(name: string) {
    return openedPanels.includes(name);
  }

  function isOpenLast(name: string) {
    return openedPanels.at(-1) === name;
  }

  function openPanel(name: string, config?: SidePanelConfig) {
    setConfig({ ...defaultConfig, ...(config || {}) });

    if (openedPanels.includes(name)) {
      setOpenedPanels([...openedPanels.filter(panel => panel !== name), name]);
    } else {
      setOpenedPanels([...openedPanels, name]);
    }
  }

  function getPanelIndex(name: string) {
    return (openedPanels.indexOf(name) || 0) + 1;
  }

  const panelSize = useMemo(() => {
    if (openedPanels.length === 0) {
      return closedWidth;
    }

    return width + (gap || 0);
  }, [openedPanels, gap, width, closedWidth]);

  return (
    <SidePanelsContext.Provider
      value={{
        open: openPanel,
        close: closePanel,
        back: onBack,
        isOpen,
        config: { width, gap, closedWidth },
        container,
        getPanelIndex,
        isOpenLast,
      }}
    >
      <AnimatedColumnGroup className={classNames?.columnGroup}>
        {children}
        {!isTablet && (
          <AnimatedColumn width={panelSize} initialWidth={closedWidth} className={cn("h-full", classNames?.column)}>
            <div
              className={cn("relative h-full w-full overflow-hidden", classNames?.inner)}
              ref={container}
              style={{
                paddingLeft: gap || 0,
              }}
            ></div>
          </AnimatedColumn>
        )}
      </AnimatedColumnGroup>
    </SidePanelsContext.Provider>
  );
}

export function useSidePanelsContext() {
  const context = useContext(SidePanelsContext);
  if (!context) {
    throw new Error("SidePanel must be used inside a SidePanelsContextProvider");
  }
  return context;
}
