import {
  GetHackathonBySlugPortParams,
  GetHackathonBySlugPortResponse,
  GetHackathonProjectsV2PortParams,
  GetHackathonProjectsV2PortResponse,
  GetHackathonEventsPortParams,
  GetHackathonEventsPortResponse,
  GetHackathonsPortParams,
  GetHackathonsPortResponse,
} from "../hackathon-contract.types";

export interface HackathonStoragePort {
  getHackathons(p: GetHackathonsPortParams): GetHackathonsPortResponse;
  getHackathonBySlug(p: GetHackathonBySlugPortParams): GetHackathonBySlugPortResponse;
  getHackathonProjects(p: GetHackathonProjectsV2PortParams): GetHackathonProjectsV2PortResponse;
  getHackathonEvents(p: GetHackathonEventsPortParams): GetHackathonEventsPortResponse;
}
