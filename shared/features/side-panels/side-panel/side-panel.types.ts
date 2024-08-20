import { PropsWithChildren, ReactNode } from "react";

import { SidePanelConfig } from "@/shared/features/side-panels/side-panels.types";

interface classNames {
  container: string;
  content: string;
}

export interface SidePanelProps {
  name: string;
  children: ReactNode;
  classNames?: Partial<classNames>;
}

export interface UseSidePanel {
  name: string;
  isOpen: boolean;
  open: () => void;
  close: (current?: boolean) => void;
  back: () => void;
  Panel: (p: PropsWithChildren) => JSX.Element;
}

export interface SidePanelRef {
  open: (config?: SidePanelConfig) => void;
  close: (current?: boolean) => void;
  back: () => void;
  isOpen: boolean;
  name: string;
}
