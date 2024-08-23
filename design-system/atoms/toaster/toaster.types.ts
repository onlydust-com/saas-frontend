import { PropsWithChildren, ReactNode } from "react";

interface Variants {
  variant: "default" | "error";
}

export interface ToasterPort {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
}

export interface ToastProps extends PropsWithChildren {
  variants: Partial<Variants>;
  iconContent?: ReactNode;
}

export interface ToastPort {
  default: (children: ReactNode) => void;
  success: (children: ReactNode) => void;
  error: (children: ReactNode) => void;
}
