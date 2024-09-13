import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type DepositPreviewResponse = components["schemas"]["PreviewDepositResponse"];

export interface DepositPreviewInterface extends DepositPreviewResponse {}

export class DepositPreview implements DepositPreviewInterface {
  amount!: DepositPreviewResponse["amount"];
  billingInformation!: DepositPreviewResponse["billingInformation"];
  currentBalance!: DepositPreviewResponse["currentBalance"];
  finalBalance!: DepositPreviewResponse["finalBalance"];
  id!: DepositPreviewResponse["id"];
  senderInformation!: DepositPreviewResponse["senderInformation"];

  constructor(props: DepositPreviewResponse) {
    Object.assign(this, props);
  }
}
