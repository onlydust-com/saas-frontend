import { PropsWithChildren } from "react";

export interface AllocateProgramSidepanelProps {
  programId?: string;
}

export interface AllocateProgramSidepanelContextProps extends PropsWithChildren {
  programId?: string;
}
