import {
  GetHackathonBySlugPortParams,
  GetHackathonBySlugPortResponse,
  GetHackathonContributorsPortParams,
  GetHackathonContributorsPortResponse,
  GetHackathonEventsPortParams,
  GetHackathonEventsPortResponse,
  GetHackathonProjectsV2PortParams,
  GetHackathonProjectsV2PortResponse,
  GetHackathonsPortParams,
  GetHackathonsPortResponse,
} from "../hackathon-contract.types";

export interface HackathonFacadePort {
  getHackathons(p: GetHackathonsPortParams): GetHackathonsPortResponse;
  getHackathonBySlug(p: GetHackathonBySlugPortParams): GetHackathonBySlugPortResponse;
  getHackathonProjects(p: GetHackathonProjectsV2PortParams): GetHackathonProjectsV2PortResponse;
  getHackathonEvents(p: GetHackathonEventsPortParams): GetHackathonEventsPortResponse;
  getHackathonContributors(p: GetHackathonContributorsPortParams): GetHackathonContributorsPortResponse;
}
