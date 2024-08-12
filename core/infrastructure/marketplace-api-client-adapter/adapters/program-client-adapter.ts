import { Program } from "@/core/domain/program/models/program-model";
import { ProgramStoragePort } from "@/core/domain/program/outputs/program-storage-port";
import { GetProgramResponse } from "@/core/domain/program/program-contract.types";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class ProgramClientAdapter implements ProgramStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getProgram: "program",
  } as const;

  getProgram = ({ pathParams }: FirstParameter<ProgramStoragePort["getProgram"]>) => {
    const path = this.routes["getProgram"];
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
}
