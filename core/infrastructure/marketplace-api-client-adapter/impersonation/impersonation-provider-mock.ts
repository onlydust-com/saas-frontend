import { ImpersonationProvider } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-provider";

export const impersonationProviderMock: ImpersonationProvider = {
  getClaim: () => undefined,
  setClaim: () => {},
  clearClaim: () => {},
  getHeaders: () => undefined,
  isImpersonating: false,
};
