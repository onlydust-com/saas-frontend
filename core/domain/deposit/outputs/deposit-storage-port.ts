import { PreviewDepositPortParams, PreviewDepositPortResponse } from "@/core/domain/deposit/deposit-contract.types";

export interface DepositStoragePort {
  routes: Record<string, string>;
  previewDeposit(p: PreviewDepositPortParams): PreviewDepositPortResponse;
}
