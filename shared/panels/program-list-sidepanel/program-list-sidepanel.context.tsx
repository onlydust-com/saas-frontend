"use client";

import { createContext, useContext } from "react";

import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { UseSidePanel } from "@/shared/features/side-panels/side-panel/side-panel.types";
import { ProgramListSidepanel } from "@/shared/panels/program-list-sidepanel/program-list-sidepanel";
import { ProgramListSidepanelContextProps } from "@/shared/panels/program-list-sidepanel/program-list-sidepanel.types";

interface ProgramListSidepanelContextInterface extends Omit<UseSidePanel<object>, "Panel" | "getConfig"> {}

export const ProgramListSidepanelContext = createContext<ProgramListSidepanelContextInterface>({
  open: () => {},
  close: () => {},
  back: () => {},
  isOpen: false,
  name: "",
});

export function ProgramListSidepanelProvider({
  children,
  sponsorId,
  onProgramClick,
}: ProgramListSidepanelContextProps) {
  const { Panel, ...rest } = useSidePanel({ name: "program-list" });

  return (
    <ProgramListSidepanelContext.Provider value={{ ...rest }}>
      {children}
      <Panel>
        <ProgramListSidepanel sponsorId={sponsorId} onProgramClick={onProgramClick} />
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
