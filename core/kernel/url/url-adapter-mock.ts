import { UrlFacadePort } from "./url-facade-port";

export const UrlAdapterMock: UrlFacadePort = {
  validateUrl: (_url: string) => "https://example.com",
};
