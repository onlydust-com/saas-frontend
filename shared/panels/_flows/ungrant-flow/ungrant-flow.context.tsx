"use client";

import { createContext, useContext, useState } from "react";

import { AmountSelection } from "@/shared/panels/_flows/ungrant-flow/_panels/amount-selection/amount-selection";
import { useAmountSelection } from "@/shared/panels/_flows/ungrant-flow/_panels/amount-selection/amount-selection.hooks";
import { ProgramSelection } from "@/shared/panels/_flows/ungrant-flow/_panels/program-selection/program-selection";
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
  // const { open: openProgramSelection } = useProgramSelection();
  const { open: openAmountSelection } = useAmountSelection();

  function open() {
    // TODO revert this
    // openProgramSelection();

    setProgramId("3d1addd0-713e-4923-963a-2ec1f3c198c4");
    openAmountSelection();
  }

  function selectProgramId(programId: string) {
    setProgramId(programId);

    openAmountSelection();
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

      <ProgramSelection projectId={projectId} />
      <AmountSelection projectId={projectId} programId={programId} />
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
