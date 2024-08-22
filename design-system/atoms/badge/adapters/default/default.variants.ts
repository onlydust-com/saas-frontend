import { tv } from "tailwind-variants";

export const BadgeDefaultVariants = tv({
  slots: {
    base: "group block border-1 border-container-stroke-separator bg-container-4 transition-colors data-[clickable=true]:cursor-pointer",
    content: "flex flex-row items-center justify-center text-text-1",
    label: "text-inherit",
    deletableIcon: "text-inherit",
  },
  variants: {
    size: {
      xxs: {
        base: "px-0.5 py-1.5",
        content: "gap-1",
      },
      xs: {
        base: "px-1 py-2",
        content: "gap-2",
      },
      sm: {
        base: "px-1.5 py-2",
        content: "gap-2",
      },
      md: {
        base: "px-2 py-3",
        content: "gap-2",
      },
    },
    isDeletable: {
      true: "",
    },
    colors: {
      // TODO @Mehdi once config colors ready
      grey: {
        base: "",
      },
      brand: {
        base: "",
      },
      error: {
        base: "",
      },
      warning: {
        base: "",
      },
      success: {
        base: "",
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
      size: "xxs",
      shape: "rounded",
      colors: "grey",
      class: {
        base: "px-0.5 py-1.5",
      },
    },
    {
      size: "xs",
      shape: "rounded",
      colors: "grey",
      class: {
        base: "px-1 py-2",
      },
    },
    {
      size: "sm",
      shape: "rounded",
      colors: "grey",
      class: {
        base: "px-1.5 py-2",
      },
    },
    {
      size: "md",
      shape: "rounded",
      colors: "grey",
      class: {
        base: "px-2 py-3",
      },
    },
  ],
  defaultVariants: {
    size: "xxs",
    shape: "rounded",
    colors: "grey",
    deletable: false,
  },
});
