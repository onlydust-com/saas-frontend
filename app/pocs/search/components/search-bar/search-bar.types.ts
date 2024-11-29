import { PropsWithChildren } from "react";

export interface SearchBarProps extends PropsWithChildren {
  value: string | null;
  onChange: (value: string | null) => void;
  prediction?: string;
}
