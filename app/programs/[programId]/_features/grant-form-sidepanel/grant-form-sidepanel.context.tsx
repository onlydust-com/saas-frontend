import { PropsWithChildren, createContext, useContext, useState } from "react";

import { DetailedTotalMoney } from "@/core/kernel/money/money.types";

import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { UseSidePanel } from "@/shared/features/side-panels/side-panel/side-panel.types";

export interface GrantProject {
  id: string;
  name: string;
  logoUrl?: string;
  description: string;
  totalAvailable: DetailedTotalMoney;
}

export const GrantFormContext = createContext<{
  sidePanel: UseSidePanel;
  projectState: ReturnType<typeof useState<GrantProject | undefined>>;
}>({
  sidePanel: {
    Panel: () => <div />,
    isOpen: false,
    open: () => {},
    close: () => {},
    back: () => {},
    name: "",
  },
  projectState: [undefined, () => {}],
});

export function GrantFormContextProvider({ children }: PropsWithChildren) {
  const grantFormSidepanel = useSidePanel({ name: "grant-form" });
  const projectState = useState<GrantProject | undefined>();

  return (
    <GrantFormContext.Provider
      value={{
        sidePanel: grantFormSidepanel,
        projectState,
      }}
    >
      {children}
    </GrantFormContext.Provider>
  );
}

export function useGrantFormContext() {
  const context = useContext(GrantFormContext);

  if (!context) {
    throw new Error("GrantFormContext must be used inside a GrantFormContextProvider");
  }

  return context;
}
