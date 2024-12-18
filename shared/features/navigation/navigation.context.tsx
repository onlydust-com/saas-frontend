"use client";

import { usePathname } from "next/navigation";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { BreadcrumbsPort } from "@/design-system/atoms/breadcrumbs";

interface NavigationContextInterface {
  setBreadcrumb: (breadcrumb: BreadcrumbsPort["items"] | undefined) => void;
  breadcrumb: BreadcrumbsPort["items"] | undefined;
}

export const NavigationContext = createContext<NavigationContextInterface>({
  setBreadcrumb: () => {},
  breadcrumb: [],
});

export function NavigationProvider({ children }: PropsWithChildren) {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbsPort["items"] | undefined>();
  const pathname = usePathname();

  function handleSetBreadcrumb(breadcrumb: BreadcrumbsPort["items"] | undefined) {
    setBreadcrumb(breadcrumb);
  }

  useEffect(() => {
    return () => {
      handleSetBreadcrumb(undefined);
    };
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{ breadcrumb, setBreadcrumb: handleSetBreadcrumb }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}

export function NavigationBreadcrumb({ breadcrumb }: { breadcrumb: BreadcrumbsPort["items"] | undefined }) {
  const { setBreadcrumb } = useNavigation();

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb]);

  return null;
}
