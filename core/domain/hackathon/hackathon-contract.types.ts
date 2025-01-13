import { HackathonEventInterface } from "@/core/domain/hackathon/models/hackathon-event-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { HackathonListItemInterface } from "./models/hackathon-list-item-model";
import { HackathonInterface } from "./models/hackathon-model";
import { HackathonProjectListItemInterfaceV2 } from "./models/hackathon-project-list-item-model-v2";

/* --------------------------------- Get hackathons -------------------------------- */

export type GetHackathonsResponse = components["schemas"]["HackathonsListResponse"];

export type GetHackathonsModel = Omit<GetHackathonsResponse, "hackathons"> & {
  hackathons: HackathonListItemInterface[];
};

export type GetHackathonsPortResponse = HttpStorageResponse<GetHackathonsModel>;

export type GetHackathonsPortParams = HttpClientParameters<object>;

/* --------------------------------- Get hackathon by slug -------------------------------- */

export type GetHackathonBySlugResponse = components["schemas"]["HackathonResponseV2"];

type GetHackathonBySlugPathParams = operations["getHackathonBySlugV2"]["parameters"]["path"];

export type GetHackathonBySlugPortResponse = HttpStorageResponse<HackathonInterface>;

export type GetHackathonBySlugPortParams = HttpClientParameters<{
  PathParams: GetHackathonBySlugPathParams;
}>;

/* ------------------------------ Get Hackathon Projects V2 ------------------------------ */

export type GetHackathonProjectsV2Response = components["schemas"]["ProjectPageResponseV2"];

export type GetHackathonProjectsV2Model = Omit<GetHackathonProjectsV2Response, "projects"> & {
  projects: HackathonProjectListItemInterfaceV2[];
};

export type GetHackathonProjectsV2QueryParams = operations["getHackathonProjects"]["parameters"]["query"];
type GetHackathonProjectsV2PathParams = operations["getHackathonProjects"]["parameters"]["path"];

export type GetHackathonProjectsV2PortResponse = HttpStorageResponse<GetHackathonProjectsV2Model>;

export type GetHackathonProjectsV2PortParams = HttpClientParameters<{
  QueryParams: GetHackathonProjectsV2QueryParams;
  PathParams: GetHackathonProjectsV2PathParams;
}>;

/* --------------------------------- Get hackathon events -------------------------------- */

export type GetHackathonEventsResponse = components["schemas"]["HackathonEventsResponse"];
export type GetHackathonEventsModel = Omit<GetHackathonEventsResponse, "events"> & {
  events: HackathonEventInterface[];
};

type GetHackathonEventsPathParams = operations["getHackathonEvents"]["parameters"]["path"];
type GetHackathonEventsQueryParams = operations["getHackathonEvents"]["parameters"]["query"];

export type GetHackathonEventsPortResponse = HttpStorageResponse<GetHackathonEventsModel>;

export type GetHackathonEventsPortParams = HttpClientParameters<{
  PathParams: GetHackathonEventsPathParams;
  QueryParams: GetHackathonEventsQueryParams;
}>;
