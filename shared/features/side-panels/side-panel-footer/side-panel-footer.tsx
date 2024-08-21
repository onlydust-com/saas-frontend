import { PropsWithChildren } from "react";

export function SidePanelFooter({ children }: PropsWithChildren) {
  return (
    <footer className={"relative pt-3"}>
      <hr className="absolute -left-3 -right-3 top-0 h-px border-container-stroke-separator" />

      {children}
    </footer>
  );
}
