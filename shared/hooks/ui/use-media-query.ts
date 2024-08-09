"use client";

import { useMedia } from "react-use";

import { useClientOnly } from "@/shared/components/client-only/client-only";
import { BREAKPOINTS } from "@/shared/constants/breakpoints";

type breakpointType = "exact" | "lower" | "greater";

const queries: Record<
  keyof typeof BREAKPOINTS,
  Record<
    breakpointType,
    {
      from: keyof typeof BREAKPOINTS;
      to?: keyof typeof BREAKPOINTS;
      threshold?: "min" | "max";
    }
  >
> = {
  mobile: {
    lower: { from: "mobile", threshold: "max" },
    exact: { from: "mobile", to: "tablet" },
    greater: { from: "mobile" },
  },
  tablet: {
    lower: { from: "tablet", threshold: "max" },
    exact: { from: "tablet", to: "laptop" },
    greater: { from: "tablet" },
  },
  laptop: {
    lower: { from: "laptop", threshold: "max" },
    exact: { from: "laptop", to: "desktop" },
    greater: { from: "laptop" },
  },
  desktop: {
    lower: { from: "desktop", threshold: "max" },
    exact: { from: "desktop", to: "wide" },
    greater: { from: "desktop" },
  },
  wide: {
    lower: { from: "wide", threshold: "max" },
    exact: { from: "wide" },
    greater: { from: "wide" },
  },
};

export function useMediaQuery({
  from,
  threshold = "min",
  to,
}: {
  from: keyof typeof BREAKPOINTS;
  to?: keyof typeof BREAKPOINTS;
  threshold?: "min" | "max";
}) {
  const isClient = useClientOnly();
  const startQuery = `(${threshold}-width: ${BREAKPOINTS[from]}px)`;
  const endQuery = to ? `and (${threshold === "min" ? "max" : "min"}-width: ${BREAKPOINTS[to]}px)` : "";

  const mediaQuery = useMedia(`${startQuery}${endQuery}`);

  return isClient && mediaQuery;
}

/**
 * @greater: > 320px
 * @lower: < 320px
 * @exact: > 320px and < 800px
 */
export function useIsMobile(type?: breakpointType) {
  return useMediaQuery(queries.mobile[type || "greater"]);
}

/**
 * @greater: > 800px
 * @lower: < 800px
 * @exact: > 800px and < 1280px
 */
export function useIsTablet(type?: breakpointType) {
  return useMediaQuery(queries.tablet[type || "greater"]);
}

/**
 * @greater: > 1280px
 * @lower: < 1280px
 * @exact: > 1280px and < 1440px
 */
export function useIsLaptop(type?: breakpointType) {
  return useMediaQuery(queries.laptop[type || "greater"]);
}

/**
 * @greater: > 1440px
 * @lower: < 1440px
 * @exact: > 1440px and < 2560px
 */
export function useIsDesktop(type?: breakpointType) {
  return useMediaQuery(queries.desktop[type || "greater"]);
}

/**
 * @greater: > 2560px
 * @lower: < 2560px
 */
export function useIsWide(type?: breakpointType) {
  return useMediaQuery(queries.wide[type || "greater"]);
}
