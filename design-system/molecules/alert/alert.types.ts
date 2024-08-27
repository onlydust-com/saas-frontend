import { ReactNode } from "react";

import { ButtonPort } from "@/design-system/atoms/button/button.types";
import { IconPort } from "@/design-system/atoms/icon";

interface Variants {
  color: "white" | "grey" | "brand" | "error" | "warning" | "success";
}

interface ClassNames {
  base: string;
}

export interface AlertPort {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
}

export interface AlertProps extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  title: ReactNode;
  description: ReactNode;
  icon?: IconPort;
  primaryButton?: ButtonPort<"button">;
  secondaryButton?: ButtonPort<"button">;
}

export interface AlertManagerPort {
  white: (props: AlertProps) => void;
  grey: (props: AlertProps) => void;
  brand: (props: AlertProps) => void;
  error: (props: AlertProps) => void;
  warning: (props: AlertProps) => void;
  success: (props: AlertProps) => void;
}
