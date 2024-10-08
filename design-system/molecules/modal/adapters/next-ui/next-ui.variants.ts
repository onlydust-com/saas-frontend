import { tv } from "tailwind-variants";

export const ModalNextUiVariants = tv({
  slots: {
    modal:
      "group !my-1 max-h-full gap-lg overflow-y-auto rounded-xl border border-border-primary bg-background-primary-alt p-0",
    wrapper: "flex flex-col",
    body: "!p-3xl",
    backdrop: "bg-background-overlay",
    header: "flex items-center justify-between gap-4 py-lg pb-lg",
    footer: "flex items-center justify-between gap-4 py-lg pt-lg",
  },
  variants: {
    size: {
      xxs: { modal: "max-w-xxs" },
      xs: { modal: "max-w-xs" },
      sm: { modal: "max-w-sm" },
      md: { modal: "max-w-md" },
      lg: { modal: "max-w-lg" },
      xl: { modal: "max-w-xl" },
      "2xl": { modal: "max-w-2xl" },
      "3xl": { modal: "max-w-3xl" },
      "4xl": { modal: "max-w-4xl" },
      "5xl": { modal: "max-w-5xl" },
      "6xl": { modal: "max-w-6xl" },
      "7xl": { modal: "max-w-7xl" },
      "8xl": { modal: "max-w-8xl" },
      "9xl": { modal: "max-w-9xl" },
    },
    background: {
      primary: { modal: "bg-background-primary" },
      gradient: {
        modal:
          "before:effect-bg-blur-shadow before:gradient-glass-neon-45 bg-transparent backdrop-blur-sm backdrop-filter before:pointer-events-none before:absolute before:inset-0 before:-z-[1]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
