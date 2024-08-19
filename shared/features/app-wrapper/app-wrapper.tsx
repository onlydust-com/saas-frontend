"use client";

import { useClientBootstrapAuth } from "@/core/bootstrap/auth/use-client-bootstrap-auth";
import { useClientBootstrapImpersonation } from "@/core/bootstrap/impersonation/use-client-bootstrap-impersonation";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";

import { AnimatedColumnGroup } from "@/shared/components/animated-column-group/animated-column-group";
import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { PrimaryNavigation } from "@/shared/features/navigation/primary-navigation/primary-navigation";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";

import { AppWrapperProps } from "./app-wrapper.types";

function ImpersonationBanner() {
  const { isImpersonating } = useClientBootstrapImpersonation();

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

function AppSkeleton() {
  return (
    <div className={"mx-auto h-dvh w-dvw max-w-[2560px] p-3"}>
      <div className="flex size-full gap-3">
        <div className="flex h-full w-[260px] flex-col gap-3">
          <Skeleton classNames={{ base: "h-[64px]" }} />
          <Skeleton classNames={{ base: "h-[216px]" }} />
          <div className="flex-1"></div>
          <Skeleton classNames={{ base: "h-[116px]" }} />
          <Skeleton classNames={{ base: "h-[64px]" }} />
        </div>
        <div className="flex h-full flex-1 flex-col gap-3">
          <Skeleton classNames={{ base: "h-[64px]" }} />
          <Skeleton classNames={{ base: "flex-1" }} />
        </div>
      </div>
    </div>
  );
}

export function AppWrapper({ children }: AppWrapperProps) {
  const isTablet = useIsTablet("lower");
  const { isAuthenticated, isLoading, error, loginWithRedirect } = useClientBootstrapAuth();

  if (isLoading) {
    return <AppSkeleton />;
  }

  // TODO redirect to error page
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (!isAuthenticated && loginWithRedirect) {
    loginWithRedirect();
    return <AppSkeleton />;
  }

  if (isTablet) {
    return (
      <div className={"mx-auto flex size-full flex-col gap-3 p-3"}>
        <ImpersonationBanner />
        <PrimaryNavigation />
        {children}
      </div>
    );
  }

  return (
    <div className={"mx-auto size-full max-w-[2560px] p-3"}>
      <ImpersonationBanner />
      <AnimatedColumnGroup className="size-full gap-3">
        <PrimaryNavigation />
        <AnimatedColumn className="size-full">{children}</AnimatedColumn>
      </AnimatedColumnGroup>
    </div>
  );
}
