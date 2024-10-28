"use client";

import { createContext, useContext, useMemo, useRef, useState } from "react";

import { AnyType } from "@/core/kernel/types";

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
  openedPanels: [],
  getData: () => undefined,
  getConfig: () => defaultConfig,
});

export function SidePanelsProvider({ children, classNames }: SidePanelsContextProps) {
  const [openedPanels, setOpenedPanels] = useState<string[]>([]);
  const [openedPanelsConfigs, setOpenedPanelsConfig] = useState<Record<string, SidePanelConfig>>();
  const [data, setData] = useState<[string, AnyType][]>([]);
  const container = useRef(null);
  const isTablet = useIsTablet("lower");

  function addPanelConfig(config: SidePanelConfig): SidePanelConfig {
    return {
      width: config.width ?? defaultConfig.width,
      gap: config.gap ?? defaultConfig.gap,
      closedWidth: config.closedWidth ?? defaultConfig.closedWidth,
    };
  }

  function removePanelConfig(name: string) {
    setOpenedPanelsConfig(prev => {
      const newConfig = { ...prev };
      delete newConfig[name];
      return newConfig;
    });
  }

  function closePanel(name?: string) {
    if (name) {
      setOpenedPanels(openedPanels.filter(panel => panel !== name));
      setData(data.filter(([panel]) => panel !== name));
      removePanelConfig(name);
    } else {
      setOpenedPanels([]);
      setData([]);
      setOpenedPanelsConfig({});
    }
  }

  function onBack() {
    if (openedPanels.length === 1) {
      setOpenedPanels([]);
      setData([]);
      setOpenedPanelsConfig({});
      return;
    }

    setOpenedPanels(openedPanels.slice(0, openedPanels.length - 1));
    setData(data.filter(([panel]) => panel !== openedPanels.at(-1)));
    removePanelConfig(openedPanels.at(-1) as string);
  }

  function isOpen(name: string) {
    return openedPanels.includes(name);
  }

  function isOpenLast(name: string) {
    return openedPanels.at(-1) === name;
  }

  function openPanel<T = AnyType>(name: string, panelData?: T, config?: SidePanelConfig) {
    if (openedPanels.includes(name)) {
      setOpenedPanels([...openedPanels.filter(panel => panel !== name), name]);
      setData([...data.filter(([panel]) => panel !== name), [name, panelData]]);
    } else {
      setOpenedPanels([...openedPanels, name]);
      setData([...data, [name, panelData]]);
      setOpenedPanelsConfig({ ...openedPanelsConfigs, [name]: addPanelConfig(config ?? defaultConfig) });
    }
  }

  function getPanelIndex(name: string) {
    return (openedPanels.indexOf(name) || 0) + 1;
  }

  function getData(name: string) {
    return data.find(([panel]) => panel === name)?.[1];
  }

  function getConfig(name: string) {
    const panelConfig = openedPanelsConfigs?.[name];
    return panelConfig ?? defaultConfig;
  }

  const {
    gap,
    width,
    closedWidth = 0,
  } = useMemo(() => {
    if (openedPanels.length === 0) {
      return defaultConfig;
    }

    return getConfig(openedPanels.at(-1) as string);
  }, [openedPanels]);

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
        openedPanels,
        getData,
        getConfig,
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
                paddingLeft: `${gap}rem` || 0,
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
