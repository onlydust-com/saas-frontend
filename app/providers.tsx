import { PropsWithChildren } from "react";

import { Auth0Provider } from "@/core/application/auth0-client-adapter/auth0-provider";
import { ClientBootstrapProvider } from "@/core/bootstrap/client-bootstrap-context";

import { PosthogProvider } from "@/shared/tracking/posthog/posthog-provider";
import { TranslationProvider } from "@/shared/translation/components/translation-provider/translation-provider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ClientBootstrapProvider>
      <PosthogProvider>
        <Auth0Provider>
          <TranslationProvider>{children}</TranslationProvider>
        </Auth0Provider>
      </PosthogProvider>
    </ClientBootstrapProvider>
  );
}
