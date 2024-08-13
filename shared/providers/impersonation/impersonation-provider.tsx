"use client";

import { PropsWithChildren, createContext, useCallback, useContext } from "react";
import { useLocalStorage } from "react-use";

import { buildImpersonationHeadersFromClaim } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-helpers";
import {
  ImpersonationClaim,
  ImpersonationHeaders,
} from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation.types";

interface ImpersonationContextType {
  getImpersonationClaim: () => ImpersonationClaim | undefined;
  setImpersonationClaim: (claim: ImpersonationClaim) => void;
  clearImpersonationClaim: () => void;
  getImpersonationHeaders: () => ImpersonationHeaders | undefined;
  isImpersonating: boolean;
}

const ImpersonationContext = createContext<ImpersonationContextType | undefined>(undefined);

export function ImpersonationProvider({ children }: PropsWithChildren) {
  const [impersonationClaim, setImpersonationClaim, removeImpersonationClaim] =
    useLocalStorage<ImpersonationClaim>("impersonation-claim");

  function handleGetImpersonationClaim() {
    return impersonationClaim;
  }

  function handleSetImpersonationClaim(claim: ImpersonationClaim) {
    if (claim.sub !== impersonationClaim?.sub) {
      setImpersonationClaim(claim);
    }
  }

  const handleGetImpersonationHeaders = useCallback(() => {
    if (impersonationClaim) {
      return buildImpersonationHeadersFromClaim(impersonationClaim);
    }

    return undefined;
  }, [impersonationClaim]);

  const value = {
    getImpersonationClaim: handleGetImpersonationClaim,
    setImpersonationClaim: handleSetImpersonationClaim,
    clearImpersonationClaim: removeImpersonationClaim,
    getImpersonationHeaders: handleGetImpersonationHeaders,
    isImpersonating: !!impersonationClaim,
  };

  return <ImpersonationContext.Provider value={value}>{children}</ImpersonationContext.Provider>;
}

export function useImpersonation() {
  const context = useContext(ImpersonationContext);

  if (context === undefined) {
    throw new Error("useImpersonation must be used within an ImpersonationProvider");
  }

  return context;
}
