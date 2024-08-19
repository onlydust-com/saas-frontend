"use client";

import { PropsWithChildren, RefObject, createContext, useRef } from "react";

import { SidePanelGroupRef } from "@/shared/features/side-panel-group/side-panel-group.types";

interface ProgramDetailsPanelContextInterface {
  transactionPanel: RefObject<SidePanelGroupRef>;
  projectPanel: RefObject<SidePanelGroupRef>;
}

export const ProgramDetailsPanelContext = createContext<ProgramDetailsPanelContextInterface>({
  transactionPanel: { current: null },
  projectPanel: { current: null },
});

export function ProgramDetailsPanelProvider({ children }: PropsWithChildren) {
  const transactionPanel = useRef<SidePanelGroupRef>(null);
  const projectPanel = useRef<SidePanelGroupRef>(null);

  return (
    <ProgramDetailsPanelContext.Provider value={{ transactionPanel, projectPanel }}>
      {children}
    </ProgramDetailsPanelContext.Provider>
  );
}
