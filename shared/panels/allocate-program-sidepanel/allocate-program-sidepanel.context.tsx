"use client";

import { createContext, useContext } from "react";

import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { UseSidePanel } from "@/shared/features/side-panels/side-panel/side-panel.types";
import { AllocateProgramSidepanel } from "@/shared/panels/allocate-program-sidepanel/allocate-program-sidepanel";
import { AllocateProgramSidepanelContextProps } from "@/shared/panels/allocate-program-sidepanel/allocate-program-sidepanel.types";

interface AllocateProgramSidepanelContextInterface extends Omit<UseSidePanel, "Panel"> {}

export const AllocateProgramSidepanelContext = createContext<AllocateProgramSidepanelContextInterface>({
  open: () => {},
  close: () => {},
  back: () => {},
  isOpen: false,
  name: "",
});

export function AllocateProgramSidepanelProvider({ children }: AllocateProgramSidepanelContextProps) {
  const { Panel, ...rest } = useSidePanel({ name: "allocate-program" });

  return (
    <AllocateProgramSidepanelContext.Provider value={{ ...rest }}>
      {children}
      <Panel>
        <AllocateProgramSidepanel />
      </Panel>
    </AllocateProgramSidepanelContext.Provider>
  );
}

export function useAllocateProgramSidepanel() {
  const context = useContext(AllocateProgramSidepanelContext);

  if (!context) {
    throw new Error("AllocateProgramSidepanelContext must be used inside a AllocateProgramSidepanelProvider");
  }

  return context;
}
