import {
  GetSponsorPortParams,
  GetSponsorPortResponse,
  GetSponsorProgramsPortParams,
  GetSponsorProgramsPortResponse,
} from "@/core/domain/sponsor/sponsor-contract.types";

export interface SponsorStoragePort {
  routes: Record<string, string>;
  getSponsor(p: GetSponsorPortParams): GetSponsorPortResponse;
  getSponsorPrograms(p: GetSponsorProgramsPortParams): GetSponsorProgramsPortResponse;
}
