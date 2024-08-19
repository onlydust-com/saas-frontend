import { PropsWithChildren, RefObject } from "react";

export interface SidePanelConfig {
  width: number;
  closedWidth?: number;
  gap?: number;
}

export interface SidePanelsContextInterface {
  isOpen: (name: string) => boolean;
  isOpenLast: (name: string) => boolean;
  open: (name: string, config?: SidePanelConfig) => void;
  close: (name: string) => void;
  back: (name: string) => void;
  container: RefObject<Element>;
  getPanelIndex: (name: string) => number;
  config: SidePanelConfig;
}

export interface SidePanelsContextProps extends PropsWithChildren {
  classNames?: Partial<classNames>;
}

interface classNames {
  columnGroup: string;
  column: string;
  inner: string;
}
