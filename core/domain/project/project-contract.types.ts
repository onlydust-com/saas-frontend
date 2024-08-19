import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

export type GetProjectByidResponse = components["schemas"]["ProjectResponse"];

export type GetProjectByidPortResponse = HttpStorageResponse<GetProjectByidResponse>;

type GetProjectByIdQueryParams = operations["getProject"]["parameters"]["query"];
type GetProgramByIdPathParams = operations["getProject"]["parameters"]["path"];

export type GetProjectByidPortParams = HttpClientParameters<{
  QueryParams: GetProjectByIdQueryParams;
  PathParams: GetProgramByIdPathParams;
}>;
