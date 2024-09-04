"use client";

import { PropsWithChildren, createContext, useContext } from "react";

import { CreateProgramPanel } from "@/app/financials/[sponsorId]/_features/create-program-panel/create-program-panel";

import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { UseSidePanel } from "@/shared/features/side-panels/side-panel/side-panel.types";

interface CreateProgramPanelContextInterface extends Omit<UseSidePanel, "Panel"> {}

export const CreateProgramPanelContext = createContext<CreateProgramPanelContextInterface>({
  open: () => {},
  close: () => {},
  back: () => {},
  isOpen: false,
  name: "",
});

export function CreateProgramPanelProvider({ children }: PropsWithChildren) {
  const { Panel, ...rest } = useSidePanel({ name: "create-progam" });

  return (
    <CreateProgramPanelContext.Provider value={{ ...rest }}>
      {children}
      <Panel>
        <CreateProgramPanel />
      </Panel>
    </CreateProgramPanelContext.Provider>
  );
}

export function useCreateProgramPanel() {
  return useContext(CreateProgramPanelContext);
}
