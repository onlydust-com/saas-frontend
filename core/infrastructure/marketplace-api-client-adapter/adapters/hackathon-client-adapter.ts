import { GetHackathonDetailsResponse, GetHackathonsResponse } from "@/core/domain/hackathon/hackathon-contract.types";
import { HackathonsList } from "@/core/domain/hackathon/models/hackathon-list-model";
import { Hackathon } from "@/core/domain/hackathon/models/hackathon-model";
import { HackathonStoragePort } from "@/core/domain/hackathon/outputs/hackathon-storage-port";
import { FirstParameter } from "@/core/kernel/types";

import { HttpClient } from "../http/http-client/http-client";

export class HackathonClientAdapter implements HackathonStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getHackathons: "hackathons",
    getHackathonDetails: "hackathons/:slug",
  } as const;

  getHackathons = () => {
    const path = this.routes["getHackathons"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });

    const request = async () => {
      const data = await this.client.request<GetHackathonsResponse>({
        path,
        method,
        tag,
      });

      return {
        ...data,
        hackathons: data.hackathons.map(hackathon => new HackathonsList(hackathon)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getHackathonDetails = ({ pathParams }: FirstParameter<HackathonStoragePort["getHackathonDetails"]>) => {
    const path = this.routes["getHackathonDetails"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async () => {
      const data = await this.client.request<GetHackathonDetailsResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new Hackathon(data);
    };

    return {
      request,
      tag,
    };
  };
}
