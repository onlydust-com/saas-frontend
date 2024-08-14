import { AnyType } from "@/core/kernel/types";

export interface AuthProvider {
  isAuthenticated: boolean;
  getAccessToken: () => Promise<string>;
  logout: (params: { logoutParams: { returnTo: string } }) => void;
  loginWithRedirect: (...args: AnyType) => Promise<void>;
  loginWithPopup: (...args: AnyType) => Promise<void>;
  isLoading: boolean;
  error?: Error;
  user?: {
    sub?: string;
  };
}
