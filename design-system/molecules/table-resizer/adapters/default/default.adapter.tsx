import { useEffect } from "react";

import { cn } from "@/shared/helpers/cn";

import { TableResizerPort } from "../../table-resizer.types";
import { TableResizerDefaultVariants } from "./default.variants";

export function TableResizerDefaultAdapter({
  classNames,
  onDoubleClick,
  onMouseDown,
  onTouchStart,
  isResizing,
}: TableResizerPort) {
  const slots = TableResizerDefaultVariants({ isResizing });

  useEffect(() => {
    if (isResizing) {
      document.body.style.cursor = "col-resize";
    } else {
      document.body.style.cursor = "";
    }

    return () => {
      document.body.style.cursor = "";
    };
  }, [isResizing]);

  return (
    <span
      className={cn(slots.base(), classNames?.base)}
      onDoubleClick={onDoubleClick}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    />
  );
}
