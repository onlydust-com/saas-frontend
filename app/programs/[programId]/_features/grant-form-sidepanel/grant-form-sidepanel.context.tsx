import { PropsWithChildren, createContext, useContext, useState } from "react";

import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { UseSidePanel } from "@/shared/features/side-panels/side-panel/side-panel.types";

export const GrantFormContext = createContext<{
  sidePanel: UseSidePanel;
  projectIdState: ReturnType<typeof useState<string | undefined>>;
}>({
  sidePanel: {
    Panel: () => <div />,
    isOpen: false,
    open: () => {},
    close: () => {},
    back: () => {},
    name: "",
  },
  projectIdState: ["", () => {}],
});

export function GrantFormContextProvider({ children }: PropsWithChildren) {
  const grantFormSidepanel = useSidePanel({ name: "grant-form" });
  const projectIdState = useState<string | undefined>();

  return (
    <GrantFormContext.Provider
      value={{
        sidePanel: grantFormSidepanel,
        projectIdState,
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
