"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

import { useClientBootstrapContext } from "@/core/bootstrap/client-bootstrap-context";
import { bootstrap } from "@/core/bootstrap/index";

export function InitBootstrapAuth() {
  const auth0 = useAuth0();
  const { setClientBootstrap } = useClientBootstrapContext();

  useEffect(() => {
    const {
      isAuthenticated,
      getAccessTokenSilently: getAccessToken,
      logout,
      loginWithRedirect,
      loginWithPopup,
      isLoading,
      error,
      user,
    } = auth0;

    const authProvider = {
      isAuthenticated,
      getAccessToken,
      logout,
      loginWithRedirect,
      loginWithPopup,
      isLoading,
      error,
      user,
    };

    bootstrap.setAuthProvider(authProvider);

    setClientBootstrap(prevState => ({ ...prevState, authProvider }));
  }, [auth0]);

  return null;
}
