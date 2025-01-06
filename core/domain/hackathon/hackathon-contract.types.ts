import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { HackathonListItemInterface } from "./models/hackathon-list-item-model";
import { HackathonInterface } from "./models/hackathon-model";

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
