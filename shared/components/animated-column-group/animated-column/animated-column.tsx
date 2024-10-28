"use client";

import { useEffect } from "react";

import { useAnimatedColumnGroup } from "@/shared/components/animated-column-group/animated-column-group.context";
import { cn } from "@/shared/helpers/cn";

import { AnimatedColumnProps } from "./animated-column.types";

export function AnimatedColumn({ width, initialWidth, children, className, onClick }: AnimatedColumnProps) {
  const { onChangeWidth } = useAnimatedColumnGroup();

  useEffect(() => {
    onChangeWidth();
  }, [width, onChangeWidth]);

  if (!width && width !== 0) {
    return (
      <div
        onClick={onClick}
        data-width={"auto"}
        className={cn("animated-column", "flex-1 transition-width", className)}
      >
        {children}
      </div>
    );
  }

  console.log("width", width, "initialWidth", initialWidth);

  return (
    <div
      onClick={onClick}
      className={cn("animated-column transition-width", className)}
      style={{ width: initialWidth }}
      data-width={width}
    >
      {children}
    </div>
  );
}
