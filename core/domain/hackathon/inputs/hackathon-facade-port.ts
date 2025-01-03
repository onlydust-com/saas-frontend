import {
  GetHackathonDetailsPortParams,
  GetHackathonDetailsPortResponse,
  GetHackathonsPortResponse,
} from "../hackathon-contract.types";
import { GetHackathonsPortParams } from "../hackathon-contract.types";

export interface HackathonFacadePort {
  getHackathons(p: GetHackathonsPortParams): GetHackathonsPortResponse;
  getHackathonDetails(p: GetHackathonDetailsPortParams): GetHackathonDetailsPortResponse;
}
