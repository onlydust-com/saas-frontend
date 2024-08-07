"use client";

import { useMedia } from "react-use";

import { useClientOnly } from "@/shared/components/client-only/client-only";
import { BREAKPOINTS } from "@/shared/constants/breakpoints";

export function useMediaQuery({
  breakpoint,
  threshold = "min",
}: {
  breakpoint: keyof typeof BREAKPOINTS;
  threshold?: "min" | "max";
}) {
  const isClient = useClientOnly();
  const mediaQuery = useMedia(`(${threshold}-width: ${breakpoint}px)`);

  return isClient && mediaQuery;
}
