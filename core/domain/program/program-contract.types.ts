import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

export type GetProgramResponse = components["schemas"]["ProgramDetailsResponse"];

export type GetProgramPortResponse = HttpStorageResponse<GetProgramResponse>;

type GetProgramPathParams = operations["getProgram"]["parameters"]["path"];

export type GetProgramPortParams = HttpClientParameters<{
  PathParams: GetProgramPathParams;
}>;
