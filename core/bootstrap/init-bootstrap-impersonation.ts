"use client";

import { useEffect } from "react";

import { useClientBootstrapContext } from "@/core/bootstrap/client-bootstrap-context";
import { bootstrap } from "@/core/bootstrap/index";
import { buildImpersonationHeadersFromClaim } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-helpers";
import { ImpersonationProvider } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-provider";
import { ImpersonationClaim } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation.types";

import { useImpersonation } from "@/shared/providers/impersonation/impersonation-provider";

export function InitBootstrapImpersonation() {
  const { isImpersonating, getImpersonationClaim } = useImpersonation();
  const { setClientBootstrap } = useClientBootstrapContext();

  useEffect(() => {
    const impersonationProvider: ImpersonationProvider | null = isImpersonating
      ? {
          // If the user is impersonating getImpersonateClaim will return a claim
          getHeaders: () => buildImpersonationHeadersFromClaim(getImpersonationClaim() as ImpersonationClaim),
        }
      : null;

    bootstrap.setImpersonationProvider(impersonationProvider);

    setClientBootstrap(prevState => ({ ...prevState, impersonationProvider }));
  }, [getImpersonationClaim, isImpersonating, setClientBootstrap]);

  return null;
}
