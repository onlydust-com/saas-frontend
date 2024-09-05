import { PropsWithChildren } from "react";

export interface CreateProgramPanelProps {
  sponsorId: string;
}

export interface CreateProgramPanelContextProps extends PropsWithChildren {
  sponsorId: string;
}
