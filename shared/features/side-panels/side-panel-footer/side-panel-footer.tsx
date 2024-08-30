import { PropsWithChildren } from "react";

export function SidePanelFooter({ children }: PropsWithChildren) {
  return (
    <footer className={"relative flex items-center justify-end py-lg"}>
      <hr className="absolute -left-lg -right-lg top-0 h-px border-border-primary" />

      {children}
    </footer>
  );
}
