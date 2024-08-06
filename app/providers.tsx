"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import { PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "@/shared/i18n/i18n";

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
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Auth0Provider>
  );
}
