import { ProgramListItemInterface } from "@/core/domain/program/models/program-list-item-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

// Get programs
export type GetProgramsResponse = components["schemas"]["ProgramPageResponse"];
export type GetProgramsModel = Omit<GetProgramsResponse, "programs"> & {
  programs: ProgramListItemInterface[];
};

type GetProgramsQueryParams = operations["getMyPrograms"]["parameters"]["query"];

export type GetProgramsPortResponse = HttpStorageResponse<GetProgramsModel>;

export type GetProgramsPortParams = HttpClientParameters<{
  QueryParams: GetProgramsQueryParams;
}>;

// Get Program
export type GetProgramResponse = components["schemas"]["ProgramResponse"];

export type GetProgramByIdPortResponse = HttpStorageResponse<GetProgramResponse>;

type GetProgramByIdPathParams = operations["getProgram"]["parameters"]["path"];

export type GetProgramByIdPortParams = HttpClientParameters<{
  PathParams: GetProgramByIdPathParams;
}>;
