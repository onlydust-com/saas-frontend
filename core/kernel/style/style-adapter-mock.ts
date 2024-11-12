import { StyleFacadePort } from "./style-facade-port";

export const StyleAdapterMock: StyleFacadePort = {
  pxToRem: (_px: number) => "1rem",
};
