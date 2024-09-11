import { PropsWithChildren, ReactNode } from "react";

import { IconPort } from "@/design-system/atoms/icon";

interface ClassNames {
  base: string;
}

export interface FieldContainerPort extends PropsWithChildren {
  classNames?: Partial<ClassNames>;
  label?: ReactNode;
  description?: ReactNode;
  isError?: boolean;
  name: string;
  onChange?: (e: File) => void;
  info?: {
    text: string;
    icon?: IconPort;
  };
  error?: {
    text: string;
    icon?: IconPort;
  };
}
