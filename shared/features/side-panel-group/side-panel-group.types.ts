import { PropsWithChildren } from "react";

export interface SidePanelGroupContextInterface {
  isPanelOpen: (name: string) => boolean;
  openPanel: (name?: string) => void;
  closePanel: (name?: string) => void;
  panelWidth: number;
  getOpendPanelIndex: () => number;
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
  };
}

export interface SidePanelGroupProps extends PropsWithChildren {
  defaultPanelName: SidePanelGroupContextProps["defaultPanelName"];
  defaultOpen?: SidePanelGroupContextProps["defaultOpen"];
  panels: SidePanelGroupContextProps["panels"];
  config: SidePanelGroupContextProps["config"];
}

export interface SidePanelGroupRef {
  openPanel: SidePanelGroupContextInterface["openPanel"];
  closePanel: SidePanelGroupContextInterface["closePanel"];
  onBack: SidePanelGroupContextInterface["onBack"];
  onNext: SidePanelGroupContextInterface["onNext"];
}
