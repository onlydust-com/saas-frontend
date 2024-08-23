import { tv } from "tailwind-variants";

export const AvatarDefaultVariants = tv({
  slots: {
    base: "border-components-avatar-contrast-border relative flex items-center justify-center border",
    img: "h-full w-full object-cover object-center",
    name: "font-walsheim text-xs text-text-1",
  },
  variants: {
    size: {
      "3xl": {
        base: "h-24 w-24",
      },
      "2xl": {
        base: "h-16 w-16",
      },
      xl: {
        base: "h-12 w-12",
      },
      lg: {
        base: "h-10 w-10",
      },
      md: {
        base: "h-8 w-8",
      },
      s: {
        base: "h-6 w-6",
      },
      xs: {
        base: "h-5 w-5",
      },
      xxs: {
        base: "h-4 w-4",
      },
    },
    shape: {
      rounded: {
        base: "rounded-full",
      },
      squared: {
        base: "rounded-lg",
      },
    },
  },
  compoundVariants: [
    {
      size: "3xl",
      shape: "squared",
      class: {
        base: "rounded-2xl",
      },
    },
    {
      size: "2xl",
      shape: "squared",
      class: {
        base: "rounded-xl",
      },
    },
    {
      size: "xl",
      shape: "squared",
      class: {
        base: "rounded-xl",
      },
    },
    {
      size: "lg",
      shape: "squared",
      class: {
        base: "rounded-lg",
      },
    },
    {
      size: "md",
      shape: "squared",
      class: {
        base: "rounded-lg",
      },
    },
    {
      size: "s",
      shape: "squared",
      class: {
        base: "rounded-md",
      },
    },
    {
      size: "xs",
      shape: "squared",
      class: {
        base: "rounded-md",
      },
    },
    {
      size: "xxs",
      shape: "squared",
      class: {
        base: "rounded",
      },
    },
  ],
  defaultVariants: {
    size: "md",
    shape: "rounded",
  },
});
