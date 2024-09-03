import { GetSponsorPortParams, GetSponsorPortResponse } from "@/core/domain/sponsor/sponsor-contract.types";

export interface SponsorFacadePort {
  getSponsor(p: GetSponsorPortParams): GetSponsorPortResponse;
}
