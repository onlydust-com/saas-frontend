"use client";

import { useEffect } from "react";
import { useLocalStorage } from "react-use";

import { bootstrap } from "@/core/bootstrap";
import { useClientBootstrapContext } from "@/core/bootstrap/client-bootstrap-context";
import { buildImpersonationHeadersFromClaim } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-helpers";
import { ImpersonationProvider } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-provider";
import { ImpersonationClaim } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation.types";

export function InitBootstrapImpersonation() {
  const { setClientBootstrap } = useClientBootstrapContext();
  const [impersonationClaim, setImpersonationClaim, removeImpersonationClaim] =
    useLocalStorage<ImpersonationClaim>("impersonation-claim");

  useEffect(() => {
    function getClaim() {
      return impersonationClaim;
    }

    function setClaim(claim: ImpersonationClaim) {
      if (claim.sub !== impersonationClaim?.sub) {
        setImpersonationClaim(claim);
      }
    }

    function clearClaim() {
      removeImpersonationClaim();
    }

    function getHeaders() {
      return impersonationClaim ? buildImpersonationHeadersFromClaim(impersonationClaim) : undefined;
    }

    const impersonationProvider: ImpersonationProvider = {
      getClaim,
      setClaim,
      clearClaim,
      getHeaders,
      isImpersonating: !!impersonationClaim,
    };

    bootstrap.setImpersonationProvider(impersonationProvider);

    setClientBootstrap(prevState => ({ ...prevState, impersonationProvider }));
  }, [impersonationClaim, setImpersonationClaim, removeImpersonationClaim, setClientBootstrap]);

  return null;
}
