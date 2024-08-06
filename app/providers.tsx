"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import { PropsWithChildren } from "react";

const domain = process.env.NEXT_PUBLIC_AUTH0_PROVIDER_DOMAIN;
const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL;
const connectionName = process.env.NEXT_PUBLIC_AUTH0_DEFAULT_CONNECTION_NAME;
const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;

export function Providers({ children }: PropsWithChildren) {
  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }

  return (
    <Auth0Provider
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
      // onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
