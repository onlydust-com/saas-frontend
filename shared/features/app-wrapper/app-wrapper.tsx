"use client";

import { useClientBootstrapAuth } from "@/core/bootstrap/auth/use-client-bootstrap-auth";
import { useClientBootstrapImpersonation } from "@/core/bootstrap/impersonation/use-client-bootstrap-impersonation";

import { Typo } from "@/design-system/atoms/typo";

import { AppGradient } from "@/shared/components/app-gradient/app-gradient";
import { Navigation } from "@/shared/features/navigation/navigation";

import { AppWrapperProps } from "./app-wrapper.types";

function ImpersonationBanner() {
  const { isImpersonating } = useClientBootstrapImpersonation();

  if (!isImpersonating) return null;

  return (
    <div className={"pointer-events-none fixed bottom-md left-0 right-0 z-10 text-center"}>
      <div className={"relative inline-flex overflow-hidden rounded-xl bg-black p-3"}>
        <div className="absolute inset-0 animate-pulse bg-foreground-warning" />
        <Typo weight={"medium"} classNames={{ base: "relative z-10" }}>
          ⚠️ IMPERSONATING
        </Typo>
      </div>
    </div>
  );
}

export function AppWrapper({ children }: AppWrapperProps) {
  const { isLoading } = useClientBootstrapAuth();

  function renderApp() {
    if (!isLoading) {
      return (
        <>
          <ImpersonationBanner />
          <Navigation>{children}</Navigation>
        </>
      );
    }

    return null;
  }

  return (
    <div className={"flex h-dvh w-dvw flex-col overflow-hidden"}>
      <AppGradient />
      {renderApp()}
    </div>
  );
}
