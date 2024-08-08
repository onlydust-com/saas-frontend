import { PropsWithChildren } from "react";

interface BaseProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}
interface ControlledProps {
  controlled: true;
  width: number;
  initialWidth: number;
}

interface UncontrolledProps {
  controlled: false;
  width?: never;
  initialWidth?: never;
}

export type AnimatedColumnProps = BaseProps & (ControlledProps | UncontrolledProps);
