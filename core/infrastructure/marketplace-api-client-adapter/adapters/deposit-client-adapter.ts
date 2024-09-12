import { PreviewDepositBody, PreviewDepositResponse } from "@/core/domain/deposit/deposit-contract.types";
import { DepositPreview } from "@/core/domain/deposit/models/deposit-preview-model";
import { DepositStoragePort } from "@/core/domain/deposit/outputs/deposit-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class DepositClientAdapter implements DepositStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    previewDeposit: "sponsors/:sponsorId/deposits",
  } as const;

  previewDeposit = ({ pathParams }: FirstParameter<DepositStoragePort["previewDeposit"]>) => {
    const path = this.routes["previewDeposit"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: PreviewDepositBody) => {
      const data = await this.client.request<PreviewDepositResponse>({
        path,
        method,
        tag,
        pathParams,
        body: JSON.stringify(body),
      });

      return new DepositPreview(data);
    };

    return {
      request,
      tag,
    };
  };
}
