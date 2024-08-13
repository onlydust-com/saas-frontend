import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";

import { Auth0Provider } from "@/core/application/auth0-client-adapter/auth0-provider";
import { QueryProvider } from "@/core/application/react-query-adapter/query-provider";
import { ClientBootstrapProvider } from "@/core/bootstrap/client-bootstrap-context";

import { ImpersonationProvider } from "@/shared/providers/impersonation/impersonation-provider";
import { PosthogProvider } from "@/shared/tracking/posthog/posthog-provider";
import { TranslationProvider } from "@/shared/translation/components/translation-provider/translation-provider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ClientBootstrapProvider>
      <PosthogProvider>
        <ImpersonationProvider>
          <Auth0Provider>
            <TranslationProvider>
              <QueryProvider>
                <NextUIProvider>{children}</NextUIProvider>
              </QueryProvider>
            </TranslationProvider>
          </Auth0Provider>
        </ImpersonationProvider>
      </PosthogProvider>
    </ClientBootstrapProvider>
  );
}
