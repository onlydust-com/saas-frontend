import { MarketplaceApiVersion } from "./api-version";
import { MARKETPLACE_API_BASE_URL, MARKETPLACE_API_MOCK_URL } from "./base-url";

export const marketplaceApiBasePaths = {
  [MarketplaceApiVersion.v1]: (path: string) => `${MARKETPLACE_API_BASE_URL}/api/${MarketplaceApiVersion.v1}/${path}`,
  [MarketplaceApiVersion.v2]: (path: string) => `${MARKETPLACE_API_BASE_URL}/api/${MarketplaceApiVersion.v2}/${path}`,
};

export const marketplaceApiMockBasePaths = {
  [MarketplaceApiVersion.v1]: (path: string) => `${MARKETPLACE_API_MOCK_URL}/api/${MarketplaceApiVersion.v1}/${path}`,
  [MarketplaceApiVersion.v2]: (path: string) => `${MARKETPLACE_API_MOCK_URL}/api/${MarketplaceApiVersion.v2}/${path}`,
};
