import { useMemo } from "react";

import { Auth0ClientAdapter } from "@/core/application/auth0-client-adapter";
import { useLocalScopeStorage } from "@/core/application/auth0-client-adapter/hooks/use-local-scope-storage";
import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";
import { useClientBootstrapContext } from "@/core/bootstrap/client-bootstrap-context";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

export function usePublicRepoScope() {
  const [scopeStorage, setScopeStorage] = useLocalScopeStorage();

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false, loginWithRedirect, loginWithPopup } = authProvider ?? {};

  const { user, refetch } = useAuthUser();
  const isAuthorized = useMemo(() => user?.isAuthorizedToApplyOnGithubIssues, [user]);

  const { mutateAsync: logoutUser } = MeReactQueryAdapter.client.useLogoutMe({});

  async function getPermissions() {
    if (!scopeStorage) {
      setScopeStorage(process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE);
    }

    await logoutUser({});

    if (loginWithPopup) await Auth0ClientAdapter.helpers.handleLoginWithPopup(loginWithPopup);

    await refetch();
  }

  async function handleVerifyPermissions(onSuccess?: () => void) {
    if (!isAuthenticated) {
      if (loginWithRedirect) Auth0ClientAdapter.helpers.handleLoginWithRedirect(loginWithRedirect);
      return;
    }

    if (!isAuthorized) {
      await getPermissions();
      onSuccess?.();
      return;
    }

    onSuccess?.();
  }

  return { handleVerifyPermissions, getPermissions, isAuthorized };
}
