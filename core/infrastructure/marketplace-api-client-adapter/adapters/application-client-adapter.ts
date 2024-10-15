import { PatchApplicationBody } from "@/core/domain/application/application-contract.types";
import { ApplicationStoragePort } from "@/core/domain/application/outputs/application-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class ApplicationClientAdapter implements ApplicationStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    patchApplication: "applications/:applicationId",
  } as const;

  patchApplication = ({ pathParams }: FirstParameter<ApplicationStoragePort["patchApplication"]>) => {
    const path = this.routes["patchApplication"];
    const method = "PATCH";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: PatchApplicationBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        pathParams,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };
}
