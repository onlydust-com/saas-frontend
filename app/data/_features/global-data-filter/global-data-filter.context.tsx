"use client";

import { PropsWithChildren, createContext, useContext } from "react";

interface GlobalDataFilterContextInterface {
  sample: string;
}

export const GlobalDataFilterContext = createContext<GlobalDataFilterContextInterface>({
  sample: "",
});

export function GlobalDataFilterProvider({ children }: PropsWithChildren) {
  return <GlobalDataFilterContext.Provider value={{ sample: "" }}>{children}</GlobalDataFilterContext.Provider>;
}

export function useGlobalDataFilter() {
  return useContext(GlobalDataFilterContext);
}
