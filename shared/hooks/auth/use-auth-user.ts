import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";
import { useClientBootstrapAuth } from "@/core/bootstrap/auth/use-client-bootstrap-auth";

export function useAuthUser() {
  const { isAuthenticated, isLoading: isLoadingAuth } = useClientBootstrapAuth();

  const {
    data: user,
    isLoading,
    ...restUser
  } = MeReactQueryAdapter.client.useGetMe({
    options: {
      enabled: isAuthenticated,
    },
  });

  return {
    user,
    githubUserId: user?.githubUserId,
    isLoading: isLoading || isLoadingAuth,
    ...restUser,
  };
}
