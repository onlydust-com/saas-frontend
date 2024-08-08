import { PropsWithChildren } from "react";

interface BaseProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}
interface ControlledWidthProps {
  autoWidth: false;
  width?: number;
  initialWidth?: number;
}

interface AutoWidthProps {
  autoWidth: true;
  width?: never;
  initialWidth?: never;
}

export type AnimatedColumnProps = BaseProps & (ControlledWidthProps | AutoWidthProps);
