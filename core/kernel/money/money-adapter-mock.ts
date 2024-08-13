import { Currency } from "@/core/kernel/money/money.types";

import { FormatParams, MoneyFacadePort } from "./money-facade-port";

export class MoneyAdapterMock implements MoneyFacadePort {
  isFiat() {
    return false;
  }

  format(_params: FormatParams) {
    return "";
  }

  getCurrency(_code: Currency["code"]) {
    return {
      code: "",
      decimals: 0,
      id: "",
      logoUrl: "",
      name: "",
    };
  }
}
