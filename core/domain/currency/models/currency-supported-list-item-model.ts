import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type CurrencySupportedListItemResponse = components["schemas"]["SupportedCurrencyResponse"];

export interface CurrencySupportedListItemInterface extends CurrencySupportedListItemResponse {}

export class CurrencySupportedListItem implements CurrencySupportedListItemInterface {
  code!: CurrencySupportedListItemResponse["code"];
  decimals!: CurrencySupportedListItemResponse["decimals"];
  id!: CurrencySupportedListItemResponse["id"];
  logoUrl!: CurrencySupportedListItemResponse["logoUrl"];
  name!: CurrencySupportedListItemResponse["name"];
  onlyDustWallets!: CurrencySupportedListItemResponse["onlyDustWallets"];

  constructor(props: CurrencySupportedListItemResponse) {
    Object.assign(this, props);
  }
}
