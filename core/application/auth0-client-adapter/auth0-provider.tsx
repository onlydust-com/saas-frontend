"use client";

import { AppState, Auth0Provider as Provider } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

const domain = process.env.NEXT_PUBLIC_AUTH0_PROVIDER_DOMAIN;
const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL;
const connectionName = process.env.NEXT_PUBLIC_AUTH0_DEFAULT_CONNECTION_NAME;
const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;

export function Auth0Provider({ children }: PropsWithChildren) {
  const router = useRouter();
  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }

  const onRedirectCallback = (state: AppState | undefined) => {
    if (state?.returnTo) {
      router.push(state.returnTo);
    }
  };

  return (
    <Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        connection: connectionName,
        audience,
        // connection_scope: scopeStorage,
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Provider>
  );
}
