import { tv } from "tailwind-variants";

export const AvatarGroupDefaultVariants = tv({
  slots: {
    base: "flex",
    image: "",
  },
  variants: {
    size: {
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
    outsideBorder: {
      true: {
        image: "outline outline-2 outline-components-avatar-avatargroup-separator-border",
      },
    },
  },
  defaultVariants: {
    size: "sm",
    outsideBorder: false,
  },
});
