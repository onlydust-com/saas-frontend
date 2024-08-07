import { PropsWithChildren, ReactNode } from "react";

import { IconPort } from "@/design-system/atoms/icon";

interface Variants {
  variant: "default" | "error";
}

export interface ToasterPort {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
}

export interface ToastProps extends PropsWithChildren {
  variants: Partial<Variants>;
  iconProps?: IconPort;
}

export interface ToastPort {
  default: (children: ReactNode) => void;
  error: (children: ReactNode) => void;
}
