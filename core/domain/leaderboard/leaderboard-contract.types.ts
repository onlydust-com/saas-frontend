import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { LeaderboardInterface } from "./models/leaderboard-model";

/* ------------------------------ Get Leaderboard ------------------------------ */

export type GetLeaderboardResponse = components["schemas"]["LeaderboardResponse"];

export type GetLeaderboardModel = Omit<GetLeaderboardResponse, "rows"> & {
  rows: LeaderboardInterface[];
};

type GetLeaderboardQueryParams = operations["getLeaderboard"]["parameters"]["query"];

export type GetLeaderboardPortResponse = HttpStorageResponse<GetLeaderboardModel>;

export type GetLeaderboardPortParams = HttpClientParameters<{
  QueryParams: GetLeaderboardQueryParams;
}>;
