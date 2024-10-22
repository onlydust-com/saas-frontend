import { tv } from "tailwind-variants";

export const AvatarGroupDefaultVariants = tv({
  slots: {
    base: "flex",
    image: "",
  },
  variants: {
    sizes: {
      md: {
        base: "-space-x-2",
      },
      sm: {
        base: "-space-x-1.5",
      },
      xs: {
        base: "-space-x-1",
      },
    },
    size: {
      "3xl": {
        base: "-space-x-10",
      },
      "2xl": {
        base: "-space-x-6",
      },
      xl: {
        base: "-space-x-5",
      },
      lg: {
        base: "-space-x-2",
      },
      md: {
        base: "-space-x-1.5",
      },
      sm: {
        base: "-space-x-1",
      },
      xs: {
        base: "-space-x-1",
      },
      xxs: {
        base: "-space-x-1",
      },
    },
    outsideBorder: {
      true: {
        image: "outline outline-2 outline-components-avatar-avatargroup-separator-border",
      },
    },
  },
  defaultVariants: {
    size: "xs",
    outsideBorder: false,
  },
});
