import { ReactNode } from "react";

import { SidePanelGroupRef } from "@/shared/features/side-panel-group/side-panel-group.types";

interface classNames {
  container: string;
  content: string;
}

interface RenderProps {
  name: string;
  onClose: () => void;
  onOpen: SidePanelGroupRef["openPanel"];
  onNext: SidePanelGroupRef["onNext"];
  onBack: SidePanelGroupRef["onBack"];
}

export interface SidePanelProps {
  name: string;
  children: ((props: RenderProps) => ReactNode) | ReactNode;
  classNames?: Partial<classNames>;
}
