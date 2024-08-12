import { ReactNode } from "react";

export interface SidePanelProps {
  name: string;
  children: (({ name }: { name: string }) => ReactNode) | ReactNode;
}
