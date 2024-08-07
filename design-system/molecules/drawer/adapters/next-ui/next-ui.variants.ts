import { tv } from "tailwind-variants";

export const DrawerNextUiVariants = tv({
  slots: {
    base: "border-b-none border-1 border-container-stroke-separator bg-container-1 sm:border-b-1 !m-0 h-[calc(100%_-_24px)] max-w-full rounded-xl rounded-b-none sm:!m-3 sm:rounded-b-xl",
    wrapper: "justify-end",
    body: "gap-0 overflow-hidden p-3 pt-0",
    backdrop: "bg-container-backdrop",
    footer: "border-t-1 border-container-stroke-separator bg-container-1 flex items-center justify-between p-3",
    header: "flex items-center justify-between p-3",
  },
  variants: {
    size: {
      m: {
        base: "w-[640px]",
      },
    },
  },
  defaultVariants: {
    size: "m",
  },
});
