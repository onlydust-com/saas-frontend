import { PropsWithChildren } from "react";

interface BaseProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}
interface ControlledWidthProps extends BaseProps {
  width: number;
  initialWidth: number;
}

interface AutoWidthProps extends BaseProps {
  width?: never;
  initialWidth?: never;
}

export type AnimatedColumnProps = ControlledWidthProps | AutoWidthProps;
