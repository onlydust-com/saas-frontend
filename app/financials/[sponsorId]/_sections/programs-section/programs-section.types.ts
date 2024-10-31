import { PropsWithChildren } from "react";

export interface ProgramsSectionProps extends PropsWithChildren {
  onAllocateClick: (programId: string, canGoBack?: boolean) => void;
}
