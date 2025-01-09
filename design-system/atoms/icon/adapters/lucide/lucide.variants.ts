import { tv } from "tailwind-variants";

export const IconLucideVariants = tv({
  slots: {
    base: "",
  },
  variants: {
    color: {
      green: {
        base: "!text-utility-secondary-green-500",
      },
      blue: {
        base: "!text-utility-secondary-blue-500",
      },
      red: {
        base: "!text-foreground-error",
      },
      purple: {
        base: "!text-utility-brand-crystalizedviolet-500",
      },
      yellow: {
        base: "!text-utility-secondary-yellow-500",
      },
      pink: {
        base: "!text-utility-secondary-pink-500",
      },
      quaternary: {
        base: "!text-typography-quaternary",
      },
    },
  },
});
