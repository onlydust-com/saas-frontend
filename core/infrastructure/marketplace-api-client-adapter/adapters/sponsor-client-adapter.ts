import { Sponsor } from "@/core/domain/sponsor/models/sponsor-model";
import { SponsorProgramsListItem } from "@/core/domain/sponsor/models/sponsor-program-list-item-model";
import { SponsorStoragePort } from "@/core/domain/sponsor/outputs/sponsor-storage-port";
import { GetSponsorProgramsResponse, GetSponsorResponse } from "@/core/domain/sponsor/sponsor-contract.types";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class SponsorClientAdapter implements SponsorStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getSponsor: "sponsors/:sponsorId",
    getSponsorProgram: "sponsors/:sponsorId/programs",
  } as const;

  getSponsor = ({ pathParams }: FirstParameter<SponsorStoragePort["getSponsor"]>) => {
    const path = this.routes["getSponsor"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () => {
      const data = await this.client.request<GetSponsorResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new Sponsor(data);
    };

    return {
      request,
      tag,
    };
  };

  getSponsorPrograms = ({ queryParams, pathParams }: FirstParameter<SponsorStoragePort["getSponsorPrograms"]>) => {
    const path = this.routes["getSponsorProgram"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetSponsorProgramsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return {
        ...data,
        programs: data.programs.map(program => new SponsorProgramsListItem(program)),
      };
    };

    return {
      request,
      tag,
    };
  };
}
