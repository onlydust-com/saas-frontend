import { PropsWithChildren } from "react";

import { ProgramSponsorListItemInterface } from "@/core/domain/program/models/program-sponsor-list-item";

export interface UnallocateFlowContextInterface {
  programId: string;
  sponsor?: ProgramSponsorListItemInterface;
  selectSponsor: (sponsor: ProgramSponsorListItemInterface) => void;
  open: () => void;
}

export interface UnallocateFlowContextProps extends PropsWithChildren {
  programId?: string;
}
