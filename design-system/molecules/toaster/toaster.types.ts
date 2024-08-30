import { PropsWithChildren, ReactNode } from "react";

import { IconPort } from "@/design-system/atoms/icon";

interface Variants {
  type: "default" | "error";
}

interface ClassNames {
  base: string;
}

export interface ToasterPort {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
}

export interface ToastProps extends Partial<Variants>, PropsWithChildren {
  classNames?: Partial<ClassNames>;
  icon?: IconPort;
}

export interface ToastPort {
  default: (children: ReactNode) => void;
  error: (children: ReactNode) => void;
}
