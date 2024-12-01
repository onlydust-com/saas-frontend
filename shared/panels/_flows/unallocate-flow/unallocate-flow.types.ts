import { PropsWithChildren } from "react";

import { SponsorInterface } from "@/core/domain/sponsor/models/sponsor-model";

export interface UnallocateFlowContextInterface {
  programId: string;
  sponsor?: SponsorInterface;
  selectSponsor: (sponsor: SponsorInterface) => void;
  open: () => void;
}

export interface UnallocateFlowContextProps extends PropsWithChildren {
  programId?: string;
}
