import { ProgramListItem } from "@/core/domain/program/models/program-list-item-model";
import { Program } from "@/core/domain/program/models/program-model";
import { ProgramStoragePort } from "@/core/domain/program/outputs/program-storage-port";
import {
  GetProgramResponse,
  GetProgramsResponse,
  GetTransactionsResponse,
} from "@/core/domain/program/program-contract.types";
import { TransactionListItem } from "@/core/domain/transaction/models/transaction-list-item-model";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class ProgramClientAdapter implements ProgramStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getPrograms: "me/programs",
    getProgramById: "programs/:programId",
    getProgramByIdTransactions: "programs/:programId/transactions",
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
        notifications: data.programs.map(program => new ProgramListItem(program)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getProgramByIdTransactions = ({ queryParams }: FirstParameter<ProgramStoragePort["getProgramByIdTransactions"]>) => {
    const path = this.routes["getProgramByIdTransactions"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetTransactionsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        transactions: data.transactions.map(transaction => new TransactionListItem(transaction)),
      };
    };

    return {
      request,
      tag,
    };
  };
}
