import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "@/core/bootstrap/client-bootstrap-context";

export function useAuthUser() {
  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false, isLoading: isLoadingAuth = false } = authProvider ?? {};

  const {
    data: user,
    isLoading,
    ...restUser
  } = UserReactQueryAdapter.client.useGetMe({
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
