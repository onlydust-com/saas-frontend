import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";

import { Auth0Provider } from "@/core/application/auth0-client-adapter/auth0-provider";
import { QueryProvider } from "@/core/application/react-query-adapter/query-provider";
import { ClientBootstrapProvider } from "@/core/bootstrap/client-bootstrap-context";

import { IntercomProvider } from "@/shared/intercom/intercom.context";
import { AuthProvider } from "@/shared/providers/auth-provider";
import { PosthogProvider } from "@/shared/tracking/posthog/posthog-provider";
import { TranslationProvider } from "@/shared/translation/components/translation-provider/translation-provider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ClientBootstrapProvider>
      <PosthogProvider>
        <Auth0Provider>
          <AuthProvider>
            <TranslationProvider>
              <QueryProvider>
                <IntercomProvider>
                  <NextUIProvider>{children}</NextUIProvider>
                </IntercomProvider>
              </QueryProvider>
            </TranslationProvider>
          </AuthProvider>
        </Auth0Provider>
      </PosthogProvider>
    </ClientBootstrapProvider>
  );
}
