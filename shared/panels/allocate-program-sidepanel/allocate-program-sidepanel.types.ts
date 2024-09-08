import { PropsWithChildren } from "react";

export interface AllocateProgramSidepanelProps {
  sponsorId: string;
  programId?: string;
}

export interface AllocateProgramSidepanelContextProps extends PropsWithChildren {
  sponsorId: string;
  programId?: string;
}
