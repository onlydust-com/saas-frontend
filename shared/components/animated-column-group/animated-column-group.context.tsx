"use client";

import { createContext, useContext, useEffect, useRef } from "react";

import { cn } from "@/shared/helpers/cn";

import { AnimatedColumnGroupContextInterface, AnimatedColumnGroupContextProps } from "./animated-column-group.types";

export const AnimatedColumnGroupContext = createContext<AnimatedColumnGroupContextInterface>({
  onChangeWidth: () => {},
});

export function AnimatedColumnGroupProvider({ children, className }: AnimatedColumnGroupContextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  function convertPxToRem(px: number): number {
    return px / parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  function calculateWidth() {
    if (containerRef.current) {
      const containerWidth = convertPxToRem(containerRef.current.offsetWidth);
      const childElements = containerRef.current.querySelectorAll(".animated-column");
      const child: Array<[Element, number | "auto"]> = [];

      childElements.forEach(el => {
        const width = el.getAttribute("data-width");
        if (width === "auto") {
          child.push([el, "auto"]);
        } else {
          child.push([el, width ? parseFloat(width) : "auto"]);
        }
      });

      const autoWidthElements = child.filter(([, width]) => width === "auto");
      const fixedWidthElements = child.filter(([, width]) => width !== "auto");
      const totalFixedWidth = fixedWidthElements.reduce((acc, [, width]) => acc + (width as number), 0);

      autoWidthElements.forEach(([el]) => {
        el.setAttribute("style", `width: ${containerWidth - totalFixedWidth}rem`);
      });

      fixedWidthElements.forEach(([el, width]) => {
        el.setAttribute("style", `width: ${width}rem`);
      });
    }
  }

  function onChangeWidth() {
    calculateWidth();
  }

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined" || !("ResizeObserver" in window)) return;

    const observer = new ResizeObserver(() => {
      calculateWidth();
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [containerRef]);

  return (
    <AnimatedColumnGroupContext.Provider
      value={{
        onChangeWidth,
      }}
    >
      <div
        ref={containerRef}
        className={cn("flex size-full flex-row items-start justify-start overflow-hidden", className)}
      >
        {children}
      </div>
    </AnimatedColumnGroupContext.Provider>
  );
}

export function useAnimatedColumnGroup() {
  const context = useContext(AnimatedColumnGroupContext);
  if (!context) {
    throw new Error("SidePanel must be used inside a AnimatedColumnGroup");
  }
  return context;
}
