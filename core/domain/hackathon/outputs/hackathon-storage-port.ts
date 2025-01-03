import {
  GetHackathonDetailsPortParams,
  GetHackathonDetailsPortResponse,
  GetHackathonsPortParams,
  GetHackathonsPortResponse,
} from "../hackathon-contract.types";

export interface HackathonStoragePort {
  getHackathons(p: GetHackathonsPortParams): GetHackathonsPortResponse;
  getHackathonDetails(p: GetHackathonDetailsPortParams): GetHackathonDetailsPortResponse;
}
