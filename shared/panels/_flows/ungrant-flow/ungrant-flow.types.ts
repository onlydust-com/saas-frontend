import { PropsWithChildren } from "react";

export interface UngrantFlowContextInterface {
  projectId: string;
  programId: string;
  selectProgramId: (programId: string) => void;
  open: () => void;
}

export interface UngrantFlowContextProps extends PropsWithChildren {
  projectId?: string;
}
