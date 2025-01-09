import {
  GetHackathonBySlugPortParams,
  GetHackathonBySlugPortResponse,
  GetHackathonEventsPortParams,
  GetHackathonEventsPortResponse,
  GetHackathonsPortParams,
  GetHackathonsPortResponse,
} from "../hackathon-contract.types";

export interface HackathonStoragePort {
  getHackathons(p: GetHackathonsPortParams): GetHackathonsPortResponse;
  getHackathonBySlug(p: GetHackathonBySlugPortParams): GetHackathonBySlugPortResponse;
  getHackathonEvents(p: GetHackathonEventsPortParams): GetHackathonEventsPortResponse;
}
