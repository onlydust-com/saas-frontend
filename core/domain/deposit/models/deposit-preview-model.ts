import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type DepositPreviewResponse = components["schemas"]["PreviewDepositResponse"];

export interface DepositPreviewInterface extends DepositPreviewResponse {}

export class DepositPreview implements DepositPreviewInterface {
  id!: DepositPreviewResponse["id"];

  constructor(props: DepositPreviewResponse) {
    Object.assign(this, props);
  }
}
