"use client";

import { createContext, useContext, useState } from "react";

import { ProgramSelection } from "@/shared/panels/_flows/ungrant-flow/_panels/program-selection/program-selection";
import { useProgramSelection } from "@/shared/panels/_flows/ungrant-flow/_panels/program-selection/program-selection.hooks";
import {
  UngrantFlowContextInterface,
  UngrantFlowContextProps,
} from "@/shared/panels/_flows/ungrant-flow/ungrant-flow.types";

export const UngrantFlowContext = createContext<UngrantFlowContextInterface>({
  projectId: "",
  programId: "",
  selectProgramId: () => {},
  open: () => {},
});

export function UngrantFlowProvider({ projectId = "", children }: UngrantFlowContextProps) {
  const [programId, setProgramId] = useState("");
  const { open: openProgramSelection } = useProgramSelection();

  function open() {
    openProgramSelection();
  }

  function selectProgramId(programId: string) {
    setProgramId(programId);

    alert("open amount selection panel");
  }

  return (
    <UngrantFlowContext.Provider
      value={{
        projectId,
        programId,
        selectProgramId,
        open,
      }}
    >
      {children}

      <ProgramSelection />
      {/* Amount selection */}
    </UngrantFlowContext.Provider>
  );
}

export function useUngrantFlow() {
  const context = useContext(UngrantFlowContext);

  if (!context) {
    throw new Error("UngrantFlowContext must be used inside a UngrantFlowContextProvider");
  }

  return context;
}
