import { PropsWithChildren } from "react";

import { Auth0Provider } from "@/core/application/auth0-client-adapter/auth0-provider";
import { ClientBootstrapProvider } from "@/core/bootstrap/client-bootstrap-context";
import { InitBootstrapAuth } from "@/core/bootstrap/init-bootstrap-auth";
import { InitBootstrapImpersonation } from "@/core/bootstrap/init-bootstrap-impersonation";

import { TranslationProvider } from "@/shared/translation/components/translation-provider/translation-provider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ClientBootstrapProvider>
      <Auth0Provider>
        <TranslationProvider>
          <InitBootstrapAuth />
          <InitBootstrapImpersonation />
          {children}
        </TranslationProvider>
      </Auth0Provider>
    </ClientBootstrapProvider>
  );
}
