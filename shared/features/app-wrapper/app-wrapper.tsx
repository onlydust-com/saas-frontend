"use client";

import { useAuth0 } from "@auth0/auth0-react";

import { AnimatedColumnGroup } from "@/shared/components/animated-column-group/animated-column-group";
import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { PrimaryNavigation } from "@/shared/features/navigation/primary-navigation/primary-navigation";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";

import { AppWrapperProps } from "./app-wrapper.types";

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
        <PrimaryNavigation />
        {children}
      </div>
    );
  }

  return (
    <div className={"mx-auto h-dvh w-dvw max-w-[2560px] overflow-hidden p-3"}>
      <AnimatedColumnGroup className="gap-3">
        <PrimaryNavigation />
        <AnimatedColumn autoWidth={true} className="size-full">
          {children}
        </AnimatedColumn>
      </AnimatedColumnGroup>
    </div>
  );
}
