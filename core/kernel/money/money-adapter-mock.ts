import { FormatParams, MoneyFacadePort } from "./money-facade-port";

export const MoneyAdapterMock: MoneyFacadePort = {
  format: (_params: FormatParams) => "",
  getUSDCurrency: () => ({
    id: "",
    code: "",
    name: "",
    logoUrl: "",
    decimals: 0,
  }),
};
