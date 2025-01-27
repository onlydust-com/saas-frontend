import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** @deprecated */
export function cn(...args: Array<ClassValue | undefined>) {
  return twMerge(clsx(args));
}
