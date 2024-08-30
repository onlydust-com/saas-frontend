import { tv } from "tailwind-variants";

export const AvatarDefaultVariants = tv({
  slots: {
    base: "relative flex items-center justify-center border bg-components-avatar-bg",
    image: "h-full w-full object-cover object-center",
    name: "font-medium text-components-avatar-typo",
    icon: "absolute -bottom-0.5 -right-0.5 rounded-full outline outline-background-primary-alt",
  },
  variants: {
    size: {
      "3xl": {
        base: "h-24 min-h-24 w-24 min-w-24",
        icon: "h-8 w-8 outline-4",
      },
      "2xl": {
        base: "h-16 min-h-16 w-16 min-w-16",
        icon: "h-6 w-6 outline-[3px]",
      },
      xl: {
        base: "h-12 min-h-12 w-12 min-w-12",
        icon: "h-5 w-5 outline-2",
      },
      lg: {
        base: "h-10 min-h-10 w-10 min-w-10",
        icon: "h-4 w-4 outline-2",
      },
      md: {
        base: "h-8 min-h-8 w-8 min-w-8",
        icon: "h-3.5 w-3.5 outline-2",
      },
      s: {
        base: "h-6 min-h-6 w-6 min-w-6",
        icon: "h-3 w-3 outline-1",
      },
      xs: {
        base: "h-5 min-h-5 w-5 min-w-5",
        icon: "h-3 w-3 outline-1",
      },
      xxs: {
        base: "h-4 min-h-4 w-4 min-w-4",
        icon: "-bottom-1 -right-1 h-2.5 w-2.5 outline-1",
      },
    },
    shape: {
      rounded: {
        base: "rounded-full",
        image: "rounded-full",
      },
      squared: "",
    },
    name: {
      true: {
        base: "border-components-avatar-border",
      },
      false: {
        base: "border-components-avatar-contrast-border",
      },
    },
    onlineIcon: {
      true: {
        icon: "bg-foreground-success",
      },
      false: {
        icon: "border-components-avatar-contrast-border bg-components-avatar-bg",
      },
    },
  },
  compoundVariants: [
    {
      size: "3xl",
      onlineIcon: true,
      class: {
        icon: "bottom-0 right-0 h-5 w-5",
      },
    },
    {
      size: "2xl",
      onlineIcon: true,
      class: {
        icon: "bottom-0 right-0 h-4 w-4",
      },
    },
    {
      size: "xl",
      onlineIcon: true,
      class: {
        icon: "bottom-0 right-0 h-3 w-3",
      },
    },
    {
      size: "lg",
      onlineIcon: true,
      class: {
        icon: "bottom-0 right-0 h-2.5 w-2.5",
      },
    },
    {
      size: "md",
      onlineIcon: true,
      class: {
        icon: "bottom-0 right-0 h-2 w-2",
      },
    },
    {
      size: "s",
      onlineIcon: true,
      class: {
        icon: "bottom-0 right-0 h-1.5 w-1.5",
      },
    },
    {
      size: "xs",
      onlineIcon: true,
      class: {
        icon: "bottom-0 right-0 h-[5px] w-[5px]",
      },
    },
    {
      size: "xxs",
      onlineIcon: true,
      class: {
        icon: "-bottom-[1px] -right-[1px] h-1.5 w-1.5",
      },
    },
    {
      size: "3xl",
      shape: "squared",
      class: {
        base: "rounded-2xl",
        image: "rounded-2xl",
      },
    },
    {
      size: "2xl",
      shape: "squared",
      class: {
        base: "rounded-xl",
        image: "rounded-xl",
      },
    },
    {
      size: "xl",
      shape: "squared",
      class: {
        base: "rounded-xl",
        image: "rounded-xl",
      },
    },
    {
      size: "lg",
      shape: "squared",
      class: {
        base: "rounded-lg",
        image: "rounded-lg",
      },
    },
    {
      size: "md",
      shape: "squared",
      class: {
        base: "rounded-lg",
        image: "rounded-lg",
      },
    },
    {
      size: "s",
      shape: "squared",
      class: {
        base: "rounded-md",
        image: "rounded-md",
      },
    },
    {
      size: "xs",
      shape: "squared",
      class: {
        base: "rounded-md",
        image: "rounded-md",
      },
    },
    {
      size: "xxs",
      shape: "squared",
      class: {
        base: "rounded",
        image: "rounded",
      },
    },
    {
      size: "3xl",
      name: true,
      class: {
        name: "text-xl",
      },
    },
    {
      size: "2xl",
      name: true,
      class: {
        name: "text-lg",
      },
    },
    {
      size: "xl",
      name: true,
      class: {
        name: "text-lg",
      },
    },
    {
      size: "lg",
      name: true,
      class: {
        name: "text-md",
      },
    },
    {
      size: "md",
      name: true,
      class: {
        name: "text-sm",
      },
    },
    {
      size: "s",
      name: true,
      class: {
        name: "text-xs",
      },
    },
    {
      size: "xs",
      name: true,
      class: {
        name: "text-xs",
      },
    },
    {
      size: "xxs",
      name: true,
      class: {
        name: "text-xs",
      },
    },
  ],
  defaultVariants: {
    size: "md",
    shape: "rounded",
    name: false,
    onlineIcon: false,
  },
});
