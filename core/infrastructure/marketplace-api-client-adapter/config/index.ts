import { marketplaceApiBasePaths as basePaths, marketplaceApiMockBasePaths as mockBasePaths } from "./base-path";
import { MARKETPLACE_API_BASE_URL as baseUrl, MARKETPLACE_API_MOCK_URL as mockBaseUrl } from "./base-url";

export const marketplaceApiConfig = {
  baseUrl,
  basePaths,
};

export const marketplaceMockApiConfig = {
  baseUrl: mockBaseUrl,
  basePaths: mockBasePaths,
};
