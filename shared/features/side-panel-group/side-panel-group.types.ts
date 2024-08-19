import { PropsWithChildren } from "react";

export interface openPanelParams<T> {
  name?: string;
  data?: T;
}

export interface watchPanel<T> {
  isOpen: boolean;
  data?: T;
}

export interface SidePanelGroupContextInterface {
  isPanelOpen: (name?: string) => boolean;
  openPanel: <T>(p?: openPanelParams<T>) => void;
  getPanelData: <T>(name?: string) => T;
  watch: <T>(name: string) => watchPanel<T>;
  closePanel: (name?: string) => void;
  panelWidth: number;
  panelGap?: number;
  getOpenedPanelIndex: () => number;
  onBack: () => void;
  onNext: () => void;
}

export interface SidePanelGroupContextProps extends PropsWithChildren {
  defaultPanelName: string;
  defaultOpen?: boolean;
  panels: string[];
  config: {
    closedWidth: number;
    openedWidth: number;
    gap?: number;
  };
}

interface classNames {
  wrapper: string;
  mover: string;
}

export interface SidePanelGroupProps extends PropsWithChildren {
  defaultPanelName: SidePanelGroupContextProps["defaultPanelName"];
  defaultOpen?: SidePanelGroupContextProps["defaultOpen"];
  panels: SidePanelGroupContextProps["panels"];
  config: SidePanelGroupContextProps["config"];
  classNames?: Partial<classNames>;
}

export interface SidePanelGroupRef {
  isPanelOpen: SidePanelGroupContextInterface["isPanelOpen"];
  openPanel: SidePanelGroupContextInterface["openPanel"];
  closePanel: SidePanelGroupContextInterface["closePanel"];
  onBack: SidePanelGroupContextInterface["onBack"];
  onNext: SidePanelGroupContextInterface["onNext"];
  getPanelData: SidePanelGroupContextInterface["getPanelData"];
  watch: SidePanelGroupContextInterface["watch"];
}
