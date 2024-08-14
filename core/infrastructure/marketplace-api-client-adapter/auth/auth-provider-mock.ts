import { AuthProvider } from "@/core/infrastructure/marketplace-api-client-adapter/auth/auth-provider";

export const authProviderMock: AuthProvider = {
  isAuthenticated: false,
  getAccessToken: async () => "",
  logout: () => {},
  loginWithRedirect: async () => {},
  loginWithPopup: async () => {},
  isLoading: true,
  error: undefined,
  user: undefined,
};
