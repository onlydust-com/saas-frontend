import { PreviewDepositPortParams, PreviewDepositPortResponse } from "@/core/domain/deposit/deposit-contract.types";

export interface DepositFacadePort {
  previewDeposit(p: PreviewDepositPortParams): PreviewDepositPortResponse;
}
