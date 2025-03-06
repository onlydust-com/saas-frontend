import { PropsWithChildren } from "react";

export interface EcosystemsFilterProps {
  ecosystemsIds: string[];
  onSelect: (ecosystemsIds: string[]) => void;
}
