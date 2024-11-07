import { tv } from "tailwind-variants";

import { cn } from "@/shared/helpers/cn";

export const ModalNextUiVariants = tv({
  slots: {
    modal:
      "group !mx-0 !my-0 flex max-h-full max-w-full flex-col gap-lg overflow-hidden rounded-xl border border-border-primary bg-background-primary-alt",
    wrapper: "flex flex-1 flex-col overflow-hidden",
    body: "overflow-hidden !p-3xl",
    backdrop: "bg-background-overlay",
    header: "flex items-center justify-between gap-4 !p-3xl !pb-0",
    footer: "flex items-center justify-between gap-4 !p-3xl !pt-0",
  },
  variants: {
    size: {
      xxs: { modal: "!w-xxs" },
      xs: { modal: "!w-xs" },
      sm: { modal: "!w-sm" },
      md: { modal: "!w-md" },
      lg: { modal: "!w-lg" },
      xl: { modal: "!w-xl" },
      "2xl": { modal: "!w-2xl" },
      "3xl": { modal: "!w-3xl" },
      "4xl": { modal: "!w-4xl" },
      "5xl": { modal: "!w-5xl" },
      "6xl": { modal: "!w-6xl" },
      "7xl": { modal: "!w-7xl" },
      "8xl": { modal: "!w-8xl" },
      "9xl": { modal: "!w-9xl" },
    },
    background: {
      primary: { modal: "bg-background-primary" },
      gradient: {
        modal: cn(
          "transform-gpu bg-transparent backdrop-blur-md backdrop-filter before:pointer-events-none before:absolute before:inset-0 before:-z-[1] before:effect-bg-blur-shadow before:gradient-glass-neon-45"
        ),
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
