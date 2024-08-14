"use client";

import { useAuth0 } from "@auth0/auth0-react";

import { Typo } from "@/design-system/atoms/typo";

import { AnimatedColumnGroup } from "@/shared/components/animated-column-group/animated-column-group";
import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { PrimaryNavigation } from "@/shared/features/navigation/primary-navigation/primary-navigation";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";
import { useImpersonation } from "@/shared/providers/impersonation/impersonation-provider";

import { AppWrapperProps } from "./app-wrapper.types";

function ImpersonationBanner() {
  const { isImpersonating } = useImpersonation();

  if (!isImpersonating) return null;

  return (
    <div className={"pointer-events-none fixed bottom-4 left-0 right-0 z-10 text-center"}>
      <div className={"relative inline-flex overflow-hidden rounded-xl bg-black p-3"}>
        <div className="absolute inset-0 animate-pulse bg-label-red" />
        <Typo weight={"medium"} classNames={{ base: "relative z-10" }}>
          ⚠️ IMPERSONATING
        </Typo>
      </div>
    </div>
  );
}

export function AppWrapper({ children }: AppWrapperProps) {
  const isTablet = useIsTablet("lower");
  const { isAuthenticated, isLoading, error, loginWithRedirect } = useAuth0();

  // TODO add page skeleton
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return <div>Redirecting to login...</div>;
  }

  if (isTablet) {
    return (
      <div className={"mx-auto flex h-dvh w-dvw flex-col gap-3 overflow-hidden p-3"}>
        <ImpersonationBanner />
        <PrimaryNavigation />
        {children}
      </div>
    );
  }

  return (
    <div className={"mx-auto h-dvh w-dvw max-w-[2560px] overflow-hidden p-3"}>
      <ImpersonationBanner />
      <AnimatedColumnGroup className="gap-3">
        <PrimaryNavigation />
        <AnimatedColumn autoWidth={true} className="size-full">
          {children}
        </AnimatedColumn>
      </AnimatedColumnGroup>
    </div>
  );
}
