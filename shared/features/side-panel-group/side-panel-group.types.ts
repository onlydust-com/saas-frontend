import { PropsWithChildren } from "react";

export interface SidePanelGroupContextInterface {
  isPanelOpen: (name: string) => boolean;
  openPanel: (name?: string) => void;
  closePanel: (name?: string) => void;
}

export interface SidePanelGroupContextProps extends PropsWithChildren {
  defaultPanelName: string;
  defaultOpen?: boolean;
  config: {
    closedWidth: number;
    openedWidth: number;
  };
}

export interface SidePanelGroupProps extends PropsWithChildren {
  defaultPanelName: string;
  defaultOpen?: boolean;
  config: {
    closedWidth: number;
    openedWidth: number;
  };
}
