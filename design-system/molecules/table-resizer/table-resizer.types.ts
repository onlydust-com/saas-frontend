import { MouseEvent, TouchEventHandler } from "react";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface TableResizerPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  onDoubleClick?: () => void;
  onMouseDown: (event: MouseEvent<HTMLSpanElement>) => void;
  onTouchStart: TouchEventHandler<HTMLSpanElement>;
  isResizing?: boolean;
}
