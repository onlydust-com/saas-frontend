"use client";

import { useEffect } from "react";

import { handleLoginWithRedirect } from "@/core/application/auth0-client-adapter/helpers";
import { useClientBootstrapAuth } from "@/core/bootstrap/auth/use-client-bootstrap-auth";
import { useClientBootstrapImpersonation } from "@/core/bootstrap/impersonation/use-client-bootstrap-impersonation";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";

import { AnimatedColumnGroup } from "@/shared/components/animated-column-group/animated-column-group";
import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { PrimaryNavigation } from "@/shared/features/navigation/primary-navigation/primary-navigation";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";

import { AppWrapperProps } from "./app-wrapper.types";

function AppGradient() {
  return <div className="app-gradient absolute inset-0 -z-10" />;
}

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

function AppSkeleton() {
  return (
    <>
      <div className={"h-dvh p-md tablet:hidden"}>
        <div className="flex h-full flex-col gap-md">
          <Skeleton classNames={{ base: "h-[44px]" }} />
          <Skeleton classNames={{ base: "flex-1" }} />
        </div>
      </div>

      <div className={"mx-auto hidden h-dvh w-dvw max-w-[2560px] overflow-hidden p-md tablet:block"}>
        <div className="flex size-full gap-3">
          <div className="flex h-full w-[260px] flex-col gap-3">
            <Skeleton classNames={{ base: "h-[66px]" }} />
            <Skeleton classNames={{ base: "h-[216px]" }} />
            <div className="flex-1"></div>
            <Skeleton classNames={{ base: "h-[116px]" }} />
            <Skeleton classNames={{ base: "h-[66px]" }} />
          </div>
          <div className="flex h-full flex-1 flex-col gap-3">
            <Skeleton classNames={{ base: "h-[66px]" }} />
            <Skeleton classNames={{ base: "flex-1" }} />
          </div>
        </div>
      </div>
    </>
  );
}

export function AppWrapper({ children }: AppWrapperProps) {
  const isTablet = useIsTablet("lower");
  const { isAuthenticated, isLoading, loginWithRedirect, error } = useClientBootstrapAuth();

  useEffect(() => {
    if (!isAuthenticated && !isLoading && loginWithRedirect && !error) {
      handleLoginWithRedirect(loginWithRedirect);
    }
  }, [isAuthenticated, isLoading, loginWithRedirect, error]);

  if (isLoading) {
    return <AppSkeleton />;
  }

  if (isTablet) {
    return (
      <div className={"mx-auto flex h-dvh w-dvw flex-col gap-3 overflow-hidden p-md"}>
        <AppGradient />
        <ImpersonationBanner />
        <PrimaryNavigation />

        {children}
      </div>
    );
  }

  return (
    <div className={"mx-auto h-dvh w-dvw max-w-[2560px] overflow-hidden p-md"}>
      <AppGradient />
      <ImpersonationBanner />

      <AnimatedColumnGroup className="gap-md">
        <PrimaryNavigation />
        <AnimatedColumn className="size-full overflow-hidden">{children}</AnimatedColumn>
      </AnimatedColumnGroup>
    </div>
  );
}
