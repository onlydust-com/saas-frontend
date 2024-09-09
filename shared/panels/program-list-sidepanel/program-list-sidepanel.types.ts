import { PropsWithChildren } from "react";

export interface ProgramListSidepanelProps {
  sponsorId: string;
  onProgramClick?: (programId: string) => void;
  onCreateProgramClick: () => void;
}

export interface ProgramListSidepanelContextProps extends PropsWithChildren {
  sponsorId: string;
  onProgramClick?: (programId: string) => void;
  onCreateProgramClick: () => void;
}
