import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...args: Parameters<typeof clsx>) {
  return twMerge(clsx(args));
}
