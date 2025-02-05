import { createBreakpoint } from "react-use";

const breakpoints = {
  none: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

const useBreakpoint = createBreakpoint(breakpoints);

export function useIsBreakpoint(breakpoint: keyof typeof breakpoints) {
  // Get the current breakpoint from the useBreakpoint hook
  const currentBreakpoint = useBreakpoint();

  // Get array of breakpoint keys (sm, md, lg, etc)
  const breakpointSizes = Object.keys(breakpoints);

  // Find index of current breakpoint in the breakpoint array
  const currentBreakpointIndex = breakpointSizes.findIndex(key => key === currentBreakpoint);

  // Find index of target breakpoint in the breakpoint array
  const targetBreakpointIndex = breakpointSizes.findIndex(key => key === breakpoint);

  // Return true if current breakpoint index is >= target breakpoint index
  // This means the current viewport width is at or above the target breakpoint
  return currentBreakpointIndex >= targetBreakpointIndex;
}
