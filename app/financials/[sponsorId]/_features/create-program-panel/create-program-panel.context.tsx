"use client";

import { createContext, useContext } from "react";

import { CreateProgramPanel } from "@/app/financials/[sponsorId]/_features/create-program-panel/create-program-panel";
import { CreateProgramPanelContextProps } from "@/app/financials/[sponsorId]/_features/create-program-panel/create-program-panel.types";

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

export function CreateProgramPanelProvider({ children, sponsorId }: CreateProgramPanelContextProps) {
  const { Panel, ...rest } = useSidePanel({ name: "create-progam" });

  return (
    <CreateProgramPanelContext.Provider value={{ ...rest }}>
      {children}
      <Panel>
        <CreateProgramPanel sponsorId={sponsorId} />
      </Panel>
    </CreateProgramPanelContext.Provider>
  );
}

export function useCreateProgramPanel() {
  return useContext(CreateProgramPanelContext);
}
