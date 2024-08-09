import { useAuth0 } from "@auth0/auth0-react";

import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";
import { UserInterface } from "@/core/domain/user/models/user-model";

export interface useAuthUserInterface {
  user?: UserInterface;
  githubUserId?: number;
  isLoading: boolean;
  isError: boolean;
}

export const useAuthUser = (): useAuthUserInterface => {
  const { isAuthenticated, isLoading: isLoadingAuth } = useAuth0();
  const {
    data: user,
    isLoading,
    isError,
  } = UserReactQueryAdapter.client.useGetMe({
    options: {
      enabled: isAuthenticated,
    },
  });

  return {
    user,
    githubUserId: user?.githubUserId,
    isLoading: isLoading || isLoadingAuth,
    isError,
  };
};
