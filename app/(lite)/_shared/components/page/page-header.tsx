import { PropsWithChildren } from "react";

export function PageHeader({ children }: PropsWithChildren) {
  return <header className="flex flex-col gap-4">{children}</header>;
}
