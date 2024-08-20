import { PropsWithChildren } from "react";

export interface AnimatedColumnGroupContextProps extends PropsWithChildren {
  className?: string;
}

export interface AnimatedColumnGroupContextInterface {
  onChangeWidth: () => void;
}

export interface AnimatedColumnGroupProps extends PropsWithChildren {
  className?: AnimatedColumnGroupContextProps["className"];
}
