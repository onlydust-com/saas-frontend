"use client";

import { PropsWithChildren, createContext, useContext } from "react";

import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { UseSidePanel } from "@/shared/features/side-panels/side-panel/side-panel.types";
import { ProgramListSidepanel } from "@/shared/panels/program-list-sidepanel/program-list-sidepanel";

interface ProgramListSidepanelContextInterface extends Omit<UseSidePanel, "Panel"> {}

export const ProgramListSidepanelContext = createContext<ProgramListSidepanelContextInterface>({
  open: () => {},
  close: () => {},
  back: () => {},
  isOpen: false,
  name: "",
});

export function ProgramListSidepanelProvider({ children }: PropsWithChildren) {
  const { Panel, ...rest } = useSidePanel({ name: "allocate-program" });

  return (
    <ProgramListSidepanelContext.Provider value={{ ...rest }}>
      {children}
      <Panel>
        <ProgramListSidepanel />
      </Panel>
    </ProgramListSidepanelContext.Provider>
  );
}

export function useProgramListSidepanel() {
  const context = useContext(ProgramListSidepanelContext);

  if (!context) {
    throw new Error("ProgramListSidepanelContext must be used inside a ProgramListSidepanelProvider");
  }

  return context;
}
