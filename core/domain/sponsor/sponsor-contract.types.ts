import { SponsorProgramsListItem } from "@/core/domain/sponsor/models/sponsor-program-list-item-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

export type GetSponsorResponse = components["schemas"]["SponsorResponse"];

export type GetSponsorPortResponse = HttpStorageResponse<GetSponsorResponse>;

type GetSponsorPathParams = operations["getSponsor"]["parameters"]["path"];
export type GetSponsorPortParams = HttpClientParameters<{
  PathParams: GetSponsorPathParams;
}>;

export type GetSponsorProgramsResponse = components["schemas"]["SponsorProgramPageResponse"];
export type GetSponsorProgramsModel = Omit<GetSponsorProgramsResponse, "programs"> & {
  programs: SponsorProgramsListItem[];
};

export type GetSponsorProgramsPortResponse = HttpStorageResponse<GetSponsorProgramsResponse>;

type GetSponsorProgramsPathParams = operations["getSponsorPrograms"]["parameters"]["path"];
type GetSponsorProgramsQueryParams = operations["getSponsorPrograms"]["parameters"]["query"];
export type GetSponsorProgramsPortParams = HttpClientParameters<{
  PathParams: GetSponsorProgramsPathParams;
  QueryParams: GetSponsorProgramsQueryParams;
}>;
