import { ProgramListItem } from "@/core/domain/program/models/program-list-item-model";
import { Program } from "@/core/domain/program/models/program-model";
import { ProgramTransactionsStats } from "@/core/domain/program/models/program-transactions-stats-model";
import { ProgramStoragePort } from "@/core/domain/program/outputs/program-storage-port";
import {
  GetProgramResponse,
  GetProgramsResponse,
  ProgramTransactionsStatsResponse,
} from "@/core/domain/program/program-contract.types";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class ProgramClientAdapter implements ProgramStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getPrograms: "me/programs",
    getProgramById: "programs/:programId",
    getProgramTransactionsStats: "programs/:programId/stats/transactions",
  } as const;

  getProgramById = ({ pathParams }: FirstParameter<ProgramStoragePort["getProgramById"]>) => {
    const path = this.routes["getProgramById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProgramResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new Program(data);
    };

    return {
      request,
      tag,
    };
  };

  getPrograms = ({ queryParams }: FirstParameter<ProgramStoragePort["getPrograms"]>) => {
    const path = this.routes["getPrograms"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetProgramsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        programs: data.programs.map(program => new ProgramListItem(program)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getProgramTransactionsStats = ({
    pathParams,
    queryParams,
  }: FirstParameter<ProgramStoragePort["getProgramTransactionsStats"]>) => {
    const path = this.routes["getProgramTransactionsStats"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<ProgramTransactionsStatsResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return new ProgramTransactionsStats(data);
    };

    return {
      request,
      tag,
    };
  };
}
