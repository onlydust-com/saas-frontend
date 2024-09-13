import {
  GetDepositResponse,
  PreviewDepositBody,
  PreviewDepositResponse,
  UpdateDepositBody,
} from "@/core/domain/deposit/deposit-contract.types";
import { Deposit } from "@/core/domain/deposit/models/deposit-model";
import { DepositPreview } from "@/core/domain/deposit/models/deposit-preview-model";
import { DepositStoragePort } from "@/core/domain/deposit/outputs/deposit-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class DepositClientAdapter implements DepositStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    previewDeposit: "sponsors/:sponsorId/deposits",
    updateDeposit: "deposits/:depositId",
    getDeposit: "deposits/:depositId",
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

  updateDeposit = ({ pathParams }: FirstParameter<DepositStoragePort["updateDeposit"]>) => {
    const path = this.routes["updateDeposit"];
    const method = "PUT";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: UpdateDepositBody) =>
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

  getDeposit = ({ pathParams }: FirstParameter<DepositStoragePort["getDeposit"]>) => {
    const path = this.routes["getDeposit"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async () => {
      const data = await this.client.request<GetDepositResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new Deposit(data);
    };

    return {
      request,
      tag,
    };
  };
}
