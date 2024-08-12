"use client";

import { PropsWithChildren, RefObject, createContext, useRef } from "react";

import { SidePanelGroupRef } from "@/shared/features/side-panel-group/side-panel-group.types";

interface ProgramDetailsPanelContextInterface {
  transactionPanel: RefObject<SidePanelGroupRef>;
}

export const ProgramDetailsPanelContext = createContext<ProgramDetailsPanelContextInterface>({
  transactionPanel: { current: null },
});

export function ProgramDetailsPanelProvider({ children }: PropsWithChildren) {
  const transactionPanel = useRef<SidePanelGroupRef>(null);

  return (
    <ProgramDetailsPanelContext.Provider value={{ transactionPanel }}>{children}</ProgramDetailsPanelContext.Provider>
  );
}
