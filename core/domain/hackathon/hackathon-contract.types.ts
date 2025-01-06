import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import { HttpClientParameters } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";
import { HttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { HackathonsListInterface } from "./models/hackathon-list-model";
import { HackathonInterface } from "./models/hackathon-model";

/* --------------------------------- Get hackathons -------------------------------- */

export type GetHackathonsResponse = components["schemas"]["HackathonsListResponse"];

export type GetHackathonsModel = Omit<GetHackathonsResponse, "hackathons"> & {
  hackathons: HackathonsListInterface[];
};

export type GetHackathonsPortResponse = HttpStorageResponse<GetHackathonsModel>;

export type GetHackathonsPortParams = HttpClientParameters<object>;

/* --------------------------------- Get hackathon by slug -------------------------------- */

export type GetHackathonBySlugResponse = components["schemas"]["HackathonsDetailsResponse"];

type GetHackathonBySlugPathParams = operations["getHackathonBySlug"]["parameters"]["path"];

export type GetHackathonBySlugPortResponse = HttpStorageResponse<HackathonInterface>;

export type GetHackathonBySlugPortParams = HttpClientParameters<{
  PathParams: GetHackathonBySlugPathParams;
}>;
