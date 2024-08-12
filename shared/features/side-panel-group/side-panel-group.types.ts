import { PropsWithChildren } from "react";

export interface SidePanelGroupContextInterface {
  isPanelOpen: (name: string) => boolean;
  openPanel: (name?: string) => void;
  closePanel: (name?: string) => void;
  panelWidth: number;
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
  className?: Partial<classNames>;
}

export interface SidePanelGroupRef {
  openPanel: SidePanelGroupContextInterface["openPanel"];
  closePanel: SidePanelGroupContextInterface["closePanel"];
  onBack: SidePanelGroupContextInterface["onBack"];
  onNext: SidePanelGroupContextInterface["onNext"];
}
